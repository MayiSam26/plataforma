import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { dataHeader } from "../Interfaces/dataHeader";

// El menú se abre y cierra con estado de React. Antes lo hacía el JavaScript
// de Bootstrap mediante data-toggle, lo que obligaba a cargar jQuery y el
// paquete de Bootstrap (unos 170 KB desde dos CDN distintos) solo para este
// botón. Con estado propio se comporta igual, carga menos y además se cierra
// al navegar, que es lo que uno espera en un celular.
export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const location = useLocation();

  // Al cambiar de página el menú se cierra solo.
  useEffect(() => {
    setAbierto(false);
  }, [location.pathname, location.hash]);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 px-lg-5 cya-header">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/img/logocito.png" style={{ width: "48px" }} alt="Refugio Colitas & Amor" />
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>Refugio</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: "18px" }}>
              <span className="text-primary">Colitas</span> &amp; Amor
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          aria-controls="navbarCollapse"
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end px-3 px-lg-0 cya-nav${
            abierto ? " show" : ""
          }`}
          id="navbarCollapse"
        >
          <div className="navbar-nav align-items-lg-center py-0">
            {dataHeader.map((item: any) =>
              item.path.startsWith("#") ? (
                // Ancla de una sección del Home: si ya estás en "/" el navegador
                // hace scroll solo; si estás en otra página, primero navega a
                // "/" y Home.tsx se encarga de bajar hasta esa sección.
                <Link
                  key={item.id}
                  to={"/" + item.path}
                  className="nav-item nav-link"
                  style={{ color: "white" }}
                  onClick={() => setAbierto(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  className="nav-item nav-link"
                  style={{ color: "white" }}
                  onClick={() => setAbierto(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              to="/colitas"
              className="btn btn-primary btn-sm ml-lg-3 mt-3 mt-lg-0"
              onClick={() => setAbierto(false)}
            >
              Adoptar ahora
            </Link>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
