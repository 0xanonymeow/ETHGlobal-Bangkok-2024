import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { ordersStore } from "@/store";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { BsCart2 } from "react-icons/bs";
import { Badge } from "../ui/badge";

export default function Component() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const orders = useRecoilValue(ordersStore);

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
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
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
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {isConnected && (
          <Link
            href="/bills"
            className={buttonVariants({
              variant: "outline"
            })}
          >
            🧾 Recent Orders
          </Link>
        )}

        {isConnected && (
          <Link
            href="/orders"
            className={buttonVariants({
              variant: "outline",
              className: "relative"
            })}
          >
            <span>🛒 Carts</span>
            <Badge className="absolute -top-2 -right-4">
              {orders.length > 99 ? "+99" : orders.length}
            </Badge>
          </Link>
        )}

        {isConnected ? (
          <Button
            variant="default"
            onClick={() => disconnect()}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="w-32"
            variant="default"
            onClick={() =>
              connect(
                {
                  connector: Web3AuthConnectorInstance([arbitrumSepolia])
                },
                {
                  onSuccess: () => {
                    console.log("success");
                  }
                }
              )
            }
          >
            🔐 Login
          </Button>
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

function MountainIcon(props: PropsWithChildren<{ className: string }>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}