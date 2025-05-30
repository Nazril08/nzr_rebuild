import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import "@/css/satoshi.css";
import "@/css/style.css";

export const metadata: Metadata = {
  title: "AI Image Upscaler | nzrNest",
  description: "Enhance and upscale your images with AI technology up to 8x resolution while maintaining quality."
};

// This is a completely standalone layout that replaces the root layout for this route
export default function ImageUpscalerLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
        <NextTopLoader color="#6366f1" showSpinner={false} />
        <main className="mx-auto w-full max-w-screen-xl p-4 md:p-6 2xl:p-8">
          {children}
        </main>
      </body>
    </html>
  );
} 