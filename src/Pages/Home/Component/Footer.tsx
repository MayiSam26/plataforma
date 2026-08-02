import { Link } from "react-router-dom";
import { dataMiniNav } from "../Interfaces/dataMiniNav";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
        {/* ✅ CAMBIO: usamos Bootstrap grid en vez de flex inline */}
        <div className="row pt-5">
          <div className="col-lg-4 col-md-12 mb-5">
            <h1 className="mb-3 display-5 text-capitalize text-white">
              <span className="text-primary">Colitas y</span> Amor
            </h1>
            <p className="m-0">
              El Refugio Colitas y Amor, fundado por Luis Pereda Roque, es una entidad sin
              fines de lucro dedicada a ayudar en el control de animales en abandono. Su misión
              principal es brindarles un hogar permanente a estos animales, ofreciéndoles cuidado,
              protección y amor.
            </p>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5 className="text-primary mb-4">Ubicanos</h5>
                <p><i className="fa fa-map-marker-alt mr-2"></i>Callao</p>
                <p><i className="fa fa-phone-alt mr-2"></i>+51 981557865</p>
                <p style={{ overflowWrap: "anywhere" }}>
                  <i className="fa fa-envelope mr-2"></i>refugiocolitasyamor@gmail.com
                </p>

                <div className="d-flex justify-content-start mt-4 flex-wrap" style={{ gap: "8px" }}>
                  {dataMiniNav.map((item: any) => (
                    <Link
                      key={item.id}
                      target="_blank"
                      className="btn btn-outline-light rounded-circle text-center px-0"
                      style={{ width: "36px", height: "36px" }}
                      to={item.url}
                    >
                      <i className={`fab ${item.icon}`}></i>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-md-6 mb-5">
                <h5 className="text-primary mb-4">Doname</h5>
                <div className="d-flex flex-column justify-content-start">
                  <span className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>
                    <i className="fab fa-paypal mr-2"></i>Paypal
                  </span>

                  <span className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>
                    <i className="fa-solid fa-qrcode mr-2"></i>Yape
                  </span>

                  <span className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>
                    <i className="fa-solid fa-credit-card mr-2"></i>BCP
                  </span>

                  <span className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>
                    <i className="fa-solid fa-credit-card mr-2"></i>Interbank
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}