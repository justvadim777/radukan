"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          Строю системы{" "}
          <span className="text-gold">для бизнеса</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl"
        >
          Вадим Радукан — разработчик и предприниматель. Создаю продукты для
          HoReCa, инвестиций и автоматизации. От идеи до рабочего продукта за
          2–4 недели.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button href="/projects">Мои проекты</Button>
          <Button href="/contact" variant="secondary">
            Обсудить задачу
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
