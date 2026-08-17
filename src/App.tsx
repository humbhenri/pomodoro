import { TaskContextProvider } from "./context/TaskProvider";
import { Home } from "./pages/Home";
import "./styles/global.css";
import "./styles/theme.css";

export default function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
