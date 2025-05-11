import { RegistrationModal } from "../../4_widgets/RegistrationModal/RegistrationModal";
import { Block } from "../../8_utils/helpers/block";
import s from "./RegistrationPage.module.scss";

const registrationPageTemplate = `
<div class=${s["container"]}>
  {{{RegistrationModal}}}
</div>
`;

type TProps = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valuePhone: string;
  valuePassword: string;
  valueRepeatPassword: string;
};

export class RegistrationPage extends Block {
  constructor(props: TProps) {
    super("div", { RegistrationModal: new RegistrationModal(props) });
  }

  override render() {
    return this.compile(registrationPageTemplate, this.props);
  }
}
