import { Inbox } from "lucide-react";

interface Consulta {
  id: string | number;
  mensaje: string;
  creado_en: Date;
  comprador: { nombre_completo: string | null };
}

interface RecentActivityProps {
  consultas: Consulta[];
}

export default function RecentActivity({ consultas }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm col-span-1 md:col-span-1 lg:col-span-3 flex flex-col p-6 min-w-0">
      <div className="pb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold leading-none tracking-tight text-domus-primary">Actividad Reciente</h3>
          <p className="text-sm text-black mt-1.5">Últimos mensajes enviados.</p>
        </div>
        <Inbox className="h-5 w-5 text-domus-primary" strokeWidth={3} />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 pr-2">
        <div className="space-y-5">
          {consultas.length === 0 ? (
            <p className="text-sm text-black text-center py-4">No hay mensajes recientes.</p>
          ) : (
            consultas.map((consulta) => (
              <div key={consulta.id} className="space-y-1.5 border-b border-domus-primary/10 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-domus-primary truncate mr-2">
                    {consulta.comprador.nombre_completo || "Anónimo"}
                  </p>
                  <span className="text-[10px] font-bold text-black shrink-0">
                    {new Date(consulta.creado_en).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-black line-clamp-2 leading-relaxed">
                  "{consulta.mensaje}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}