import { TaskContextProvider } from "./context/TaskProvider";
import "./styles/global.css";
import "./styles/theme.css";
import { MainRouter } from "./routers/MainRouter";

export default function App() {
  return (
    <TaskContextProvider>
      <MainRouter />
    </TaskContextProvider>
  );
}
