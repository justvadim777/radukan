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
          backgroundColor: "#16181A",
          borderRadius: 4,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#D4AF37",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size }
  );
}
