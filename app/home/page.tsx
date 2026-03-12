import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "./sign-out-button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Merhaba!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {session.user.email} olarak giriş yaptınız.
        </p>
        <SignOutButton />
      </div>
    </div>
  );
}
