export default function MobileHeader({ title }: { title: string }) {
  return (
    <header className="md:hidden sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
    </header>
  );
}
