import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex" }}>
          
          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, padding: "20px" }}>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}