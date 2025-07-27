import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </div>
  );
}
