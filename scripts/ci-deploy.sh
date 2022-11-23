#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

COMMIT_SHA1=$CIRCLE_SHA1

# Export it so it's available for envsubst
export COMMIT_SHA1=$COMMIT_SHA1

#  Since the only way for envsubst to work on files is using input/output redirection,
#  it's not possible to do in-place substitution, so you will save the output to another file
#  and overwrite the original with that one.
envsubst <./kube/pod.yaml >./kube/pod.yaml.out
mv ./kube/pod.yaml.out ./kube/pod.yaml

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

./kubectl \
  --kubeconfig=/dev/null \
  --server=$KUBERNETES_SERVER \
  --certificate-authority=cert.crt \
  --token=$KUBERNETES_TOKEN \
  apply -f ./kube/