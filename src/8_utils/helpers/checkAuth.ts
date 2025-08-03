import { STORAGE_IS_AUTH } from "../constants/constants";

export const checkAuth = () => {
  if (localStorage.getItem(STORAGE_IS_AUTH)) {
    return true;
  }

  return false;
};
