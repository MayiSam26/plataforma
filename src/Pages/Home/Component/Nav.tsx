import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      {/* contenedor correcto */}
      <div className="container-fluid">
        <div className="row justify-content-center">

          <div className="col-12 col-lg-8 text-center text-lg-right">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-end">

              {dataNav.map((item: any) => (
                <div
                  key={item.id}
                  className="d-flex flex-column text-center px-3 border-right mb-2"
                >
                  <h6>{item.name}</h6>
                  <p className="m-0">{item.description}</p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
}