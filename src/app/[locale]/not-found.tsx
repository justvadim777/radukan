import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-heading font-[900] text-[120px] leading-none text-gold/20 md:text-[200px]">
        404
      </span>
      <h1 className="mt-4 font-heading text-2xl font-bold uppercase tracking-[2px] md:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-4 text-muted max-w-md">
        Такой страницы не существует. Возможно, она была перемещена или удалена.
      </p>
      <Link
        href="/"
        className="mt-8 bg-gold text-bg px-8 py-[14px] font-heading font-bold text-[13px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
      >
        На главную
      </Link>
    </section>
  );
}
