import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "AI Image Upscaler - nzrNest",
};

export default function ImageUpscalerLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
} 