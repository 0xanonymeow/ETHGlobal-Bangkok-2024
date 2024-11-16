import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bills/")({
  component: RouteComponent
});

function RouteComponent() {
  return "Hello /bills/!";
}
