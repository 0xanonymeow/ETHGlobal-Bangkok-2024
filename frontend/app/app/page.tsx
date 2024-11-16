"use client";
import Image from "next/image";
import { useAddToHomeScreen } from "@/hooks/use-add-to-home-screen";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  // useEffect(() => {
  //   if (prompt) {
  //     setVisibleState(true);
  //   }
  // }, [prompt]);

  // if (!isVisible) {
  //   return <div>Hey</div>;
  // }

  // return (
  //   <div onClick={hide}>
  //     <button onClick={hide}>Close</button>
  //     Hello! Wanna add to homescreen?
  //     <button onClick={promptToInstall}>Add to homescreen</button>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-48">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="text-6xl font-rubik font-medium">Splitly</div>
        <div className="text-2xl font-rubik font-light">
          Crypto Pay, Splitly All the way!
        </div>
      </div>
      <button className="rounded-full text-3xl font-rubik text-white bg-purple-400 active:bg-purple-600 font-medium h-16 w-24">
        <Link href="/scan">Pay</Link>
      </button>
    </div>
  );
}
