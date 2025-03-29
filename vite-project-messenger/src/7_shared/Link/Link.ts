import s from "./Link.module.scss";

export const Link = `
<a 
href="{{href}}"
{{#if (isSimpleEquals variant "text")}} 
   class=${s["link_text"]}
{{/if}}
{{#if (isSimpleEquals variant "underline")}} 
   class=${s["link_underline"]}
{{/if}}
data-page="{{data-page}}">
{{text}}
</a>
`;
