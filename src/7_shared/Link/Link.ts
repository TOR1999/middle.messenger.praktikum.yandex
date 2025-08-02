import { Block } from "../../8_utils/helpers/block";
import s from "./Link.module.scss";

const linkTemplate = (props: TLink) => {
  return `
  <button 
    class="${`${`${s[`link_${props.variant}`]} ${s[`link_${props.color}-text`]}`}`}"
  >
    {{text}}
  </button>
`;
};

export type TLink = {
  href: string;
  variant: "text" | "underline";
  text: string;
  dataPage?: string;
  onClick?: (e: Event) => void;
  color?: "red" | "grey";
};

export class Link extends Block {
  constructor(props: TLink) {
    super("div", {
      ...props,
    });
  }

  override render() {
    return this.compile(linkTemplate(this.props as TLink), this.props);
  }
}
