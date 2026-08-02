
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface Props {
  grupos?: any[];
}

interface Props {
  tipoAnimal: string;
  genero: string;
  tamano: string;
  handleTipoAnimal: (value: string) => void;
  handleGenero: (value: string) => void;
  handleTamano: (value: string) => void;
  handleBuscar: () => void;
}

export default function FiltroAnimales({
 tipoAnimal,
  genero,
  tamano,
  handleTipoAnimal,
  handleGenero,
  handleTamano,
  handleBuscar,
}: Props) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        borderRadius: "9px",
        boxShadow:
          "0px 0px 4px 0px rgba(82, 112, 148, 0.20), 0px 1px 1px 0px rgba(82, 112, 148, 0.12), 0px 1px 1px 0px rgba(82, 112, 148, 0.14)",
        p: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3.2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo de Animal</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo de Animal"
            value={tipoAnimal ?? ""}
            onChange={(e) => handleTipoAnimal(e.target.value as string)}
            >
              <MenuItem value="">Todos</MenuItem>
               <MenuItem value="2">Perro</MenuItem>
                <MenuItem value="1">Gato</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Género</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Género"
             value={genero ?? ""}
            onChange={(e) => handleGenero(e.target.value as string)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="1">Macho</MenuItem>
                <MenuItem value="2">Hembra</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      

        <Grid item xs={12} sm={6} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Tamaño</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tamaño"
              value={tamano ?? ""}
              onChange={(e) => handleTamano(e.target.value as string)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Pequeño">Pequeño</MenuItem>
              <MenuItem value="Mediano">Mediano</MenuItem>
               <MenuItem value="Grande">Grande</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}></Grid>
        <Grid
          item
          xs={12}
          md={1}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box display="flex" justifyContent="space-between">

            <Button
              style={{
                backgroundColor: "#3F9E5C",
                color: "white",
                borderRadius: "999px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                textTransform: "capitalize",
                fontSize: "14px",
                width: "200px",
              }}
            onClick={handleBuscar}
            >
              Buscar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}