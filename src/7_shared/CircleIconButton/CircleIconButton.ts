import { Block } from "../../8_utils/helpers/block";
import s from "./CircleIconButton.module.scss";

const circleIconButtonTemplate = `
     <img
     src="{{iconSrc}}"
     alt="{{altText}}"
     />
`;

type TProps = {
  id: string;
  iconSrc: string;
  altText: string;
  disabled?: boolean;
  submit?: boolean;
  onClick?: (e: Event) => void;
};

export class CircleIconButton extends Block<TProps> {
  constructor(props: TProps) {
    super("button", {
      ...props,
      attr: {
        id: props.id,
        disabled: props.disabled ? "true" : "false",
        type: props.submit ? "submit" : "",
        class: `${`${s["button"]} ${props.disabled ? s["button_disabled"] : ""}`}`,
      },
    });
  }

  override render() {
    return this.compile(circleIconButtonTemplate, this.props);
  }
}
