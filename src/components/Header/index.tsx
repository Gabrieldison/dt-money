import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header(props: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="banner 1" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
