import { CommonLayout } from "@/layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Root
});

function Root() {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}
