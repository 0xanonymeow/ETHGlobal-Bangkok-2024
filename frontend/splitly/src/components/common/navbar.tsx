import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ordersStore } from "@/store";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Badge } from "../ui/badge";
import { RainbowButton } from "../ui/rainbow-button";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { arbitrumSepolia } from "viem/chains";

export default function Component() {
  const orders = useRecoilValue(ordersStore);

  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleLogin = () => {
    connect({ connector: Web3AuthConnectorInstance([arbitrumSepolia]) });
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link
            href="/"
            className="mr-6 hidden lg:flex"
          >
            <img
              src="https://ethglobal.b-cdn.net/events/cafe-tokyo/square-logo/default.png"
              className="h-6 w-6"
            />
            <span className="sr-only">Splitly</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Button variant="default">Login</Button>
          </div>
        </SheetContent>
      </Sheet>
      <Link
        href="/"
        className="mr-6 hidden lg:flex"
      >
        <img
          src="https://ethglobal.b-cdn.net/events/cafe-tokyo/square-logo/default.png"
          className="h-12 w-12"
        />
        <span className="sr-only">Splitly</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {isConnected ? (
          <Button
            variant="default"
            onClick={() => disconnect()}
          >
            Logout
          </Button>
        ) : (
          <RainbowButton
            className="w-44"
            onClick={handleLogin}
          >
            🔐 Login
          </RainbowButton>
        )}
      </nav>
    </header>
  );
}

function MenuIcon(props: PropsWithChildren<{ className: string }>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
      />
      <line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
      />
    </svg>
  );
}
