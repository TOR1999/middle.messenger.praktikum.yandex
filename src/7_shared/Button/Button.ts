import { Block } from "../../8_utils/helpers/block";
import s from "./Button.module.scss";

const buttonTemplate = `
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

type TProps = {
  id: string;
  disabled: boolean;
  text: string;
  onClick?: (e: Event) => void;
};

export class Button extends Block {
  constructor(props: TProps) {
    super("div", { ...props });
  }

  override render() {
    return this.compile(buttonTemplate, this.props);
  }
}
