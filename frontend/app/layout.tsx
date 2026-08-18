import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./components/Auth/AuthProvider";
import { Providers } from "./providers";
import I18nProvider from "./i18n/I18nProvider";

import "./styles/globals.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./ui/Modal/Modal";
import MobileNavigation from "./ui/Modal/MobileNavModal/MobileNavigation";
import { PromoBanner } from "./components/Ads/PromoBanner";
import { ConfirmDialog } from "./components/ConfirmDialog/ConfirmDialog";

export const metadata: Metadata = {
  title: "uahub.pl | Ukrainian community",
  description: "Ukrainian community platform",
  keywords: ["uahub.pl", "ukrainian community", "platform"],
  authors: [{ name: "UaHub.pl" }],
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
          <Providers>
            <AuthProvider />
            <MobileNavigation />

            <Header />
            <main className="main">
              {children}
              <PromoBanner />
            </main>
            <Footer />
            <Modal />

            {/* CONFIG SETUP */}

            <ConfirmDialog />

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
