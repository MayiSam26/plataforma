import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { dataHeader } from "../Interfaces/dataHeader";

export default function Header() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 px-lg-5 cya-header">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/img/logocito.png" style={{ width: "48px" }} alt="Refugio Colitas & Amor" />
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>Refugio</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: "18px" }}>
              <span className="text-primary">Colitas</span> &amp; Amor
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end px-3 px-lg-0" id="navbarCollapse">
          <div className="navbar-nav align-items-lg-center py-0">
            {dataHeader.map((item: any) =>
              item.path.startsWith("#") ? (
                <a key={item.id} href={item.path} className="nav-item nav-link" style={{ color: "white" }}>
                  {item.name}
                </a>
              ) : (
                <Link key={item.id} to={item.path} className="nav-item nav-link" style={{ color: "white" }}>
                  {item.name}
                </Link>
              )
            )}
            <a href="#adoptar" className="btn btn-primary btn-sm ml-lg-3 mt-3 mt-lg-0">
              Adoptar ahora
            </a>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
