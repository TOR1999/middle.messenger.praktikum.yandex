export const validatePhone = (phone: string) => {
  const regex = /^\+?[0-9]{10,15}$/;
  return regex.test(phone);
};
