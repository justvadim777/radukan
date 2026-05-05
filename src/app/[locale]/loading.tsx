export default function Loading() {
  return (
    <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div
        className="skeleton-block"
        style={{ width: "60%", height: "48px", marginBottom: "20px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "85%", height: "20px", marginBottom: "12px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "70%", height: "20px", marginBottom: "40px" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        <div className="skeleton-block" style={{ height: "180px" }} />
        <div className="skeleton-block" style={{ height: "180px" }} />
        <div className="skeleton-block" style={{ height: "180px" }} />
      </div>
    </div>
  );
}
