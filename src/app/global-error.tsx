"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          background: "#030811",
          color: "#eef6ff",
          fontFamily: "Inter, system-ui, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 480 }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>
            Сайт временно недоступен
          </h2>
          <p style={{ color: "#8fa6bf", marginBottom: 32 }}>
            Произошла критическая ошибка. Мы уже знаем о проблеме.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #1766ff, #2346c9)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Перезагрузить
          </button>
        </div>
      </body>
    </html>
  );
}
