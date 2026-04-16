import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-none min-h-[44px] min-w-[44px]";

  const variants = {
    primary:
      "bg-gold text-bg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-gold/90",
    secondary:
      "border border-gold-border text-gold hover:bg-gold-dim hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href as "/"} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
