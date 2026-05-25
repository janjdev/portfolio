import { GeistSans } from "geist/font/sans";
import { Manrope } from 'next/font/google';
import { Inter } from 'next/font/google';
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import MobileNav from "./components/nav/MobileNav";
import Footer from "./components/footer/Footer";
import ThemeBootstrap from "./components/theme-bootstrap/ThemeBootstrap";

export const metadata = {
  title: "January Johnson | Software Engineer",
  description:
    "I build full-stack web applications with thoughtful design, strong backend systems, and practical deployment experience.",
};

const manrope = Manrope(
  { subsets: ['latin'],
    display: 'swap',
    variable: '--font-manrope',
    weight: ['400', '500', '600', '700', '800']
  });

  const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col md:flex-row justify-between">
        <ThemeBootstrap />
        <MobileNav />
        <Sidebar />
        <div className="flex-1 flex flex-col justify-between">
          {children}
         
            <Footer variant="page" className="flex-end" />
         
        </div>
      </body>
    </html>
  );
}
