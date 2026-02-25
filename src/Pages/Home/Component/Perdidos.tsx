import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { dataPerdidos } from "../Interfaces/dataPerdido";
import moment from "moment";
import React from "react";
import { Box, Modal } from "@mui/material";
import urlBase from "../../../config/index";
import DetailPerdido from "../Modal/DetailPerdido";
import axios from "axios";

interface props {
  perdidosRecientes: any;
}

export default function Perdidos({ perdidosRecientes }: props) {
  // ✅ Función para construir bien la URL de la imagen (sin doble // y con espacios)
  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, ""); // quita / al final
    const cleanFoto = (foto || "")
      .replace(/^\/+/, "")          // quita / al inicio
      .replace(/\\/g, "/");         // cambia \ por /
    return `${cleanBase}/${encodeURI(cleanFoto)}`; // encode por espacios
  };

  const [openModal, setOpenModa] = React.useState<boolean>(false);
  const [idDetil, setDetail] = React.useState<any>("");
  const [colitasDetalle, setcolitasDetalle] = React.useState<any>();

  const openModalDetail = (value: any) => {
    setDetail(value);
    setOpenModa(true);
  };

  const getByIdPerdidos = async () => {
    const url = urlBase.pathBase + "colitas/detail/" + idDetil;
    axios
      .get(url)
      .then((response) => {
        console.log("responsive", response.data);
        const { data, code } = response.data;
        if (code === "000") {
          setcolitasDetalle(data);
        }
      })
      .catch((e) => console.log(e.message));
  };

  React.useEffect(() => {
    if (idDetil) {
      getByIdPerdidos();
    }
  }, [idDetil]);

  const modalDetail = () => {
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      p: 0,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
    };

    return (
      <Modal
        open={openModal}
        onClose={() => setOpenModa(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        disableEnforceFocus
      >
        <Box sx={style}>
          <DetailPerdido
            colitasDetalle={colitasDetalle}
            setOpenModa={setOpenModa}
          />
        </Box>
      </Modal>
    );
  };

  return (
    <Fragment>
      {perdidosRecientes.map((item: any) => {
        return (
          <div
            className="col-lg-3 col-md-6"
            key={item.idanimal}
            onClick={() => {
              openModalDetail(item.idanimal);
            }}
          >
            <div className="team card position-relative overflow-hidden border-0 mb-4">
              <img
                className="card-img-top"
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
                src={buildImgUrl(urlBase.pathBase, item.foto)}
                alt={item.nombre}
              />

              <div className="card-body text-center p-0">
                <div className="team-text d-flex flex-column justify-content-center bg-light">
                  <h5>{item.nombre}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {openModal && idDetil && modalDetail()}
    </Fragment>
  );
}