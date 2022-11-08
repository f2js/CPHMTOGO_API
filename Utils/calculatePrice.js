function calculateOrderPrice(items) {
  if (!items) return;
  const itemPriceList = items.map((e) => ({
    price: e.price,
    quantity: e.quantity,
    totalPrice: e.price * e.quantity,
  }));
  let orderPrice = 0;
  itemPriceList.map((e) => {
    orderPrice += e.totalPrice;
  });
  return orderPrice;
}

module.exports = {
  calculateOrderPrice,
};
