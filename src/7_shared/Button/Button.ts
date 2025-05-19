import { Block } from "../../8_utils/helpers/block";
import s from "./Button.module.scss";

const buttonTemplate = (props: TProps) => {
  const styleButton = props.variantText ? "button-text" : "button";
  const styleDisabled = props.disabled ? "disabled" : "";
  const typeSubmit = props.typeSubmit ? "submit" : "";
  return `
  <button 
    id="{{id}}"
    class="${`${s[styleButton]} ${s[styleDisabled]}`}"
    ${styleDisabled}
    type=${typeSubmit}
  >
     {{text}}
  </button>
  `;
};

type TProps = {
  id: string;
  disabled: boolean;
  text: string;
  variantText?: boolean;
  typeSubmit?: boolean;
  onClick?: (e: Event) => void;
};

export class Button extends Block {
  constructor(props: TProps) {
    super("div", { ...props });
  }

  override render() {
    return this.compile(buttonTemplate(this.props as TProps), this.props);
  }
}
