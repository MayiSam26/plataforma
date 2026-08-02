import { Fragment } from "react/jsx-runtime";
import MiniNav from "./Home/Component/MiniNav";
import Header from "./Home/Component/Header";
import Footer from "./Home/Component/Footer";
import Perdidos from "./Home/Component/Perdidos";
import urlBase from "../config/index";
import axios from "axios";
import React, { useEffect } from "react";
import FiltroAnimales from "./Home/Component/SearchColitas";

export default function About() {
  const [perdidosRecientes, setPerdidosRecientes] = React.useState<any[]>([]);
  const [tipoAnimal, setTipoAnimal] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [tamano, setTamano] = React.useState("");

  // ✅ Al entrar a /colitas, fuerza scroll arriba (evita que te mande al footer)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTipoAnimal = (value: string) => {
    setTipoAnimal(value);
  };

  const handleGenero = (value: string) => {
    setGenero(value);
  };

  const handleTamano = (value: string) => {
    setTamano(value);
  };

  const getPerdidoRecientes = () => {
    const url = urlBase.pathBase + "colitas/list";

    axios
      .post(url, {
        estado: "En refugio",
        p_idtipoanimal: tipoAnimal,
        p_idgenero: genero,
        p_tamano: tamano,
      })
      .then((response: any) => {
        const { data } = response.data;
        setPerdidosRecientes(data);

        // ✅ Opcional: cuando busques, sube al inicio del listado
        // (si no lo quieres, borra estas 2 líneas)
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getPerdidoRecientes();
  }, []);

  return (
    <Fragment>
      <MiniNav />
      <Header />

      <div className="container-fluid bg-light mt-5 py-3">
        <div className="container">
          <div style={{ marginBottom: "10px" }}>
            <FiltroAnimales
              tipoAnimal={tipoAnimal}
              genero={genero}
              tamano={tamano}
              handleTipoAnimal={handleTipoAnimal}
              handleGenero={handleGenero}
              handleTamano={handleTamano}
              handleBuscar={getPerdidoRecientes}
            />
          </div>

          <div className="row">
            <Perdidos perdidosRecientes={perdidosRecientes} />
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}