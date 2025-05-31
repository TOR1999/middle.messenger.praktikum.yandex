export const validateLogin = (login: string) => {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;
  return regex.test(login);
};
