import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      <div className="col-lg-8 d-flex justify-content-center justify-content-lg-end">
        <div className="top-info d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
          {dataNav.map((item: any, index: number) => (
            <div
              key={item.id}
              className={`top-info__item text-center ${
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