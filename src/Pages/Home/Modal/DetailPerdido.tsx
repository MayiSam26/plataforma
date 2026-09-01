import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  CircularProgress,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PetsIcon from "@mui/icons-material/Pets";
import React from "react";
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import urlBase from "../../../config/index";

moment.locale("es");

const initialForm = {
  Nombre: "",
  Apellido: "",
  Dni: "",
  Direccion: "",
  telefono: "",
  correo: "",
  Motivo: "",
};

// Laxo a proposito: la regla estricta del estandar rechaza correos que en la
// practica funcionan. Alcanza con descartar lo que claramente no lo es.
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CardDetalleAnimal({
  colitasDetalle,
  setOpenModa,
  loading,
}: any) {
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [sending, setSending] = React.useState(false);
  const [result, setResult] = React.useState<{ ok: boolean; message: string } | null>(null);

  const buildImgUrl = (base: string, foto: string) => {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanFoto = (foto || "").replace(/^\/+/, "").replace(/\\/g, "/");
    return `${cleanBase}/${encodeURI(cleanFoto)}`;
  };

  const handleChange = (field: keyof typeof initialForm) => (e: any) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{8}$/.test(form.Dni)) {
      setResult({ ok: false, message: "El DNI debe tener 8 dígitos numéricos." });
      return;
    }

    // Perú: los números de contacto son de 9 dígitos. El campo ya solo deja
    // escribir dígitos, esto atrapa el caso de dejarlo a medio escribir.
    if (!/^\d{9}$/.test(form.telefono)) {
      setResult({ ok: false, message: "El teléfono debe tener 9 dígitos numéricos." });
      return;
    }

    // El correo es opcional, pero si lo escriben mal el refugio se queda sin
    // como responder y la persona nunca se entera.
    if (form.correo && !CORREO.test(form.correo)) {
      setResult({ ok: false, message: "Revisa tu correo electrónico: el formato no es válido." });
      return;
    }

    setSending(true);
    setResult(null);

    const url = urlBase.pathBase + "adopciones/solicitar";
    try {
      const response = await axios.post(url, {
        ...form,
        idanimal: colitasDetalle?.idanimal,
      });
      const { data } = response;
      if (data.code === "000") {
        setResult({ ok: true, message: data.message });
        setForm(initialForm);
      } else {
        setResult({ ok: false, message: data.message });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "No se pudo enviar tu solicitud. Intenta nuevamente.";
      setResult({ ok: false, message });
    } finally {
      setSending(false);
    }
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
  const disponible = colitasDetalle?.estado === "En refugio";

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
            {/* El servidor calcula la edad desde la fecha de nacimiento, así
                que no envejece mal. Si no la trae, se cae al dato antiguo. */}
            {colitasDetalle?.edad_texto ||
              (colitasDetalle?.Edada_Aprox
                ? `${colitasDetalle.Edada_Aprox} año(s)`
                : "No registrada")}
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

        <Typography sx={{ mb: 3 }}>
          <strong>Fecha Rescatado:</strong>{" "}
          <span style={{ fontWeight: 400 }}>
            {moment(colitasDetalle?.Fecha_Ingreso).format("LL")}
          </span>
        </Typography>

        {!disponible && (
          <Alert severity="info">
            {colitasDetalle?.nombre} ya tiene un proceso de adopción en curso
            o ya fue adoptado. ¡Gracias por tu interés!
          </Alert>
        )}

        {disponible && result?.ok && <Alert severity="success">{result.message}</Alert>}

        {disponible && !result?.ok && !showForm && (
          <Button
            fullWidth
            variant="contained"
            startIcon={<PetsIcon />}
            onClick={() => setShowForm(true)}
            sx={{
              background: "#ED6436",
              borderRadius: "999px",
              py: 1.2,
              fontWeight: 700,
              textTransform: "capitalize",
              "&:hover": { background: "#C74E23" },
            }}
          >
            Quiero adoptar a {colitasDetalle?.nombre}
          </Button>
        )}

        {disponible && showForm && !result?.ok && (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography sx={{ mb: 2, fontWeight: 700 }}>
              Cuéntanos quién eres para poder contactarte
            </Typography>

            {result && !result.ok && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {result.message}
              </Alert>
            )}

            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={2}>
              <TextField
                label="Nombres"
                size="small"
                fullWidth
                required
                value={form.Nombre}
                onChange={handleChange("Nombre")}
              />
              <TextField
                label="Apellidos"
                size="small"
                fullWidth
                required
                value={form.Apellido}
                onChange={handleChange("Apellido")}
              />
            </Box>

            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={2}>
              <TextField
                label="DNI"
                size="small"
                fullWidth
                required
                helperText="8 dígitos"
                inputProps={{ maxLength: 8, inputMode: "numeric" }}
                value={form.Dni}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    Dni: e.target.value.replace(/\D/g, "").slice(0, 8),
                  }))
                }
              />
              <TextField
                label="Teléfono"
                size="small"
                fullWidth
                required
                helperText="9 dígitos"
                inputProps={{ maxLength: 9, inputMode: "numeric", pattern: "[0-9]*" }}
                value={form.telefono}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    telefono: e.target.value.replace(/\D/g, "").slice(0, 9),
                  }))
                }
              />
            </Box>

            <TextField
              label="Dirección"
              size="small"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={form.Direccion}
              onChange={handleChange("Direccion")}
            />

            <TextField
              label="Correo electrónico (opcional)"
              type="email"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={form.correo}
              helperText="Por aquí te escribiremos sobre tu solicitud"
              onChange={handleChange("correo")}
            />

            <TextField
              label="¿Por qué quieres adoptarlo?"
              size="small"
              fullWidth
              required
              multiline
              minRows={3}
              sx={{ mb: 2 }}
              value={form.Motivo}
              onChange={handleChange("Motivo")}
            />

            <Box display="flex" gap={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowForm(false)}
                sx={{ borderRadius: "999px", textTransform: "capitalize" }}
                disabled={sending}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={sending}
                sx={{
                  background: "#ED6436",
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  "&:hover": { background: "#C74E23" },
                }}
              >
                {sending ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
