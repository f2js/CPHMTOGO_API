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

function grpcClient(call, callback) {
	// load the proto file and create a gRPC client
	const packageDefinition = grpcProtoLoader.loadSync(PROTO_PATH);
	const grpcObject = grpc.loadPackageDefinition(packageDefinition);
	const client = new grpcObject.Service(
		"localhost:9090",
		grpc.credentials.createInsecure(),
	);


}


const makeGRPCClient = () => {
	const pkgDefs = grpcProtoLoader.loadSync(PROTO_PATH);

	const grpcObject = grpc.loadPackageDefinition(pkgDefs);
	console.log('GRPC OBJECT: ', grpcObject);

	const client = new grpcObject.grpc.PaymentService(
		'localhost:9090',
		grpc.credentials.createInsecure()
	);

	return client;
};

exports.makePayment =  (orderId, orderPrice) => {
	const client = makeGRPCClient();

	const request = {orderId: orderId, orderPrice: orderPrice};

	client.payment(request, (error, paymentStatus) => {
		if (!error) {
			console.log(paymentStatus);
			return paymentStatus;
		}
		return error;
	});
}











