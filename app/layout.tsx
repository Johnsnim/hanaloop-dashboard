import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "하나루프 이산화탄소톤 대시보드",
  description: "hanaloop tCO2eq dashboard",
};
const themeInit = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':p;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
