import { TaskContextProvider } from "./context/TaskProvider";
import { MessagesContainer } from "./components/MessagesContainer";
import { Home } from "./pages/Home";
import { AboutPomodoro } from "./pages/AboutPomodoro";
import { NotFound } from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/global.css";
import "./styles/theme.css";

export default function App() {
  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-pomodoro" element={<AboutPomodoro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MessagesContainer />
      </BrowserRouter>
    </TaskContextProvider>
  );
}
