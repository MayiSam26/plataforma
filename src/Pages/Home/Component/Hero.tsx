import { Fragment, useEffect, useRef, useState } from "react";
import { dataHero } from "../Interfaces/dataHero";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  // Autoplay real, controlado desde React: el data-ride="carousel" de
  // Bootstrap solo arranca solo en el evento "load" de la página, que ya
  // pasó antes de que React monte este div - por eso antes el carrusel se
  // veía como una imagen fija hasta el primer click manual en una flecha.
  useEffect(() => {
    const timer = setInterval(() => {
      if (paused.current) return;
      setActive((prev) => (prev + 1) % dataHero.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setActive((index + dataHero.length) % dataHero.length);
  };

  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div
          className="cya-hero"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div className="cya-hero-track">
            {dataHero.map((item, index) => (
              <div
                key={item.id}
                className={`cya-hero-slide ${index === active ? "active" : ""}`}
                aria-hidden={index !== active}
              >
                <img
                  className="cya-hero-slide__img"
                  src={item.urlimg}
                  alt=""
                  style={{
                    height: "70vh",
                    minHeight: "360px",
                    objectFit: "cover",
                  }}
                />
                <div className="hero-overlay"></div>

                <div className="cya-hero-slide__caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3 w-100" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      {item.mainheader}
                    </h3>

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
          <button
            type="button"
            className="cya-hero-nav cya-hero-nav--prev"
            onClick={() => goTo(active - 1)}
            aria-label="Anterior"
          >
            <div
              className="btn btn-primary rounded"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-prev-icon mb-n2"></span>
            </div>
          </button>

          <button
            type="button"
            className="cya-hero-nav cya-hero-nav--next"
            onClick={() => goTo(active + 1)}
            aria-label="Siguiente"
          >
            <div
              className="btn btn-primary rounded"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="carousel-control-next-icon mb-n2"></span>
            </div>
          </button>

          {/* INDICADORES */}
          <div className="cya-hero-dots">
            {dataHero.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`cya-hero-dot ${index === active ? "active" : ""}`}
                aria-label={`Ir a la diapositiva ${index + 1}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
