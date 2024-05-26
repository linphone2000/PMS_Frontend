function formatRoleName(role) {
  let words = role.split(/(?=[A-Z])/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export { formatRoleName };
