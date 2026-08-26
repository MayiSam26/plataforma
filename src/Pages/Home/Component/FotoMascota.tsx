import React from "react";

// Las fotos de las mascotas se sirven desde el backend. Cuando la portada
// pide varias a la vez, el servidor a veces descarta alguna y el visitante
// ve el icono de imagen rota: comprobado que cada una carga sin problema por
// separado, asi que es la simultaneidad, no el archivo.
//
// Este componente reintenta una vez antes de rendirse, y si aun asi falla
// muestra el logo del refugio en gris en lugar de una imagen rota.

interface props {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FotoMascota({ src, alt, className, style }: props) {
  const [intento, setIntento] = React.useState(0);
  const [fallo, setFallo] = React.useState(false);

  // Si cambia la foto (otra mascota), se empieza de cero.
  React.useEffect(() => {
    setIntento(0);
    setFallo(false);
  }, [src]);

  const alFallar = () => {
    if (intento === 0) {
      // Un respiro y un parametro distinto, para que el navegador no
      // devuelva el fallo que ya tiene guardado.
      setTimeout(() => setIntento(1), 700);
      return;
    }
    setFallo(true);
  };

  if (fallo) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--cya-bg-alt, #f4f5f7)",
        }}
        role="img"
        aria-label={`Foto de ${alt} no disponible`}
        title="Foto no disponible"
      >
        <img
          src="/img/logocito.png"
          alt=""
          aria-hidden="true"
          style={{ width: 64, opacity: 0.35 }}
        />
      </div>
    );
  }

  return (
    <img
      className={className}
      style={style}
      src={intento === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}r=1`}
      alt={alt}
      loading="lazy"
      onError={alFallar}
    />
  );
}
