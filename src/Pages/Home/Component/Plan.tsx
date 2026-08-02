import { Fragment } from "react/jsx-runtime";
import urlBase from "../../../config/index";

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
      {plan.map((item: any) => {
        const { content } = item;

        const contentParse =
          urlBase.pathBase == "https://bakendultimo-production.up.railway.app"
            ? JSON.parse(content)
            : content;

        return (
          <div className="col-lg-4 mb-4" key={item.idplanmensual}>
            <div className="donation-card">
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
