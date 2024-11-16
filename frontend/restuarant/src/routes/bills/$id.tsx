import { createFileRoute } from "@tanstack/react-router";
import { QRCode } from "react-qrcode-logo";

export const Route = createFileRoute("/bills/$id")({
  component: BillDetailRoute
});

function BillDetailRoute() {
  const { id } = Route.useParams();

  return (
    <div className="container mx-auto flex items-center justify-center">
      <QRCode value={`splitly://${id}`} />
    </div>
  );
}
