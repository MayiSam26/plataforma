import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import urlBase from "../../../config/index";

const initialForm = {
  nombre: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

export default function ContactoDonacion() {
  const [form, setForm] = React.useState(initialForm);
  const [sending, setSending] = React.useState(false);
  const [result, setResult] = React.useState<{ ok: boolean; message: string } | null>(null);

  const handleChange = (field: keyof typeof initialForm) => (e: any) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      setResult({ ok: false, message: "Ingresa un correo electrónico válido." });
      return;
    }

    // El teléfono es opcional, pero si lo llenan debe estar completo (Perú: 9 dígitos).
    if (form.telefono && !/^\d{9}$/.test(form.telefono)) {
      setResult({ ok: false, message: "El teléfono debe tener 9 dígitos numéricos." });
      return;
    }

    setSending(true);
    setResult(null);

    const url = urlBase.pathBase + "contacto/donacion";
    try {
      const response = await axios.post(url, form, { timeout: 15000 });
      const { data } = response;
      if (data.code === "000") {
        setResult({ ok: true, message: data.message });
        setForm(initialForm);
      } else {
        setResult({ ok: false, message: data.message });
      }
    } catch (error: any) {
      const message =
        error?.code === "ECONNABORTED"
          ? "El envío está tardando demasiado. Intenta nuevamente en unos minutos."
          : error?.response?.data?.message ||
            "No se pudo enviar tu mensaje. Intenta nuevamente.";
      setResult({ ok: false, message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="row justify-content-center mt-4" data-aos="fade-up" data-aos-duration="700">
      <div className="col-lg-8">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(36,40,44,0.08)",
            p: { xs: 3, sm: 4 },
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 0.5 }} variant="h6">
            ¿Tienes una consulta sobre cómo donar?
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }} variant="body2">
            Escríbenos y te contactaremos por correo lo antes posible.
          </Typography>

          {result && (
            <Alert severity={result.ok ? "success" : "error"} sx={{ mb: 2 }}>
              {result.message}
            </Alert>
          )}

          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={2}>
            <TextField
              label="Nombre"
              size="small"
              fullWidth
              required
              value={form.nombre}
              onChange={handleChange("nombre")}
            />
            <TextField
              label="Correo electrónico"
              type="email"
              size="small"
              fullWidth
              required
              value={form.correo}
              onChange={handleChange("correo")}
            />
          </Box>

          <TextField
            label="Teléfono (opcional)"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
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

          <TextField
            label="Mensaje"
            size="small"
            fullWidth
            required
            multiline
            minRows={3}
            sx={{ mb: 3 }}
            value={form.mensaje}
            onChange={handleChange("mensaje")}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={sending}
            sx={{
              background: "#ED6436",
              borderRadius: "999px",
              fontWeight: 700,
              textTransform: "capitalize",
              px: 4,
              "&:hover": { background: "#C74E23" },
            }}
          >
            {sending ? "Enviando..." : "Enviar consulta"}
          </Button>
        </Box>
      </div>
    </div>
  );
}
