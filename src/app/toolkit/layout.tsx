import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Toolkit - Image Superscale",
};

export default function ToolkitLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
} 