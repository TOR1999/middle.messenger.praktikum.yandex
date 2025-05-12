export const validateLogin = (login: string) => {
  const regex = /^[a-z0-9_-]{3,20}$/;
  return regex.test(login);
};
