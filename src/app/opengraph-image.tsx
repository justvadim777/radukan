import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RADUCAN — Строю системы для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#16181A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "8px",
            color: "#D4AF37",
            marginBottom: 24,
          }}
        >
          RADUCAN
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#8A8A8E",
            letterSpacing: "2px",
          }}
        >
          СТРОЮ СИСТЕМЫ ДЛЯ БИЗНЕСА
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#D4AF37",
            letterSpacing: "3px",
          }}
        >
          RADUCAN.PRO
        </div>
      </div>
    ),
    { ...size }
  );
}
