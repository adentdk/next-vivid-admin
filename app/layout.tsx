import { cookies } from "next/headers";
import { Fragment } from "react";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { FirebaseAuthListener } from "@/components/firebase-auth-listener";
import { Alerter } from "@/components/ui/alerter";
import { getSession } from "@/lib/session/cookie";

import "./globals.css";

import { SessionStoreProvider } from "./_stores/session-store-provider";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "NextVivid",
    template: "%s | NextVivid - Admin",
  },
  description: "NextVivid",
};

export default async function RootLayout({
  children,
  auth,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionIdToken = await getSession(cookieStore);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider delayDuration={0}>
          <SessionStoreProvider initialState={{ idToken: sessionIdToken }}>
            <FirebaseAuthListener />

            {sessionIdToken === null ? (
              auth
            ) : (
              <Fragment>
                {children}
                {modals}
              </Fragment>
            )}
          </SessionStoreProvider>

          <Alerter />
        </TooltipProvider>
      </body>
    </html>
  );
}
