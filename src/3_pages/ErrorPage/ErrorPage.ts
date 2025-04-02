import s from "./ErrorPage.module.scss";

export const ErrorPage = `
<div class=${s["container"]}>
  <div class=${s["code-container"]}>
    {{> Typography
        variant="h1"
        text=textCode
     }}
  </div>
  <div class=${s["message-container"]}>
     {{> Typography
          variant="b2"
          text=textMessage
      }}
  </div>
  {{> Link
      href="#"
      variant="text"
      text=textLink
   }}
</div>
`;
