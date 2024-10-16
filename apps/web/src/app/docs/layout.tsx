import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./docsSidebar";
import { sections } from "./sections";
// import CustomHeader from "@/components/header";
// import CustomFooter from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Documentation UI",
  description: "A simple documentation UI with sidebar and markdown rendering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <CustomHeader /> */}
        <div className="flex h-full">
          <Sidebar sections={sections} />
          {children}
        </div>
        {/* <CustomFooter /> */}
      </body>
    </html>
  );
}
