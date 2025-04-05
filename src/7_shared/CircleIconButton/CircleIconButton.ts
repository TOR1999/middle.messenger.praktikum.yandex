import s from "./CircleIconButton.module.scss";

export const CircleIconButton = `
<button 
    id="{{id}}"
    {{#if disabled}}
    class="${`${s["button"]} ${s["button_disabled"]}`}"
    disabled
    {{else}}
     class="${s["button"]}"
    {{/if}}
  >
     <img
     src="{{iconSrc}}"
     alt="{{altText}}"
     />
  </button>
`;
