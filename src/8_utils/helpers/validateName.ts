export const validateName = (name: string) => {
  const regex = /^[A-ZА-Я][a-zA-ZА-я-]*$/;
  return regex.test(name);
};
