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
import "moment/locale/es";
import urlBase from "../../../config/index";

moment.locale("es");

export default function CardDetalleAnimal({
  colitasDetalle,
  setOpenModa,
  loading,
}: any) {
  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
    return `${cleanBase}/${encodeURI(cleanFoto)}`;
  };

  if (loading || !colitasDetalle) {
    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: "92vw", sm: 700 },
          mx: "auto",
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            pt: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Cargando...
          </Typography>
          <IconButton onClick={() => setOpenModa(false)} sx={{ flexShrink: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: { xs: 220, sm: 280 },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CircularProgress />
        </Box>

        <CardContent sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
          <Typography variant="body1">Por favor espera un momento.</Typography>
        </CardContent>
      </Card>
    );
  }

  const imageUrl = buildImgUrl(urlBase.pathBase, colitasDetalle?.foto);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "92vw", sm: 700 },
        mx: "auto",
        boxShadow: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 2 }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="text.primary"
          sx={{ pr: 1, wordBreak: "break-word" }}
        >
          {colitasDetalle?.nombre}
        </Typography>
        <IconButton onClick={() => setOpenModa(false)} sx={{ flexShrink: 0 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <CardMedia
        component="img"
        image={imageUrl}
        alt={colitasDetalle?.nombre}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 320 }, // puedes ajustar
          objectFit: "contain", // ✅ NO recorta, muestra completa
          backgroundColor: "#f9f9f9", // ✅ relleno para los espacios
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
          <Typography
            fontWeight={700}
            color="#ED6436"
            textTransform="capitalize"
          >
            Tamaño: {colitasDetalle?.tamano}
          </Typography>
          <Typography
            fontWeight={700}
            color="#65C178"
            textTransform="capitalize"
          >
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

        <Typography sx={{ mb: 1, wordBreak: "break-word" }}>
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
