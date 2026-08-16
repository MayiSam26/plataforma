import { Fragment } from "react/jsx-runtime";
import MiniNav from "./Home/Component/MiniNav";
import Header from "./Home/Component/Header";
import Footer from "./Home/Component/Footer";
import Perdidos from "./Home/Component/Perdidos";
import urlBase from "../config/index";
import axios from "axios";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FiltroAnimales from "./Home/Component/SearchColitas";
import PetsIcon from "@mui/icons-material/Pets";
import { CircularProgress } from "@mui/material";

export default function About() {
  const [animales, setAnimales] = React.useState<any[]>([]);
  const [cargando, setCargando] = React.useState(true);
  const [tipoAnimal, setTipoAnimal] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [tamano, setTamano] = React.useState("");

  // ✅ Al entrar a /colitas, fuerza scroll arriba (evita que te mande al footer)
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({});
  }, []);

  const handleTipoAnimal = (value: string) => setTipoAnimal(value);
  const handleGenero = (value: string) => setGenero(value);
  const handleTamano = (value: string) => setTamano(value);

  const getAnimales = React.useCallback(() => {
    const url = urlBase.pathBase + "colitas/list";
    setCargando(true);
    axios
      .post(url, {
        estado: "En refugio",
        p_idtipoanimal: tipoAnimal,
        p_idgenero: genero,
        p_tamano: tamano,
      })
      .then((response: any) => {
        const { data } = response.data;
        setAnimales(data || []);
      })
      .catch((e) => {
        console.log(e.message);
        setAnimales([]);
      })
      .finally(() => setCargando(false));
  }, [tipoAnimal, genero, tamano]);

  // Búsqueda automática (con pequeña espera), sin botón "Buscar".
  useEffect(() => {
    const timer = setTimeout(() => {
      getAnimales();
    }, 350);
    return () => clearTimeout(timer);
  }, [getAnimales]);

  return (
    <Fragment>
      <MiniNav />
      <Header />

      <div className="container-fluid bg-light pt-5 pb-3">
        <div className="container">
          <div className="text-center mb-4 pt-4" data-aos="fade-up" data-aos-duration="700">
            <h4 className="text-secondary mb-3">Ayúdanos a Adoptar</h4>
            <h1 className="display-4 m-0">
              Colitas <span className="text-primary">en Refugio</span>
            </h1>
            <p className="mt-3 mb-0" style={{ maxWidth: 620, marginInline: "auto" }}>
              Estos son todos los peluditos que hoy esperan un hogar. Filtra por tipo, género o
              tamaño para encontrar a tu nuevo compañero.
            </p>
          </div>

          <div style={{ marginBottom: "10px" }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
            <FiltroAnimales
              tipoAnimal={tipoAnimal}
              genero={genero}
              tamano={tamano}
              handleTipoAnimal={handleTipoAnimal}
              handleGenero={handleGenero}
              handleTamano={handleTamano}
            />
          </div>

          {cargando ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
              <CircularProgress sx={{ color: "#ED6436" }} />
              <p className="text-muted mt-3 mb-0">Buscando colitas...</p>
            </div>
          ) : animales.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
              <PetsIcon sx={{ fontSize: 56, color: "#c9c9c9", mb: 1 }} />
              <h5 className="mb-1">No encontramos colitas con estos filtros</h5>
              <p className="text-muted mb-0">Prueba cambiando el tipo, género o tamaño.</p>
            </div>
          ) : (
            <div className="row pb-3">
              <Perdidos perdidosRecientes={animales} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
