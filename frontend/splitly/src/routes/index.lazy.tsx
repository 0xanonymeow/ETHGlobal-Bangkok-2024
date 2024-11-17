import { createLazyFileRoute } from "@tanstack/react-router";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  const navigate = Route.useNavigate();

  const onScan = (data: IDetectedBarcode[]) => {
    if (!data.length) return;
    navigate({
      to: "/detail/$id",
      params: { id: data[0].rawValue.replace("splitly://", "") }
    });
  };

  return (
    <div className="container mx-auto my-12 flex justify-center items-center">
      <Scanner
        styles={{
          container: {
            width: 400,
            height: 400
          }
        }}
        onScan={onScan}
      />
    </div>
  );
}
