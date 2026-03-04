import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      <div className="col-lg-8 d-flex justify-content-lg-end justify-content-center">
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
          {dataNav.map((item: any, idx: number) => (
            <div
              key={item.id}
              className={`text-center px-3 py-2 ${
                idx !== dataNav.length - 1 ? "border-right" : ""
              }`}
              style={{ minWidth: "180px" }}
            >
              <h6 className="mb-1">{item.name}</h6>
              <p className="m-0 small text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}