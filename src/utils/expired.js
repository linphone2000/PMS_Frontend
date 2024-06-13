const getExpiredItems = (items) => {
  const currentDate = new Date();
  return items.filter((item) => new Date(item.expiryDate) > currentDate);
};

export default getExpiredItems;
