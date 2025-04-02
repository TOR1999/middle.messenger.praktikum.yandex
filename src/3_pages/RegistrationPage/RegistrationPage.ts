import s from "./RegistrationPage.module.scss";

export const RegistrationPage = `
<div class=${s["container"]}>
  {{> RegistrationModal
      valueEmail=valueEmail
      valueLogin=valueLogin
      valueFirstName=valueFirstName
      valueSecondName=valueSecondName
      valuePhone=valuePhone
      valuePassword=valuePassword
      valueRepeatPassword=valueRepeatPassword
  }}
</div>
`;
