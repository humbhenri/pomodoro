import { Container } from "../../components/Container";
import { GenericHTML } from "../../components/GenericHTML";
import { MainTemplate } from "../../templates/MainTemplate";

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <GenericHTML>
          <h1>404 - Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </GenericHTML>
      </Container>
    </MainTemplate>
  );
}
