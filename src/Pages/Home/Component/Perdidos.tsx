import { Fragment } from "react/jsx-runtime";
import React from "react";
import { Box, Modal } from "@mui/material";
import urlBase from "../../../config/index";
import DetailPerdido from "../Modal/DetailPerdido";
import axios from "axios";

interface props {
  perdidosRecientes: any;
}

export default function Perdidos({ perdidosRecientes }: props) {
  // ✅ Construye la URL sin doble //, soporta espacios y backslashes
  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
    return `${cleanBase}/${encodeURI(cleanFoto)}`;
  };

  const [openModal, setOpenModa] = React.useState<boolean>(false);
  const [idDetil, setDetail] = React.useState<any>("");
  const [colitasDetalle, setcolitasDetalle] = React.useState<any>(null);

  // ✅ Nuevo: loading para evitar “flash” del anterior
  const [loadingDetail, setLoadingDetail] = React.useState<boolean>(false);

  const openModalDetail = (value: any) => {
    // ✅ Limpia el detalle anterior y muestra loading
    setcolitasDetalle(null);
    setLoadingDetail(true);

    // set ID y abre modal
    setDetail(value);
    setOpenModa(true);
  };

  const getByIdPerdidos = async (id: any) => {
    const url = urlBase.pathBase + "colitas/detail/" + id;

    setLoadingDetail(true);

    axios
      .get(url)
      .then((response) => {
        const { data, code } = response.data;
        if (code === "000") {
          setcolitasDetalle(data);
        } else {
          setcolitasDetalle(null);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setcolitasDetalle(null);
      })
      .finally(() => setLoadingDetail(false));
  };

  React.useEffect(() => {
    if (idDetil) {
      getByIdPerdidos(idDetil);
    }
  }, [idDetil]);

  const modalDetail = () => {
    // ✅ RESPONSIVE MODAL STYLE
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",

      width: "92vw",        // ✅ ancho en móvil
      maxWidth: 700,        // ✅ límite en desktop
      maxHeight: "90vh",    // ✅ no se sale de la pantalla
      overflowY: "auto",    // ✅ scroll dentro si es alto

      p: 2,                 // ✅ padding para que no choque con bordes en móvil
      outline: "none",

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
            loading={loadingDetail} // ✅ Nuevo
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
            onClick={() => openModalDetail(item.idanimal)}
          >
            <div className="pet-card card position-relative overflow-hidden border-0 mb-4">
              <div className="pet-card__img-wrap">
                <img
                  className="card-img-top"
                  style={{ height: "270px", width: "100%", objectFit: "cover" }}
                  src={buildImgUrl(urlBase.pathBase, item.foto)}
                  alt={item.nombre}
                />
                <div className="pet-card__badge">
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