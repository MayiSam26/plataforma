import { Fragment } from "react/jsx-runtime";

interface props {
  plan: any;
}

// Convierte texto plano (números, links) en algo clickeable cuando aplica
function renderDetail(text: string) {
  const urlMatch = text.match(/(https?:\/\/\S+)/);
  if (urlMatch) {
    const url = urlMatch[0];
    const before = text.slice(0, urlMatch.index).trim();
    return (
      <>
        {before && <span>{before} · </span>}
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </>
    );
  }
  return text;
}

export default function Plan({ plan }: props) {
  return (
    <Fragment>
      {plan.map((item: any, idx: number) => {
        const { content } = item;

        // "content" deberia llegar siempre como arreglo, pero antes esto
        // dependia de comparar la direccion del backend, y si el dato venia
        // como texto la portada entera se caia con "content.map no es una
        // funcion". Ahora se acepta cualquiera de las dos formas y, ante la
        // duda, se muestra la tarjeta sin datos en vez de romper la pagina.
        let contentParse: any[] = [];
        try {
          const crudo = typeof content === "string" ? JSON.parse(content) : content;
          contentParse = Array.isArray(crudo) ? crudo : [];
        } catch {
          contentParse = [];
        }

        return (
          <div className="col-lg-4 mb-4" key={item.idplanmensual}>
            <div
              className="donation-card"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              data-aos-duration="700"
            >
              <img
                className="donation-card__img"
                src={item.cantidad}
                alt={item.nombre}
              />
              <h5 className="donation-card__method">{item.nombre}</h5>
              <ul className="donation-card__detail">
                {contentParse.map((detail: any) => (
                  <li key={detail.id}>{renderDetail(detail.name)}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
