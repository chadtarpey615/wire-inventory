// import SpoolQR from "@/components/inventory/spool-qr";

export default async function SpoolDetailPage({ params }: any) {
  const baseUrl = process.env.SITE_URL;

  const res = await fetch(`${baseUrl}/api/spools/${params.id}`, {
    cache: "no-store",
  });

  const spool = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{spool.label}</h1>

      <div className="text-slate-400 space-y-1">
        <p>Type: {spool.wireType?.name}</p>
        <p>Total: {spool.lengthFeet} ft</p>
        <p>Remaining: {spool.remainingFeet} ft</p>
        <p>Location: {spool.location || "N/A"}</p>
      </div>

      {/* <div>
        <h2 className="text-xl font-semibold mb-2">QR Code</h2>
        <SpoolQR id={spool.id} />
      </div> */}

      <div className="flex gap-3 mt-4">
        <a
          href={`/spools/${spool.id}/edit`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Edit
        </a>

        <form action={`/api/spools/${spool.id}`} method="POST">
          <input type="hidden" name="_method" value="DELETE" />
          <button
            onClick={async () => {
              await fetch(`/api/spools/${spool.id}`, { method: "DELETE" });
              window.location.href = "/spools";
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Delete
          </button>
        </form>
      </div>

      <a
        href={`/usage?spool=${spool.id}`}
        className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        Log Usage
      </a>
    </div>
  );
}
