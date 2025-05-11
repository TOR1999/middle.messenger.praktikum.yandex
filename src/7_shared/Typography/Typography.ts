import { Block } from "../../8_utils/helpers/block";
import s from "./Typography.module.scss";
const typographyTemplate = `
<div
{{#if (isSimpleEquals variant "b1")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b1"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b1"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b2")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b2"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b2"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b3")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b3"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b3"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b4")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b4"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b4"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b5")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b5"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b5"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b6")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b6"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b6"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "b7")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-b7"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-b7"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h1")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h1"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h1"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h2")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h2"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h2"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h3")}}    
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h3"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h3"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h4")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h4"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h4"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h5")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h5"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h5"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h6")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h6"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h6"]}
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "h7")}} 
 {{#if (isSimpleEquals color "red")}} 
   class="${`${s["font-h7"]} ${s["red-text"]}`}"
   {{else}}
   class=${s["font-h7"]}
   {{/if}}
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
  color?: "red";
};

export class Typography extends Block {
  constructor(props: TProps) {
    super("div", props);
  }

  override render() {
    return this.compile(typographyTemplate, this.props);
  }
}
