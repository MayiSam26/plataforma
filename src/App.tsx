import React, { useEffect } from "react";
import "./App.css";
import "./theme.css";
import { RoutesApp } from "./Routes/Route";
import LoadingScreen from "./Components/LoadingScreen";

function App() {

  useEffect(() => {
    const originalTitle = "Refugio Colitas & Amor";

    const titles = [
      "No te vayas 😢",
      "Las colitas te extrañan 🐶",
      "Adopta una vida 💚",
    ];

    let index = 0;
    let interval: any;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        interval = setInterval(() => {
          document.title = titles[index % titles.length];
          index++;
        }, 2000);
      } else {
        clearInterval(interval);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <RoutesApp />
    </>
  );
}

export default App;