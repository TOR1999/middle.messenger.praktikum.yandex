import s from "./Typography.module.scss";

export const Typography = `
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
