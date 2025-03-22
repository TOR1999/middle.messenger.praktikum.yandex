import "./style.css";
import Authorization from "../3_pages/Authorization/Authorization.ts";

document.addEventListener("DOMContentLoaded", () => {
  const auth = new Authorization();
  auth.render();
});
