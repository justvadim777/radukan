import { CSSProperties, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** kept for backwards compatibility — no longer applied via JS */
  delay?: number;
  style?: CSSProperties;
}

/**
 * Below-the-fold section wrapper.
 * Uses pure CSS keyframes for entry animation — content is fully visible
 * even if JavaScript fails or is disabled (no inline opacity:0 in SSR).
 */
export function AnimatedSection({
  children,
  className = "",
  style,
}: AnimatedSectionProps) {
  return (
    <section className={`fade-up-section ${className}`} style={style}>
      {children}
    </section>
  );
}
