const filterPendingOrders = (orders) => {
  return orders.filter((order) => order.status == "Pending");
};

export default filterPendingOrders;
