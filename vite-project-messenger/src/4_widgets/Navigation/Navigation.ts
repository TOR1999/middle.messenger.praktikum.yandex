export const Navigation = `
<nav>
  <ul>
    {{#each pages}}
    <li class="navigation-link">
      {{> Link 
      href="#" 
      class=this.variant 
      data-page=this.dataPages 
      text=this.text
      }}
    </li>
    {{/each}}
  </ul>
</nav>
`;
