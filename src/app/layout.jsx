import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import NavMenu from "@/components/NavMenu/NavMenu";

const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
        <div className="container">
          <NavMenu/>
          {children}
        </div>
      </body>
    </html>
  );
}
