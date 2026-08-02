import { Fragment } from "react/jsx-runtime";

const items = [
  {
    icon: "flaticon-house",
    title: "Adopciones",
    text: "Dar un hogar a quienes nos necesitan.",
  },
  {
    icon: "flaticon-food",
    title: "Donaciones",
    text: "Tu generosidad salva vidas, ayúdanos a seguir con nuestras metas.",
  },
  {
    icon: "flaticon-grooming",
    title: "Apadrinamiento",
    text: "Brinda amor a distancia, transforma un día común en una historia extraordinaria.",
  },
  {
    icon: "flaticon-toy",
    title: "Búsqueda",
    text: "Ayudamos a reunir a mascotas perdidas con sus familias.",
  },
];

export default function Info() {
  return (
    <Fragment>
      <div className="row py-2 m-auto">
        {items.map((item) => (
          <div className="col-sm-6 mb-4" key={item.title}>
            <div className="info-card d-flex align-items-start">
              <span className={`icon-badge ${item.icon}`}></span>
              <div>
                <h5 className="mb-2">{item.title}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}