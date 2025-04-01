import s from "./Link.module.scss";

export const Link = `
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
