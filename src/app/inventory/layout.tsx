import { Navbar } from "@/components/navbar";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex-col">
      <Navbar />
      {children}
    </div>
  );
}
