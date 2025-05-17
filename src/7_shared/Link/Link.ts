import { Block } from "../../8_utils/helpers/block";
import s from "./Link.module.scss";

const linkTemplate = `
{{text}}
`;

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
    super("a", {
      attr: {
        href: props.href,
        "data-page": props.dataPage,
        class: `${`${s[`link_${props.variant}`]} ${s[`link_${props.color}-text`]}`}`,
      },
      ...props,
    });
  }

  override render() {
    return this.compile(linkTemplate, this.props);
  }
}
