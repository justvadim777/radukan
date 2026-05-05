"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">
        Что-то пошло не так
      </h2>
      <p className="text-[var(--muted)] mb-8 max-w-md">
        Произошла ошибка при загрузке страницы. Попробуйте обновить.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Перезагрузить страницу
        </button>
        <button onClick={() => reset()} className="btn btn-outline">
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
