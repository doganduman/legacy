"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/home",
    });

    if (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } else {
      setSent(true);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Giriş Yap
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Email adresinize bir giriş bağlantısı göndereceğiz.
          </p>
        </div>

        {sent ? (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              Email gönderildi!
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium">{email}</span> adresine giriş
              bağlantısı gönderildi. Gelen kutunuzu kontrol edin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-zinc-600"
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? "Gönderiliyor..." : "Magic Link Gönder"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
