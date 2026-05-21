import { Ticker } from "./components/Ticker";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Vision } from "./components/Vision";
import { Environment } from "./components/Environment";
import { Manifesto } from "./components/Manifesto";
import { Membership } from "./components/Membership";
import { Rants } from "./components/Rants";
import { Footer } from "./components/Footer";
import CockroachSwarm from "./components/CockroachSwarm";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
// import { useNavigate } from "react-router-dom";

function ShortcutListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.key === ",") {
        e.preventDefault();
        // navigate("/");
      }

    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyPress
      );
    };
  }, []);

  return null;
}
function App() {
  return (
    <main className="min-h-screen">
      <ShortcutListener />
         <CockroachSwarm />
      <Ticker />
      <Navbar />
      <Hero />
      <Vision />
      <Environment />
      <Manifesto />
      <Membership />
      <Rants />
      <Footer />

    </main>
  );
}
export default App;
