import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DarkVeil from "@/components/ui/DarkVeil";
import GlassNavbar from "@/components/layout/GlassNavbar";
import ClockBadge from "@/components/ui/ClockBadge";
import LocationBadge from "@/components/ui/LocationBadge";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import PageLoader from "@/components/ui/PageLoader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirajddn",
  description: "Sirajddn Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="antialiased">
        <LoadingProvider>
          <SmoothScroll />
          <PageLoader />

          <div className="fixed inset-0 top-0 left-0 z-0 min-h-screen w-full">
            <DarkVeil
              hueShift={15}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={0.9}
              scanlineFrequency={0}
              warpAmount={0}
            />
          </div>

          {/* <Navbar /> */}
          <LocationBadge />
          <GlassNavbar />
          <ClockBadge />

          

          <main className="absolute top-55 w-full h-1000">{children}</main>
        </LoadingProvider>
      </body>

    </html>
  );
}
