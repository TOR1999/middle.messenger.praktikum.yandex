import s from "./Input.module.scss";

export const Input = `
<label class=${s["label"]} for={{inputId}}>
  {{textLabel}}
</label>
<input
class=${s["input"]}
id={{inputId}}
name={{nameInput}}
{{#if (isSimpleEquals variant "text")}} 
type=text
{{/if}}
{{#if (isSimpleEquals variant "password")}} 
type=password
{{/if}}
value="{{value}}"
/>
`;
