import { cookies } from "next/headers";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { FirebaseAuthListener } from "@/components/firebase-auth-listener";
import { Alerter } from "@/components/ui/alerter";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/session/cookie";

import "./globals.css";

import { AppSidebar } from "./_components/app-sidebar";
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
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultSidebarOpen = cookieStore.get("sidebar:state")?.value === "true";

  const sessionIdToken = await getSession(cookieStore);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionStoreProvider initialState={{ idToken: sessionIdToken }}>
          <FirebaseAuthListener />

          {sessionIdToken === null ? (
            auth
          ) : (
            <SidebarProvider defaultOpen={defaultSidebarOpen}>
              <AppSidebar />

              <main className="space-y-4 w-full my-4 px-4">{children}</main>
            </SidebarProvider>
          )}
        </SessionStoreProvider>

        <Alerter />
      </body>
    </html>
  );
}
