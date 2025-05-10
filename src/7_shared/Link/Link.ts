import { Block } from "../../8_utils/helpers/block";
import s from "./Link.module.scss";

const linkTemplate = `
<a 
href="{{href}}"
{{#if (isSimpleEquals variant "text")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["link_text"]} ${s["link_red-text"]}`}"
   {{else}}
   class="${s["link_text"]}"
   {{/if}}
{{/if}}
{{#if (isSimpleEquals variant "underline")}} 
   {{#if (isSimpleEquals color "red")}} 
   class="${`${s["link_underline"]} ${s["link_red-text"]}`}"
   {{else}}
   class=${s["link_underline"]}
   {{/if}}
{{/if}}
data-page="{{data-page}}">
{{text}}
</a>
`;

type TProps = {
  href: string;
  variant: "text" | "underline";
  text: string;
  onClick?: (e: Event) => void;
  color?: "red";
};

export class Link extends Block {
  constructor(props: TProps) {
    super("a", props);
  }

  override render() {
    return this.compile(linkTemplate, this.props);
  }
}
