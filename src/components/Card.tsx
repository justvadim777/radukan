"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

interface CardProps {
  href?: string;
  tag?: string;
  title: string;
  description: string;
  cta?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({
  href,
  tag,
  title,
  description,
  cta,
  children,
  className = "",
}: CardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group rounded-none border border-gold-border bg-surface p-6 transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] ${className}`}
    >
      {tag && (
        <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wider text-gold">
          {tag}
        </span>
      )}
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
      {children}
      {cta && (
        <span className="mt-4 inline-block text-sm font-medium text-gold transition-colors group-hover:text-text">
          {cta} →
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href as "/"}>{content}</Link>;
  }
  return content;
}
