import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      <div className="col-lg-8">
        {/* ✅ usa las clases que pusimos en tu SCSS */}
        <div className="top-info d-flex flex-column flex-lg-row justify-content-lg-end align-items-center gap-3">
          {dataNav.map((item, idx) => (
            <div
              key={item.id}
              className={`top-info__item text-center ${
                idx !== dataNav.length - 1 ? "top-info__divider" : ""
              }`}
            >
              <h6 className="mb-1">{item.name}</h6>
              <p className="m-0">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}