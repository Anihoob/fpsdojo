import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M8YRNGE6LL"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M8YRNGE6LL');
            `,
          }}
        ></script>
      </head>
      <body>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
