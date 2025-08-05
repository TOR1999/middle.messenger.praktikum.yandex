import { Block } from "../../8_utils/helpers/block";
import s from "./Typography.module.scss";

const typographyTemplate = `
{{text}}
`;

type TProps = {
  variant:
    | "b1"
    | "b2"
    | "b3"
    | "b4"
    | "b5"
    | "b6"
    | "b7"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7";
  text?: string;
  color?: "red" | "white" | "grey" | "blue";
  textAlign?: "right" | "center";
  withoutLineHeight?: boolean;
};

export class Typography extends Block<TProps> {
  constructor(props: TProps) {
    const baseSryleStr = `font-${props.variant}`;
    const colorStyle = `${props.color}-text`;
    const alignTextStyle = `text-align-${props.textAlign}`;
    const withoutLineHeight = props.withoutLineHeight
      ? `without-line-height`
      : "";

    super("div", {
      attr: {
        class: `${`${s[baseSryleStr]} ${s[withoutLineHeight]} ${s[colorStyle]} ${s[alignTextStyle]}`}`,
      },
      ...props,
    });
  }

  override render() {
    return this.compile(typographyTemplate, this.props);
  }
}
