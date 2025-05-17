export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
  return regex.test(email);
};
