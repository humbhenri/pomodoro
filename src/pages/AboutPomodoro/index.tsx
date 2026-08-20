import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";

export function AboutPomodoro() {
  return (
    <MainTemplate>
      <Container>
        <Heading>Sobre o Pomodoro</Heading>
        <p>
          A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido
          por Francesco Cirillo no final dos anos 1980. A técnica utiliza um
          cronômetro para dividir o trabalho em intervalos, tradicionalmente de
          25 minutos de duração, separados por pausas curtas.
        </p>
        <p>
          Cada intervalo é conhecido como um &quot;pomodoro&quot;, a palavra
          italiana para tomate, em referência ao cronômetro de cozinha em forma
          de tomate que Cirillo usava quando era estudante universitário.
        </p>
      </Container>
    </MainTemplate>
  );
}
