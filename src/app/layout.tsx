import { Inter } from "next/font/google";
import * as React from "react";
import './styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from "./componenets/toast.provider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Connexin Demo App",
  description: "For use in technical interviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
