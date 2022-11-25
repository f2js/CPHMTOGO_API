const {basket} = require("./testHelpers/testObjects")
const {calculateOrderPrice} = require("../Utils/calculatePrice")


describe("UNIT | CalculatePrice ", () => {

	test("Calculate price| Input items", async () => {
		let items = basket.basket.items
		console.log(items)
		const expectedResult = 145;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)

	});

	test("Calculate price| Input undefined", async () => {
		let items = undefined
		const expectedResult = undefined;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)
	});

	test("Calculate price| Input null", async () => {
		let items = null;
		const expectedResult = undefined;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)
	});

	test("Calculate price| Input []", async () => {
		let items = [];
		const expectedResult = undefined;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)
	});

	test("Calculate price| Input no price", async () => {
		let items = [{
			item: "Coffee",
			quantity: "2",
		},
			{
				item: "Is te",
				quantity: "3",
			}]
		const expectedResult = undefined;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)
	});

	test("Calculate price| Input no quantity", async () => {
		let items = [{item: "Coffee", price: 29},
			{item: "Is te", price: 29},];
		const expectedResult = undefined;
		const actualResult = calculateOrderPrice(items)

		expect(actualResult).toBe(expectedResult)
	});
});