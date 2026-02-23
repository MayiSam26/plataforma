import { Fragment } from "react/jsx-runtime";
import MiniNav from "./Home/Component/MiniNav";
import Header from "./Home/Component/Header";
import Nav from "./Home/Component/Nav";
import { Link } from "react-router-dom";
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
    const url = urlBase.pathBase + "/colitas/list";
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
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getPerdidoRecientes();
  }, []);
  return (
    <Fragment>
      <MiniNav />
      <div className="container-fluid">
        <div className="row py-3 px-lg-5">
          <div className="col-lg-4">
            <Link
              to="/"
              className="navbar-brand d-none d-flex"
              style={{
                alignItems: "center",
              }}
            >
              <img src="/img/logocito.png" style={{ width: "60px" }} />
              <h3
                className="m-0 display-5 text-capitalize"
                style={{ lineHeight: "0px" }}
              >
                <h6>Refugio</h6>
                <span className="text-primary">Colitas</span> & Amor
              </h3>
            </Link>
          </div>
          <Nav />
        </div>
      </div>
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
