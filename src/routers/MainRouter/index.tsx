import { MessagesContainer } from "../../components/MessagesContainer";
import { Home } from "../../pages/Home";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MessagesContainer />
      <ScrollToTop />
    </BrowserRouter>
  );
}
