export const validateName = (name: string) => {
  const regex = /^[A-ZА-ЯЁ][a-zA-ZА-яё-]*$/;
  return regex.test(name);
};
