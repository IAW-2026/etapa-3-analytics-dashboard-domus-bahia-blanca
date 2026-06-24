import Link from "next/link";
import { Flame, Heart } from "lucide-react";

interface HotPropertiesProps {
  propiedades: { propiedad_id: string; _count: { id: number } }[];
}

export default function HotProperties({ propiedades }: HotPropertiesProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm col-span-1 md:col-span-1 lg:col-span-4 flex flex-col p-6 min-w-0">
      <style dangerouslySetInnerHTML={{__html: `
        .hover-nuclear:hover {
          background-color: var(--color-domus-primary) !important;
          color: white !important;
          border-color: var(--color-domus-primary) !important;
        }
      `}} />

      <div className="pb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold leading-none tracking-tight text-domus-primary">Propiedades Destacadas</h3>
          <p className="text-sm text-black mt-1.5">Inmuebles con mayor acumulación de Favoritos.</p>
        </div>
        <Flame className="h-5 w-5 text-domus-primary" strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="space-y-4">
          {propiedades.length === 0 ? (
            <p className="text-sm text-black text-center py-4">No hay favoritos guardados aún.</p>
          ) : (
            propiedades.map((prop, idx) => (
              <div key={prop.propiedad_id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-3 last:pb-0 gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-sm font-black text-domus-primary w-4 shrink-0">{idx + 1}.</span>
                  <Link 
                    href={`/property/${prop.propiedad_id}`}
                    title={prop.propiedad_id}
                    className="flex-1 block truncate text-sm font-mono px-4 py-1.5 rounded-full border border-domus-primary/40 text-domus-primary bg-transparent transition-all duration-300 hover-nuclear cursor-pointer"
                  >
                    {prop.propiedad_id}
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-domus-primary px-3 py-1.5 min-w-[3.5rem] rounded-full border border-domus-primary shrink-0 shadow-sm">
                  <Heart className="h-4 w-4 text-white fill-white" strokeWidth={3} />
                  <span className="text-sm font-black text-white">{prop._count.id}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}