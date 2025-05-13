import { Block } from "../../8_utils/helpers/block";
import s from "./CircleIconButton.module.scss";

const circleIconButtonTemplate = `
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

type TProps = {
  id: string;
  iconSrc: string;
  altText: string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
};

export class CircleIconButton extends Block {
  constructor(props: TProps) {
    super("div", props);
  }

  override render() {
    return this.compile(circleIconButtonTemplate, this.props);
  }
}
