export default function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold headline-condensed">
        Shared Story: {params.then((p) => p.slug)}
      </h1>
    </div>
  );
}
