import { getTranslations } from "next-intl/server";

export async function Blueprint() {
  const t = await getTranslations("blueprint");

  return (
    <div
      className="relative h-[520px] overflow-hidden rounded-[30px] max-md:h-[420px]"
      aria-hidden="true"
    >
      {/* Grid */}
      <div
        className="absolute inset-[8%]"
        style={{
          transform: "perspective(700px) rotateX(58deg) rotateZ(-28deg)",
          backgroundImage:
            "linear-gradient(rgba(80,160,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(80,160,255,.25) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          boxShadow: "0 0 100px rgba(44,121,255,.22)",
          willChange: "transform",
        }}
      />

      {/* Core */}
      <div
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 0 24px rgba(88,174,255,.45))" }}
      >
        {/* Towers */}
        <div
          className="absolute"
          style={{
            width: 138,
            height: 210,
            left: "43%",
            top: "25%",
            border: "1px solid rgba(111,190,255,.72)",
            background:
              "linear-gradient(180deg, rgba(89,162,255,.11), rgba(89,162,255,.03))",
            boxShadow: "inset 0 0 26px rgba(89,162,255,.13)",
            transform: "skewY(-17deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 104,
            height: 155,
            left: "30%",
            top: "40%",
            border: "1px solid rgba(111,190,255,.72)",
            background:
              "linear-gradient(180deg, rgba(89,162,255,.11), rgba(89,162,255,.03))",
            boxShadow: "inset 0 0 26px rgba(89,162,255,.13)",
            transform: "skewY(-17deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 118,
            height: 122,
            left: "60%",
            top: "46%",
            border: "1px solid rgba(111,190,255,.72)",
            background:
              "linear-gradient(180deg, rgba(89,162,255,.11), rgba(89,162,255,.03))",
            boxShadow: "inset 0 0 26px rgba(89,162,255,.13)",
            transform: "skewY(-17deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 78,
            height: 92,
            left: "49%",
            top: "14%",
            border: "1px solid rgba(111,190,255,.72)",
            background:
              "linear-gradient(180deg, rgba(89,162,255,.11), rgba(89,162,255,.03))",
            boxShadow: "inset 0 0 26px rgba(89,162,255,.13)",
            transform: "skewY(-17deg)",
          }}
        />

        {/* Orbits */}
        <div
          className="absolute"
          style={{
            width: 520,
            height: 145,
            left: "15%",
            top: "41%",
            border: "1px solid rgba(89,162,255,.38)",
            borderRadius: "50%",
            transform: "rotate(-22deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 420,
            height: 110,
            left: "25%",
            top: "28%",
            border: "1px solid rgba(89,162,255,.38)",
            borderRadius: "50%",
            transform: "rotate(-22deg)",
          }}
        />

        {/* Nodes */}
        <span
          className="absolute"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--blue-2)",
            boxShadow: "0 0 18px var(--blue-2)",
            left: "29%",
            top: "33%",
          }}
        />
        <span
          className="absolute"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--blue-2)",
            boxShadow: "0 0 18px var(--blue-2)",
            left: "67%",
            top: "30%",
          }}
        />
        <span
          className="absolute"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--blue-2)",
            boxShadow: "0 0 18px var(--blue-2)",
            left: "72%",
            top: "58%",
          }}
        />
        <span
          className="absolute"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--blue-2)",
            boxShadow: "0 0 18px var(--blue-2)",
            left: "41%",
            top: "68%",
          }}
        />

        {/* Labels */}
        <div
          className="absolute text-[10px] tracking-[0.14em]"
          style={{ color: "#87c8ff", right: "6%", top: "22%" }}
        >
          <span
            className="mr-2.5 inline-block align-middle"
            style={{
              width: 52,
              height: 1,
              background: "rgba(135,200,255,.62)",
            }}
          />
          {t("automation")}
        </div>
        <div
          className="absolute text-[10px] tracking-[0.14em]"
          style={{ color: "#87c8ff", right: "12%", top: "63%" }}
        >
          <span
            className="mr-2.5 inline-block align-middle"
            style={{
              width: 52,
              height: 1,
              background: "rgba(135,200,255,.62)",
            }}
          />
          {t("crm")}
        </div>
        <div
          className="absolute text-[10px] tracking-[0.14em]"
          style={{ color: "#87c8ff", right: "3%", top: "42%" }}
        >
          <span
            className="mr-2.5 inline-block align-middle"
            style={{
              width: 52,
              height: 1,
              background: "rgba(135,200,255,.62)",
            }}
          />
          {t("analytics")}
        </div>
        <div
          className="absolute text-[10px] tracking-[0.14em]"
          style={{ color: "#87c8ff", right: 0, top: "74%" }}
        >
          <span
            className="mr-2.5 inline-block align-middle"
            style={{
              width: 52,
              height: 1,
              background: "rgba(135,200,255,.62)",
            }}
          />
          {t("integrations")}
        </div>
      </div>
    </div>
  );
}
