import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { PrismaClient } from "@/generated/prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL!,
                    to: email,
                    subject: "Giriş Bağlantınız",
                    html: `
                        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
                            <h2 style="margin-bottom: 8px;">Giriş Bağlantısı</h2>
                            <p style="color: #555; margin-bottom: 24px;">Aşağıdaki bağlantıya tıklayarak giriş yapabilirsiniz. Bu bağlantı 10 dakika geçerlidir.</p>
                            <a href="${url}" style="display: inline-block; background: #18181b; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">
                                Giriş Yap
                            </a>
                            <p style="color: #999; font-size: 13px; margin-top: 24px;">Bu emaili siz talep etmediyseniz görmezden gelebilirsiniz.</p>
                        </div>
                    `,
                });
            },
        }),
    ],
});
