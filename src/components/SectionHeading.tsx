interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-[34px] font-bold leading-[1.18] tracking-[-0.04em] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-[640px] text-lg text-[#a9bbce]">{subtitle}</p>
      )}
    </div>
  );
}
