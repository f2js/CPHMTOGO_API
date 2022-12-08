const grpc = require("@grpc/grpc-js");
const grpcProtoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./proto/PaymentSystem.proto";

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};

const makeGRPCClient = () => {
	const pkgDefs = grpcProtoLoader.loadSync(PROTO_PATH);

	const grpcObject = grpc.loadPackageDefinition(pkgDefs);

	const client = new grpcObject.grpc.PaymentService(
		'localhost:9090',
		grpc.credentials.createInsecure()
	);

	return client;
};

exports.makePayment = async (orderId, orderPrice) => {
	const client = makeGRPCClient();
	const request = {orderId: orderId, orderPrice: orderPrice};
	const paymentStatus = await new Promise((resolve, reject) => {
		client.payment(request, (error, paymentStatus) => {
			if (error) {
				reject(error);
			} else {
				resolve(paymentStatus);
			}
		});
	});
	return paymentStatus;
};











