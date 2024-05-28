const buttons = [
  {
    label: "Dashboard",
    roles: ["headAdmin"],
    type: "dashboard",
    icon: "fa-solid fa-chart-line",
  },

  {
    label: "Employees",
    roles: ["headAdmin", "managerAdmin"],
    type: "employee",
    icon: "fa-solid fa-user-tie",
  },

  {
    label: "Customers",
    roles: ["headAdmin", "managerAdmin"],
    type: "customer",
    icon: "fa-solid fa-users",
  },

  {
    label: "Orders",
    roles: ["headAdmin", "cashierAdmin"],
    type: "order",
    icon: "fa-solid fa-boxes-stacked",
  },

  {
    label: "Inventory",
    roles: ["headAdmin", "pharmacistAdmin"],
    type: "inventory",
    icon: "fa-solid fa-warehouse",
  },

  {
    label: "Suppliers",
    roles: ["headAdmin", "managerAdmin"],
    type: "supplier",
    icon: "fa-solid fa-truck-ramp-box",
  },
];

export default buttons;
