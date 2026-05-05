export default function Loading() {
  return (
    <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div
        className="skeleton-block"
        style={{ width: "30%", height: "48px", marginBottom: "20px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "70%", height: "20px", marginBottom: "32px" }}
      />
      {/* category filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-block"
            style={{ width: "90px", height: "36px" }}
          />
        ))}
      </div>
      {/* article cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-block"
            style={{ height: "180px" }}
          />
        ))}
      </div>
    </div>
  );
}
