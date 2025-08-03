import { STORAGE_IS_AUTH } from "../constants/constants";

export const checkAuth = () => {
  return Boolean(localStorage.getItem(STORAGE_IS_AUTH));
};
