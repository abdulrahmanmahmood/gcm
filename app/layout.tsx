import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./_react_query/Provider";
import InternetConnectionService from "./_components/UI/InternetConnectionService";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global clear mission",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ">
      <body className={inter.className}>
        <InternetConnectionService>
          <Provider>{children}</Provider>
        </InternetConnectionService>
      </body>
    </html>
  );
}
