import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdul Rahman Qureshi | Cloud & Deployment Engineer",
  description: "Portfolio of Abdul Rahman Qureshi, a Cloud and Deployment Engineer focused on DevOps, SRE, automation, and resilient production systems.",
  keywords: ["Cloud Engineer", "DevOps", "SRE", "AWS", "Kubernetes", "Terraform"],
  openGraph: {
    title: "Abdul Rahman Qureshi | Cloud & Deployment Engineer",
    description: "From source code to observable production systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
