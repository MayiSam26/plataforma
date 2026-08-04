import { Fragment } from "react/jsx-runtime";
import MiniNav from "./Home/Component/MiniNav";
import Header from "./Home/Component/Header";
import Footer from "./Home/Component/Footer";
import MascotasPerdidas from "./Home/Component/MascotasPerdidas";
import urlBase from "../config/index";
import axios from "axios";
import React, { useEffect } from "react";

export default function Perdidos() {
  const [perdidos, setPerdidos] = React.useState<any[]>([]);

  // Al entrar a /perdidos, fuerza scroll arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPerdidos = () => {
    const url = urlBase.pathBase + "perdidos/publicas";

    axios
      .get(url)
      .then((response: any) => {
        const { data } = response.data;
        setPerdidos(data || []);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getPerdidos();
  }, []);

  return (
    <Fragment>
      <MiniNav />
      <Header />

      <div className="container-fluid bg-light mt-5 py-3">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Mascotas Perdidas</h2>
            <p>
              Ayúdanos a reunir a estas mascotas con sus familias. Si reconoces a
              alguna, contacta al dueño con la información de la tarjeta.
            </p>
          </div>

          <div className="row">
            {perdidos.length === 0 && (
              <div className="col-12 text-center py-4">
                <p>No hay mascotas reportadas como perdidas por el momento.</p>
              </div>
            )}
            <MascotasPerdidas perdidos={perdidos} />
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
