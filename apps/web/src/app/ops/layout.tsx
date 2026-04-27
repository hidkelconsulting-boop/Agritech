import type { ReactNode } from "react";
import OpsLayoutShell from "@/components/ops-layout";

export default function OpsLayout({ children }: { children: ReactNode }) {
  return <OpsLayoutShell>{children}</OpsLayoutShell>;
}
