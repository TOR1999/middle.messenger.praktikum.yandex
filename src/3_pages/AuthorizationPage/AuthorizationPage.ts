import s from "./AuthorizationPage.module.scss";

export const AuthorizationPage = `
<div class=${s["container"]}>
  {{> AuthorizationModal
      valueLogin=valueLogin
      valuePassword=valuePassword 
  }}
</div>
`;
