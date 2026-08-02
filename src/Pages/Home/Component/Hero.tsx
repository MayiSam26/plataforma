import { Fragment } from "react";
import { dataHero } from "../Interfaces/dataHero";

export default function Hero() {
  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {dataHero.map((item: any, index: number) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ position: "relative" }}
              >
                <img
                  className="w-100"
                  src={item.urlimg}
                  alt="Image"
                  style={{
                    // ✅ Esto mejora muchísimo en móvil
                    height: "70vh",
                    minHeight: "360px",
                    objectFit: "cover",
                  }}
                />
                <div className="hero-overlay"></div>

                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3 w-100" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      {item.mainheader}
                    </h3>

                    {/* ✅ quitamos display-3 y ponemos tamaños responsive */}
                    <h1
                      className="text-white mb-3"
                      style={{
                        fontSize: "clamp(28px, 6vw, 56px)",
                        lineHeight: 1.1,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.maintitle}
                    </h1>

                    <h5 className="text-white mb-3 d-none d-sm-block">
                      {item.mainfooter}
                    </h5>

                    {/* ✅ Botones responsive: centrados + wrap */}
                    <div
                      className="d-flex flex-wrap justify-content-center"
                      style={{ gap: "12px" }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const section = document.getElementById("adoptar");
                          if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="btn btn-lg btn-primary mt-3 mt-md-4 px-4"
                      >
                        Adoptar
                      </a>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const section = document.getElementById("donar");
                          if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="btn btn-lg btn-secondary mt-3 mt-md-4 px-4"
                      >
                        Ayudar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTROLES DEL CARRUSEL */}
          <a
            className="carousel-control-prev"
            href="#header-carousel"
            data-slide="prev"
            aria-label="Anterior"
          >
            <div
              className="btn btn-primary rounded"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-prev-icon mb-n2"></span>
            </div>
          </a>

          <a
            className="carousel-control-next"
            href="#header-carousel"
            data-slide="next"
            aria-label="Siguiente"
          >
            <div
              className="btn btn-primary rounded"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-next-icon mb-n2"></span>
            </div>
          </a>
        </div>
      </div>
    </Fragment>
  );
}