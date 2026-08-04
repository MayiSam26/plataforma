import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import moment from "moment";
import "moment/locale/es";
import urlBase from "../../../config/index";

moment.locale("es");

export default function DetailMascotaPerdida({ perdidoDetalle, setOpenModal }: any) {
  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
    return `${cleanBase}/${encodeURI(cleanFoto)}`;
  };

  if (!perdidoDetalle) {
    return null;
  }

  const imageUrl = buildImgUrl(urlBase.pathBase, perdidoDetalle?.foto);
  const dueno = perdidoDetalle?.dueno;

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "92vw", sm: 700 },
        mx: "auto",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: 4,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="text.primary"
          sx={{ pr: 1, wordBreak: "break-word" }}
        >
          {perdidoDetalle?.Nombre}
        </Typography>
        <IconButton onClick={() => setOpenModal(false)} sx={{ flexShrink: 0 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <CardMedia
        component="img"
        image={imageUrl}
        alt={perdidoDetalle?.Nombre}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 320 },
          objectFit: "contain",
          backgroundColor: "#f9f9f9",
          display: "block",
        }}
      />

      <CardContent sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={1}
          py={1}
        >
          <Typography fontWeight={700} color="#ED6436" textTransform="capitalize">
            Tamaño: {perdidoDetalle?.tamano}
          </Typography>
          <Typography fontWeight={700} color="#65C178" textTransform="capitalize">
            Género: {perdidoDetalle?.genero?.descripcion}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography sx={{ mb: 1 }}>
          <strong>Tipo:</strong>{" "}
          <span style={{ fontWeight: 400 }}>{perdidoDetalle?.tipo?.descripcion}</span>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Edad:</strong> <span style={{ fontWeight: 400 }}>{perdidoDetalle?.Edad}</span>
        </Typography>

        <Typography sx={{ mb: 1, wordBreak: "break-word" }}>
          <strong>Observaciones:</strong>{" "}
          <span style={{ fontWeight: 400 }}>{perdidoDetalle?.Observaciones}</span>
        </Typography>

        <Typography sx={{ mb: 3 }}>
          <strong>Fecha de extravío:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {moment(perdidoDetalle?.Fecha_Extravio).format("LL")}
          </span>
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Contacto del dueño</Typography>
        <Typography sx={{ mb: 1.5 }}>{dueno?.nombre || "No disponible"}</Typography>

        <Box display="flex" gap={1.5} flexWrap="wrap">
          {dueno?.facebook && (
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              href={dueno.facebook}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: "999px", textTransform: "none" }}
            >
              Facebook
            </Button>
          )}
          {dueno?.instagram && (
            <Button
              variant="outlined"
              startIcon={<InstagramIcon />}
              href={dueno.instagram}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: "999px", textTransform: "none" }}
            >
              Instagram
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
