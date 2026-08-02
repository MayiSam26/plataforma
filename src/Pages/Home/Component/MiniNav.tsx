import { Fragment } from "react/jsx-runtime";
import { dataMiniNav } from "../Interfaces/dataMiniNav";
import { dataNav } from "../Interfaces/dataNav";
import { Link } from "react-router-dom";

export default function MiniNav() {
  return (
    <Fragment>
      <div className="cya-topbar d-none d-lg-block">
        <div className="container-fluid px-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-8 d-flex">
              <div className="d-inline-flex align-items-center flex-wrap">
                {dataNav.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`cya-topbar__item ${
                      idx !== dataNav.length - 1 ? "cya-topbar__divider" : ""
                    }`}
                  >
                    <span className="cya-topbar__label">{item.name}:</span>{" "}
                    {item.description}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 text-right">
              <div className="d-inline-flex align-items-center">
                {dataMiniNav.map((item: any) => (
                  <Link
                    key={item.id}
                    className="cya-topbar__social"
                    to={item.url}
                    target="_blank"
                  >
                    <i className={"fab " + item.icon}></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
