import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Hoş geldiniz
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Devam etmek için giriş yapın.
        </p>
        <Link
          href="/auth"
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
