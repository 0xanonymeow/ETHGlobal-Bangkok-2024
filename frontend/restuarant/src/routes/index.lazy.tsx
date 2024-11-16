import MenuCard from "@/components/common/menu-card";
import { MENU } from "@/data";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  return (
    <div className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {MENU.map((val, idx) => (
          <MenuCard
            key={idx}
            data={val}
          />
        ))}
      </div>
    </div>
  );
}
