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
      className={`card group p-6 transition-all hover:border-[var(--line-strong)] ${className}`}
    >
      {tag && (
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#65a9ff]">
          {tag}
        </span>
      )}
      <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 text-sm text-[#a9bbce] leading-relaxed">{description}</p>
      {children}
      {cta && (
        <span className="mt-4 inline-block text-sm font-bold text-[#69aaff] transition-colors group-hover:text-white">
          {cta} →
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href as "/"} className="no-underline">
        {content}
      </Link>
    );
  }
  return content;
}
