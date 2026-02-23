import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import urlBase from "../../../config/index";

export default function CardDetalleAnimal({ colitasDetalle, setOpenModa }: any) {
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
  image={urlBase.pathBase + "/" + colitasDetalle?.foto}
  alt={colitasDetalle?.nombre}
  sx={{
    height: 280, // puedes ajustar este valor según tu diseño
    width: '100%',
    objectFit: 'contain', // para que se vea completa
    borderRadius: 0, // bordes rectos
    backgroundColor: '#f9f9f9' // opcional para evitar fondo negro
  }}
/>


      <CardContent sx={{ px: 4 }}>
        <Box display="flex" justifyContent="space-between" py={1}>
          <Typography fontWeight={700} color="#ED6436" textTransform="capitalize">
            Tamaño: {colitasDetalle?.tamano}
          </Typography>
          <Typography fontWeight={700} color="#65C178" textTransform="capitalize">
            Género: {colitasDetalle?.idgenero==1?"Macho":"Hembra"}
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
