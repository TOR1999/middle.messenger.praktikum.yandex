import { AuthorizationModal } from "../../4_widgets/AuthorizationModal/AuthorizationModal";
import { Block } from "../../8_utils/helpers/block";
import s from "./AuthorizationPage.module.scss";

const authorizationPageTemplate = `
  {{{AuthorizationModal}}}
`;

type TProps = {
  valueLogin: string;
  valuePassword: string;
};

export class AuthorizationPage extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      AuthorizationModal: new AuthorizationModal({
        valueLogin: props.valueLogin,
        valuePassword: props.valuePassword,
      }),
    });
  }

  override render() {
    return this.compile(authorizationPageTemplate, this.props);
  }
}
