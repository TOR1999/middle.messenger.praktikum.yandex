export const getValueById = (id: string) => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element?.value : "";
};
