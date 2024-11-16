export default async function Pay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;

  return <div>Pay {id}</div>;
}
