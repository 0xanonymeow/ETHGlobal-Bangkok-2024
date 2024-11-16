"use client";
import useWeb3Auth from "@/hooks/use-web3";
import { useState } from "react";
import { ADAPTER_EVENTS, WALLET_ADAPTERS } from "@web3auth/base";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";

export default function Home() {
  const { web3auth } = useWeb3Auth();
  const [connected, setConnected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const onConnect = async () => {
    await web3auth.init();
    const _connected = web3auth.status == ADAPTER_EVENTS.CONNECTED;
    console.log(_connected, connected);
    if (!_connected && !connected) {
      await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "discord",
      });
    }
    setConnected(connected || _connected);
  };
  console.log(web3auth.status);
  const onPay = () => {
    setScanning(true);
  };

  const onScan = (data: IDetectedBarcode[]) => {
    if (data[0].rawValue.startsWith("splitly")) {
      const id = data[0].rawValue.split("splitly://")[1];
      router.push(`/pay/${id}`);
    }
  };

  return (
    <>
      {!scanning ? (
        <div className="flex flex-col items-center justify-center h-dvh gap-48">
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="text-6xl font-rubik font-medium">Splitly</div>
            <div className="text-2xl font-rubik font-light">
              Crypto Pay, Splitly All the way!
            </div>
          </div>
          <button
            className="rounded-full text-3xl font-rubik text-white bg-purple-400 active:bg-purple-600 font-medium h-16 w-fit px-8"
            onClick={connected ? onPay : onConnect}
            style={{
              opacity: scanning ? 0 : 1,
            }}
          >
            {connected ? "Pay" : "Connect"}
          </button>
        </div>
      ) : (
        <Scanner onScan={onScan} />
      )}
    </>
  );
}
