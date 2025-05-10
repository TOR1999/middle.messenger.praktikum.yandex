import { Block } from "../../8_utils/helpers/block";
import s from "./Typography.module.scss";
const typographyTemplate = `
<div
{{#if (isSimpleEquals variant "b1")}} 
   class=${s["font-b1"]}
{{/if}}
{{#if (isSimpleEquals variant "b2")}} 
   class=${s["font-b2"]}
{{/if}}
{{#if (isSimpleEquals variant "b3")}} 
   class=${s["font-b3"]}
{{/if}}
{{#if (isSimpleEquals variant "b4")}} 
   class=${s["font-b4"]}
{{/if}}
{{#if (isSimpleEquals variant "b5")}} 
   class=${s["font-b5"]}
{{/if}}
{{#if (isSimpleEquals variant "b6")}} 
   class=${s["font-b6"]}
{{/if}}
{{#if (isSimpleEquals variant "b7")}} 
   class=${s["font-b7"]}
{{/if}}
{{#if (isSimpleEquals variant "h1")}} 
   class=${s["font-h1"]}
{{/if}}
{{#if (isSimpleEquals variant "h2")}} 
   class=${s["font-h2"]}
{{/if}}
{{#if (isSimpleEquals variant "h3")}} 
   class=${s["font-h3"]}
{{/if}}
{{#if (isSimpleEquals variant "h4")}} 
   class=${s["font-h4"]}
{{/if}}
{{#if (isSimpleEquals variant "h5")}} 
   class=${s["font-h5"]}
{{/if}}
{{#if (isSimpleEquals variant "h6")}} 
   class=${s["font-h6"]}
{{/if}}
{{#if (isSimpleEquals variant "h7")}} 
   class=${s["font-h7"]}
{{/if}}
>
{{text}}
</div>
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
  text: string;
};

export class Typography extends Block {
  constructor(props: TProps) {
    super("div", props);
  }

  override render() {
    return this.compile(typographyTemplate, this.props);
  }
}
