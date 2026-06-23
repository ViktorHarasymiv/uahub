import I18nProvider from "./i18n/I18nProvider";

import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import { AuthProvider } from "./components/Auth/AuthProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./ui/Modal/Modal";

export const metadata: Metadata = {
  title: "Warszawiak.pl | Darmowe ogłoszenie w Warszawie",
  description: "Ukrainian community platform",
  keywords: ["Warszawiak.pl", "ukrainian community", "platform"],
  authors: [{ name: "Warszawiak.pl" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <I18nProvider>
          <AuthProvider />
          <Header />
          <main className="main">{children}</main>
          <Footer />
          <Modal />
        </I18nProvider>
      </body>
    </html>
  );
}
