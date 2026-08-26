import { Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import Info from "./Component/Info";
import Plan from "./Component/Plan";
import ContactoDonacion from "./Component/ContactoDonacion";
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
  const location = useLocation();

  React.useEffect(() => {
    AOS.init({});
  }, []);

  // Si se llega desde otra página con un enlace tipo "/#donar" (menú fijo),
  // baja hasta esa sección una vez que el contenido ya se renderizó, dejando
  // espacio para el header fijo.
  React.useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerHeight = document.querySelector(".cya-header")?.clientHeight || 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: "smooth" });
    }, 200);
    return () => clearTimeout(timer);
  }, [location.hash]);

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
      <Header />
      <Hero />

      {/* ✅ ¿Cómo puedes ayudar? */}
      <div className="container-fluid bg-light">
        <div className="container">
          <div className="py-5 d-flex justify-content-center">
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <div data-aos="fade-up" data-aos-duration="700">
                <h4 className="text-secondary mb-3 text-center">¿Cómo puedes ayudar?</h4>
                <h1 className="display-4 mb-4 text-center">
                  Colitas<span className="text-primary"> & Amor</span>
                </h1>
                <p className="text-center">
                  Un refugio comprometido con el bienestar animal. Aquí, cada latido y aporte
                  es un gesto de amor hacia los peluditos necesitados.
                </p>
              </div>
              <Info />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Nosotros */}
      <div className="container py-5" id="nosotros">
        <div className="row py-5">
          <div className="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5" data-aos="fade-up" data-aos-duration="700">
            <h4 className="text-secondary mb-3">Quienes Somos</h4>
            <h1 className="display-4 mb-4">
              <span>Colitas</span> & <span className="text-primary">Amor</span>
            </h1>
            <h5 className="text-muted mb-3">
              Fundado por el Prof. Luis Pereda Roque ubicado en el corazón del Callao, Perú
            </h5>
            <p className="mb-4">
              Nuestra misión es brindar refugio, cuidado y amor a los peluditos más necesitados,
              mientras trabajamos para encontrar hogares amorosos y educar a la comunidad sobre
              el cuidado responsable de los animales.
            </p>

            <ul className="list-inline">
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Promover el rescate y adopción de colitas
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Crear conciencia sobre el cuidado y la naturaleza
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double text-secondary mr-3"></i>
                  Crear videos que eduquen y diviertan a la comunidad
                </h5>
              </li>
            </ul>
          </div>

          <div className="col-lg-5" data-aos="fade-up" data-aos-delay="150" data-aos-duration="700">
            <div className="row px-3">
              <div className="col-12 p-2">
                <img className="img-fluid w-100 img-rounded-shadow" src="img/somos-10.jpg" alt="" />
              </div>
              <div className="col-6 p-2">
                <img className="img-fluid w-100 img-rounded-shadow" src="img/somos-2.jpg" alt="" />
              </div>
              <div className="col-6 p-2">
                <img className="img-fluid w-100 img-rounded-shadow" src="img/somos-3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Donar */}
      <div className="container-fluid bg-light pt-5 pb-4" id="donar">
        <div className="container py-5">
          <div className="d-flex flex-column text-center mb-5" data-aos="fade-up" data-aos-duration="700">
            <h4 className="text-secondary mb-3">Apoya a</h4>
            <h1 className="display-4 m-0">
              Nuestro <span className="text-primary"> Refugio</span>
            </h1>
          </div>
          <div className="row">
            <Plan plan={plan} />
          </div>
          <ContactoDonacion />
        </div>
      </div>

      {/* ✅ Adoptar */}
      <div className="container mt-5 pt-5 pb-3" id="adoptar">
        <div className="d-flex flex-column text-center mb-5" data-aos="fade-up" data-aos-duration="700">
          <h4 className="text-secondary mb-3">Ayúdanos a Adoptar</h4>
          <h1 className="display-4 m-0">
            Colitas <span className="text-primary">en Refugio</span>
          </h1>
        </div>

        <div className="row">
          <Perdidos perdidosRecientes={perdidosRecientes} />
        </div>

        {/* ✅ "Ver más" correcto */}
        <div className="d-flex justify-content-end">
          <Link to="/colitas" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                background: "#ED6436",
                py: 1,
                px: 2,
                color: "white",
                textTransform: "capitalize",
                borderRadius: "10px",
                width: "170px",
                "&:hover": { background: "#FF8C69" },
              }}
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>

      {/* ✅ Requisitos */}
      <div className="container-fluid bg-light pt-5 pb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5" data-aos="fade-up" data-aos-duration="700">
              <img className="img-fluid w-100 img-rounded-shadow" src="img/adoptante.jpg" alt="" />
            </div>
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <h4 className="text-secondary mb-3">¿Quiere adoptar?</h4>
              <h1 className="display-4 mb-4">
                <span className="text-primary">Adopta a una de </span> Nuestras Colitas
              </h1>
              <p className="mb-4">Algunos requisitos para adoptar una colita son:</p>

              <div className="row py-2">
                <div className="col-sm-6 mb-3" data-aos="fade-up" data-aos-delay="0" data-aos-duration="700">
                  <div className="requirement-badge d-flex align-items-center">
                    <h1 className="flaticon-cat font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="m-0">Ser mayor de edad</h5>
                  </div>
                </div>
                <div className="col-sm-6 mb-3" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
                  <div className="requirement-badge d-flex align-items-center">
                    <h1 className="flaticon-doctor font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="m-0">Cuidado y compromiso</h5>
                  </div>
                </div>
                <div className="col-sm-6 mb-3" data-aos="fade-up" data-aos-delay="200" data-aos-duration="700">
                  <div className="requirement-badge d-flex align-items-center">
                    <h1 className="flaticon-care font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="m-0">Paciencia y amor</h5>
                  </div>
                </div>
                <div className="col-sm-6 mb-3" data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
                  <div className="requirement-badge d-flex align-items-center">
                    <h1 className="flaticon-dog font-weight-normal text-secondary m-0 mr-3"></h1>
                    <h5 className="m-0">Ficha de adopción</h5>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ✅ Datos y Logros (ARREGLADO y centrado) */}
      <div className="container py-5">
        <div className="text-center mb-5" data-aos="fade-up" data-aos-duration="700">
          <h4 className="text-secondary mb-3">Testimonial</h4>
          <h1 className="display-4 m-0">
            Datos y <span className="text-primary">Logros</span>
          </h1>
        </div>

        {/* ✅ IMÁGENES RESPONSIVE EN GRID */}
        <div className="row justify-content-center text-center">
          {[
            "/img/testimonio1.jpg",
            "/img/testimonio4.jpg",
            "/img/testimonio3.jpg",
            "/img/testimonio2.jpg",
            "/img/testimonio5.jpg",
            "/img/testimonio6.jpg",
          ].map((src, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 col-12 mb-4">
              <div
                className="achievement-frame"
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
                data-aos-duration="700"
              >
                <img
                  src={src}
                  className="img-fluid"
                  style={{ maxHeight: 220, objectFit: "contain", width: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="contacto">
        <Footer />
      </div>
    </Fragment>
  );
}