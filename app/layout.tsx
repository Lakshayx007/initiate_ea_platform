import type { Metadata } from "next";
import { Inter, Fira_Code } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap' });

export const metadata: Metadata = {
  title: "EA Intelligence Dashboard | EAIMM",
  description:
    "Enterprise Architecture Integration Maturity Model Intelligence Dashboard — EA as a Data Product for the Accenture INITIATE 2026 Competition",
  keywords: [
    "enterprise architecture",
    "EAIMM",
    "data product",
    "integration maturity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.replace('dark', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
