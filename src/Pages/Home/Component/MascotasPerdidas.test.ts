import { buildImgUrl } from "./MascotasPerdidas";

describe("buildImgUrl", () => {
  test("ruta normal se concatena con la base", () => {
    expect(buildImgUrl("https://api.test.com/", "foto.jpg")).toBe(
      "https://api.test.com/foto.jpg"
    );
  });

  test("ruta con / inicial no genera doble //", () => {
    expect(buildImgUrl("https://api.test.com/", "/foto.jpg")).toBe(
      "https://api.test.com/foto.jpg"
    );
  });

  test("ruta con backslashes de Windows se convierte a /", () => {
    expect(buildImgUrl("https://api.test.com/", "uploads\\foto.jpg")).toBe(
      "https://api.test.com/uploads/foto.jpg"
    );
  });

  test("base con / final duplicado no genera doble //", () => {
    expect(buildImgUrl("https://api.test.com//", "foto.jpg")).toBe(
      "https://api.test.com/foto.jpg"
    );
  });
});
