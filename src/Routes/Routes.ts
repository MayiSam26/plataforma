import About from "../Pages/About";
import Home from "../Pages/Home/Home";
import Noticias from "../Pages/Noticias";

type JXSComponent = () => JSX.Element;

interface navigate {
  to: string;
  path: string;
  Component: JXSComponent;
  name: string;
}

export const routes: navigate[] = [
  {
    to: "home",
    path: "/",
    Component: Home,
    name: "Home",
  },
  {
    to: "colitas",
    path: "/colitas",
    Component: About, // si About es la página que lista todas las colitas, se queda
    name: "Colitas",
  },
  {
    to: "noticias",
    path: "/noticias",
    Component: Noticias,
    name: "Noticias",
  },
];