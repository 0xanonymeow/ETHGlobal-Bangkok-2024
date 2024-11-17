import Navbar from "@/components/common/navbar";
import { PropsWithChildren } from "react";

export default function CommonLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
    </div>
  );
}
