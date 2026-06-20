import EditSpoolForm from "@/components/inventory/edit-spool-form";

export default async function EditSpoolPage({ params }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/spools/${params.id}`,
    {
      cache: "no-store",
    },
  );

  const spool = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Spool</h1>
      <EditSpoolForm spool={spool} />
    </div>
  );
}
