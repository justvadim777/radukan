import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030811",
          borderRadius: 4,
          fontFamily: "sans-serif",
          border: "1px solid rgba(91, 166, 255, 0.34)",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#56c7ff",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size }
  );
}
