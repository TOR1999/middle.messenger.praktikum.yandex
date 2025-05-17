import { NamePages } from "../../1_app/types";
import { Link, TLink } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";

const navigationTemplate = `
  <ul>
    {{{TypographyTitle}}}
    <li class="navigation-link">
      {{{${NamePages.AUTHORIZATION}}}}
    </li>
    <li class="navigation-link">
       {{{${NamePages.CHATS}}}}
    </li>
    <li class="navigation-link">
      {{{${NamePages.REGISTRATION}}}}
    </li>
    <li class="navigation-link">
      {{{${NamePages.PROFILE}}}}
    </li>
    <li class="navigation-link">
        {{{${NamePages.PROFILE_PAGE_EDITOR_INFO}}}}
    </li>
   <li class="navigation-link">
     {{{${NamePages.PROFILE_PAGE_EDITOR_PASSWORD}}}}
    </li>
     <li class="navigation-link">
     {{{${NamePages.NOTFOUND}}}}
    </li>
     <li class="navigation-link">
      {{{${NamePages.SERVERERROR}}}}
    </li> 
  </ul>
`;

type TProps = {
  title: string;
  pages: TLink[];
};

export class Navigation extends Block {
  constructor(props: TProps) {
    const NamePagesList = Object.values(NamePages);
    const links = props.pages.reduce((acc, link, index) => {
      const namePage = NamePagesList[index];
      return {
        ...acc,
        [namePage]: new Link({
          href: link.href,
          text: link.text,
          variant: link.variant,
          dataPage: link.dataPage,
        }),
      };
    }, {});

    super("nav", {
      attr: {},
      TypographyTitle: new Typography({
        variant: "h2",
        text: props.title,
      }),
      ...links,
    });
  }

  override render() {
    return this.compile(navigationTemplate, this.props);
  }
}
