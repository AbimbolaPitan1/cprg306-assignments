import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Shopping list app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}