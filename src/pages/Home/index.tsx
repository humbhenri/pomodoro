import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { MainForm } from '../../components/MainForm';
import { CountDown } from '../../components/CountDown';

export function Home() {
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
