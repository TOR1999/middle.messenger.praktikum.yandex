export const getValueById = (id: string) => {
  const element = document.getElementById(id) as HTMLInputElement;
  return element?.value;
};
