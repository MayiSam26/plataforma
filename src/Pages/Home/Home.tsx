import { Fragment } from "react/jsx-runtime";
import Nav from "./Component/Nav";
import { Link } from "react-router-dom";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Info from "./Component/Info";
import Plan from "./Component/Plan";
import MiniNav from "./Component/MiniNav";
import Perdidos from "./Component/Perdidos";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Component/Footer";
import urlBase from "../../config/index";
import axios from "axios";
import { Button } from "@mui/material";

export default function Home() {
  const [plan, setPlan] = React.useState<any[]>([]);
  const [perdidosRecientes, setPerdidosRecientes] = React.useState<any[]>([]);

  React.useEffect(() => {
    AOS.init({});
  }, []);

  const getPlan = async () => {
    const url = urlBase.pathBase + "plan-mensual/list";
    axios
      .get(url)
      .then((response) => {
        const { data } = response.data;
        setPlan(data);
      })
      .catch((e) => console.log(e.message));
  };

  const getPerdidoRecientes = () => {
    const url = urlBase.pathBase + "colitas/list";
    axios
      .post(url, { estado: "En refugio", limite: 4 })
      .then((response) => {
        const { data } = response.data;
        setPerdidosRecientes(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getPlan();
    getPerdidoRecientes();
  }, []);

  return (
    <Fragment>
      <MiniNav />

     <div className="container">
  <div className="row py-3 align-items-center">
          <div className="col-lg-4">
            <Link
              to="/"
              className="navbar-brand d-none d-flex"
              style={{ alignItems: "center" }}
            >
              <img src="/img/logocito.png" style={{ width: "60px" }} />
              <h3 className="m-0 display-5 text-capitalize" style={{ lineHeight: "0px" }}>
                <h6>Refugio</h6>
                <span className="text-primary">Colitas</span> & Amor
              </h3>
            </Link>
          </div>
          <Nav />
        </div>
      </div>

      <Header />
      <Hero />

      <div className="container-fluid bg-light">
        <div className="container">
          <div
            className="py-5"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <h4 className="text-secondary mb-3 text-center">¿Comó puedes ayudar?</h4>
              <h1 className="display-4 mb-4 text-center">
                Colitas<span className="text-primary"> & Amor</span>
              </h1>
              <p className="text-center">
                Un refugio comprometido con el bienestar animal. Aquí,cada latido y aporte
                es un gesto de amor hacia los peluditos nescesitados.
              </p>
              <Info />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" id="nosotros">
        <div className="row py-5">
          <div className="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
            <h4 className="text-secondary mb-3">Quienes Somos</h4>
            <h1 className="display-4 mb-4">
              <span>Colitas</span> & <span className="text-primary">Amor</span>
            </h1>
            <h5 className="text-muted mb-3">
              Fundado por el Prof. Luis Pereda Roque ubicado en el corazón del Callao,Perú
            </h5>
            <p className="mb-4">
              Nuestra Mision es brindar refugio,cuidado y amor a los peluditos mas
              necesitados, mientras trabajamos para encontrar hogares amorosos y educar a
              la comunidad sobre el cuidado responsable de los animales. Nuestros objetivos son:
            </p>
            <ul className="list-inline">
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Promover el rescate y adopcion de colitas
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Crear conciensia sobre el cuidado de los peluditos y la naturaleza
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Crear video con nuestro rescataditos que diviertan y enseñen a la comunidad amar a los peluditos
                </h5>
              </li>
            </ul>
          </div>
          <div className="col-lg-5">
            <div className="row px-3">
              <div className="col-12 p-0">
                <img className="img-fluid w-100" src="img/somos-10.png" alt="" />
              </div>
              <div className="col-6 p-0">
                <img className="img-fluid w-100" src="img/somos-2.png" alt="" />
              </div>
              <div className="col-6 p-0">
                <img className="img-fluid w-100" src="img/somos-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light pt-5 pb-4" id="donar">
        <div className="container py-5">
          <div className="d-flex flex-column text-center mb-5">
            <h4 className="text-secondary mb-3">Apoya a</h4>
            <h1 className="display-4 m-0">
              Nuestro <span className="text-primary"> Refugio</span>
            </h1>
          </div>
          <div className="row">
            <Plan plan={plan} />
          </div>
        </div>
      </div>

      <div className="container mt-5 pt-5 pb-3" id="adoptar">
        <div className="d-flex flex-column text-center mb-5">
          <h4 className="text-secondary mb-3">Ayudanos a Adoptar</h4>
          <h1 className="display-4 m-0">
            Colitas <span className="text-primary">en Refugio</span>
          </h1>
        </div>

        <div className="row">
          <Perdidos perdidosRecientes={perdidosRecientes} />
        </div>

        {/* ✅ CAMBIO: Link + Button para que NO haga scroll al footer */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Link to="/colitas" style={{ marginLeft: "auto", textDecoration: "none" }}>
            <Button
              sx={{
                background: "#ED6436",
                py: 1,
                px: 1,
                color: "white",
                textTransform: "capitalize",
                borderRadius: "8px",
                width: "150px",
                "&:hover": { background: "#FF8C69" },
              }}
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>

      <div className="container-fluid bg-light pt-5 pb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img className="img-fluid w-100" src="img/adoptante.png" alt="" />
            </div>
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <h4 className="text-secondary mb-3">¿Quiere adoptar?</h4>
              <h1 className="display-4 mb-4">
                <span className="text-primary">Adopta a una de </span> Nuestras Colitas
              </h1>
              <p className="mb-4">
                Algunos de nuestros requisitos para adoptar una colita de nustro refugio son:
              </p>
              <div className="row py-2">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-cat font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Se Mayor de edad</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-doctor font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Cuidado y Compromiso</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <h1 className="flaticon-care font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Paciencia y Amor</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <h1 className="flaticon-dog font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0">Ficha de adopcion</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="container p-0 py-5">
          <div className="d-flex flex-column text-center mb-5">
            <h4 className="text-secondary mb-3">Testimonial</h4>
            <h1 className="display-4 m-0">
              Datos y <span className="text-primary">Logros</span>
            </h1>
          </div>

          <div className="row m-auto justify-content-around">
            <img data-aos="fade-up" src="/img/testimonio1.png" data-aos-duration="2000" />
            <img src="/img/testimonio4.png" />
            <img src="/img/testimonio3.png" data-aos="fade-up" data-aos-duration="2000" />
            <img src="/img/testimonio2.png" />
            <img src="/img/testimonio5.png" data-aos="fade-up" data-aos-duration="2000" />
            <img src="/img/testimonio6.png" />
          </div>
        </div>
      </div>

      <div id="contacto">
        <Footer />
      </div>
    </Fragment>
  );
}