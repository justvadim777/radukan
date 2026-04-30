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
  const variantClass = variant === "primary" ? "btn-primary" : "btn-outline";
  const classes = `btn ${variantClass} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
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
