const buttons = [
  {
    label: "Dashboard",
    roles: ["headAdmin"],
    type: "dashboard",
  },

  {
    label: "Employee Management",
    roles: ["headAdmin", "managerAdmin"],
    type: "employee",
  },

  {
    label: "Customer Management",
    roles: ["headAdmin", "managerAdmin"],
    type: "customer",
  },

  {
    label: "Orders Management",
    roles: ["headAdmin", "cashierAdmin"],
    type: "order",
  },

  {
    label: "Inventory Management",
    roles: ["headAdmin", "pharmacistAdmin"],
    type: "inventory",
  },

  {
    label: "Suppliers",
    roles: ["headAdmin", "managerAdmin"],
    type: "supplier",
  },
];

export default buttons;
