import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import "moment/locale/es"; // ✅ importar locale español
import urlBase from "../../../config/index";

moment.locale("es"); // ✅ activar español

export default function CardDetalleAnimal({ colitasDetalle, setOpenModa, loading }: any) {
  // ✅ Construye la URL sin doble //, soporta espacios y backslashes
  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanFoto = (foto || "")
      .replace(/^\/+/, "")
      .replace(/\\/g, "/");
    return `${cleanBase}/${encodeURI(cleanFoto)}`;
  };

  // ✅ Si está cargando o aún no hay data, mostramos un loader (evita ver el anterior)
  if (loading || !colitasDetalle) {
    return (
      <Card sx={{ maxWidth: 700, mx: "auto", boxShadow: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Cargando...
          </Typography>
          <IconButton onClick={() => setOpenModa(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: 280,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CircularProgress />
        </Box>

        <CardContent sx={{ px: 4, py: 3 }}>
          <Typography variant="body1">Por favor espera un momento.</Typography>
        </CardContent>
      </Card>
    );
  }

  const imageUrl = buildImgUrl(urlBase.pathBase, colitasDetalle?.foto);

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", boxShadow: 4, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          {colitasDetalle?.nombre}
        </Typography>
        <IconButton onClick={() => setOpenModa(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <CardMedia
        component="img"
        image={imageUrl}
        alt={colitasDetalle?.nombre}
        sx={{
          height: 280,
          width: "100%",
          objectFit: "contain",
          borderRadius: 0,
          backgroundColor: "#f9f9f9",
        }}
      />

      <CardContent sx={{ px: 4 }}>
        <Box display="flex" justifyContent="space-between" py={1}>
          <Typography fontWeight={700} color="#ED6436" textTransform="capitalize">
            Tamaño: {colitasDetalle?.tamano}
          </Typography>
          <Typography fontWeight={700} color="#65C178" textTransform="capitalize">
            Género: {colitasDetalle?.idgenero == 1 ? "Macho" : "Hembra"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography sx={{ mb: 1 }}>
          <strong>Edad:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {colitasDetalle?.Edada_Aprox} año(s)
          </span>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Observaciones:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {colitasDetalle?.observaciones}
          </span>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Esterilización:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {colitasDetalle?.esterelizacion}
          </span>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Fecha Rescatado:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {moment(colitasDetalle?.Fecha_Ingreso).format("LL")}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}