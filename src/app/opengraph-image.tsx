import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "РАДУКАН — Умные системы. Связанный результат.";
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
          background:
            "linear-gradient(135deg, #02060d 0%, #07111e 50%, #030811 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#eef6ff",
            marginBottom: 16,
            lineHeight: 1,
          }}
        >
          Умные системы.
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#66a8ff",
            marginBottom: 32,
            lineHeight: 1,
          }}
        >
          Связанный результат.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#8fa6bf",
            letterSpacing: "1px",
          }}
        >
          Учёт клиентов · Автоматизация · Интеграции
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#56c7ff",
            letterSpacing: "4px",
            fontWeight: 700,
          }}
        >
          РАДУКАН.ПРО
        </div>
      </div>
    ),
    { ...size }
  );
}
