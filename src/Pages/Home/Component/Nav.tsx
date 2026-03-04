import { Fragment } from "react/jsx-runtime";
import { dataNav } from "../Interfaces/dataNav";

export default function Nav() {
  return (
    <Fragment>
      <div className="container-fluid px-0">
        <div className="row justify-content-center m-0">
          <div className="col-12 col-lg-8 px-3">
            {/* Desktop: fila / Mobile: grid */}
            <div className="row no-gutters justify-content-center justify-content-lg-end">
              {dataNav.map((item: any) => (
                <div key={item.id} className="col-12 col-sm-6 col-lg-auto px-2 mb-2">
                  <div
                    className="bg-white text-center h-100"
                    style={{
                      borderRadius: "10px",
                      padding: "10px 12px",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <h6 className="mb-1" style={{ fontWeight: 700 }}>
                      {item.name}
                    </h6>
                    <p
                      className="m-0"
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}