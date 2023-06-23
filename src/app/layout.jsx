import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import NavMenu from "@/components/NavMenu/NavMenu";
import AuthProvider from "./AuthProvider/AuthProvider";

const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "College",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="container">
            <NavMenu />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
