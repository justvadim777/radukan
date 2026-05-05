export default function Loading() {
  return (
    <div style={{ paddingTop: "60px", paddingBottom: "60px", maxWidth: "760px" }}>
      <div
        className="skeleton-block"
        style={{ width: "120px", height: "20px", marginBottom: "20px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "85%", height: "44px", marginBottom: "16px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "60%", height: "44px", marginBottom: "32px" }}
      />
      <div
        className="skeleton-block"
        style={{ width: "140px", height: "16px", marginBottom: "48px" }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="skeleton-block"
          style={{
            width: i % 3 === 0 ? "70%" : "100%",
            height: "16px",
            marginBottom: "12px",
          }}
        />
      ))}
    </div>
  );
}
