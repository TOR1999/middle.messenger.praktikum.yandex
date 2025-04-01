import s from "./Button.module.scss";

export const Button = `
  <button 
    id="{{id}}"
    {{#if disabled}}
    class="${`${s["button"]} ${s["button_disabled"]}`}"
    disabled
    {{else}}
     class="${s["button"]}"
    {{/if}}
  >
     {{text}}
  </button>
  `;
