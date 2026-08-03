import { Fragment } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { Box, Modal } from "@mui/material";
import MiniNav from "./Home/Component/MiniNav";
import Header from "./Home/Component/Header";
import Footer from "./Home/Component/Footer";
import urlBase from "../config/index";
import axios from "axios";

function buildImgUrl(base: string, foto: string) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
  return `${cleanBase}/${encodeURI(cleanFoto)}`;
}

function formatFecha(fecha: string) {
  if (!fecha) return "";
  // new Date("YYYY-MM-DD") interpreta la fecha como UTC medianoche, así que
  // en zonas horarias negativas se muestra un día antes. Se arma la fecha
  // con los componentes locales para evitar ese corrimiento.
  const [year, month, day] = fecha.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Noticias() {
  const [noticias, setNoticias] = React.useState<any[]>([]);
  const [cargando, setCargando] = React.useState(true);
  const [seleccionada, setSeleccionada] = React.useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const url = urlBase.pathBase + "noticias/publicas";
    axios
      .get(url)
      .then((response) => {
        const { data } = response.data;
        setNoticias(data || []);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <Fragment>
      <MiniNav />
      <Header />

      <div className="container-fluid bg-light mt-5 py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h4 className="text-secondary">Novedades del refugio</h4>
            <h1 className="display-4">Noticias y Anuncios</h1>
          </div>

          {!cargando && noticias.length === 0 && (
            <p className="text-center text-muted">Todavía no hay noticias publicadas. ¡Vuelve pronto!</p>
          )}

          <div className="row">
            {noticias.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.idnoticia}>
                <div className="news-card mb-4" onClick={() => setSeleccionada(item)}>
                  <div className="news-card__img-wrap">
                    {item.imagen && (
                      <img src={buildImgUrl(urlBase.pathBase, item.imagen)} alt={item.titulo} />
                    )}
                  </div>
                  <div className="news-card__body">
                    <div className="news-card__date">{formatFecha(item.fecha_publicacion)}</div>
                    <h5 className="news-card__title">{item.titulo}</h5>
                    <p className="news-card__excerpt">{item.resumen || item.contenido}</p>
                    <span className="news-card__more">Leer más →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={!!seleccionada}
        onClose={() => setSeleccionada(null)}
        aria-labelledby="noticia-modal-title"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "92vw",
            maxWidth: 700,
            maxHeight: "90vh",
            overflowY: "auto",
            p: 0,
            outline: "none",
            backgroundColor: "var(--cya-white)",
            borderRadius: "var(--cya-radius-md)",
            boxShadow: "var(--cya-shadow-lg)",
          }}
        >
          {seleccionada && (
            <>
              {seleccionada.imagen && (
                <img
                  src={buildImgUrl(urlBase.pathBase, seleccionada.imagen)}
                  alt={seleccionada.titulo}
                  style={{ width: "100%", height: 260, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "1.75rem" }}>
                <div className="news-card__date">{formatFecha(seleccionada.fecha_publicacion)}</div>
                <h3 style={{ fontWeight: 800, color: "var(--cya-dark)" }}>{seleccionada.titulo}</h3>
                <p style={{ color: "var(--cya-text)", whiteSpace: "pre-line", marginTop: "1rem" }}>
                  {seleccionada.contenido}
                </p>
              </div>
            </>
          )}
        </Box>
      </Modal>

      <Footer />
    </Fragment>
  );
}
