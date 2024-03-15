import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Liepājas Līgas",
  description: "Quiz spēle par Liepāju",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="lv">
      <body className={`font-sans ${inter.variable} bg-bgBase text-primary`}>
        <TRPCReactProvider>
          <div className="flex flex-col h-[100dvh] relative">
            <Header />
            <div className="container xl:max-w-6xl m-auto mt-32 text-xl px-4">
              {children}
            </div>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}