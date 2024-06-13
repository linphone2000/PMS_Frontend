const countTotalItems = (orders) => {
  return orders.reduce((total, order) => {
    return (
      total +
      order.items.reduce((orderTotal, item) => orderTotal + item.quantity, 0)
    );
  }, 0);
};

export default countTotalItems;
