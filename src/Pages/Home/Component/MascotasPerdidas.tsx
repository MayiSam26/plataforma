import { Fragment } from "react/jsx-runtime";
import React from "react";
import { Box, Modal } from "@mui/material";
import urlBase from "../../../config/index";
import DetailMascotaPerdida from "../Modal/DetailMascotaPerdida";

interface props {
  perdidos: any;
}

// Construye la URL sin doble //, soporta espacios y backslashes
export function buildImgUrl(base: string, foto: string) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
  return `${cleanBase}/${encodeURI(cleanFoto)}`;
}

export default function MascotasPerdidas({ perdidos }: props) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [seleccionado, setSeleccionado] = React.useState<any>(null);

  const openModalDetail = (item: any) => {
    setSeleccionado(item);
    setOpenModal(true);
  };

  const modalDetail = () => {
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",

      width: "92vw",
      maxWidth: 700,
      maxHeight: "90vh",
      overflowY: "auto",

      p: 2,
      outline: "none",

      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
    };

    return (
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        disableEnforceFocus
      >
        <Box sx={style}>
          <DetailMascotaPerdida perdidoDetalle={seleccionado} setOpenModal={setOpenModal} />
        </Box>
      </Modal>
    );
  };

  return (
    <Fragment>
      {perdidos.map((item: any, idx: number) => {
        return (
          <div
            className="col-lg-3 col-md-6"
            key={item.idmascotaperdida}
            onClick={() => openModalDetail(item)}
          >
            <div
              className="pet-card card position-relative overflow-hidden border-0 mb-4"
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 100}
              data-aos-duration="700"
            >
              <div className="pet-card__img-wrap">
                <img
                  className="card-img-top"
                  style={{ height: "270px", width: "100%", objectFit: "cover" }}
                  src={buildImgUrl(urlBase.pathBase, item.foto)}
                  alt={item.Nombre}
                  loading="lazy"
                />
                <div className="pet-card__badge">
                  <h5>{item.Nombre}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {openModal && seleccionado && modalDetail()}
    </Fragment>
  );
}
