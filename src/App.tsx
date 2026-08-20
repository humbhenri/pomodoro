import { TaskContextProvider } from "./context/TaskProvider";
import { MessagesContainer } from "./components/MessagesContainer";
import { Home } from "./pages/Home";
import "./styles/global.css";
import "./styles/theme.css";

export default function App() {
  return (
    <TaskContextProvider>
      <Home />
      <MessagesContainer />
    </TaskContextProvider>
  );
}
