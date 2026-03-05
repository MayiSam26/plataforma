import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      {/* ✅ Contenedor: en desktop a la derecha, en móvil centrado */}
      <div className="col-lg-8 d-flex justify-content-center justify-content-lg-end">
        {/* ✅ Wrapper: permite que en pantallas medianas envuelva sin romper */}
        <div className="top-info d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
          {dataNav.map((item: any, index: number) => (
            <div
              key={item.id}
              className={`top-info__item text-center px-3 ${
                index !== dataNav.length - 1 ? "top-info__divider" : ""
              }`}
            >
              <h6 className="m-0">{item.name}</h6>
              <p className="m-0">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}