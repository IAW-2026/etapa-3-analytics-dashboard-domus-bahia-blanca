interface TopClientsProps {
  topClientes: { nombre: string; telefono: string; cantidad: number }[];
}

export default function TopClients({ topClientes }: TopClientsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm col-span-1 md:col-span-1 lg:col-span-3 flex flex-col p-6 min-w-0">
      <div className="pb-4">
        <h3 className="font-bold leading-none tracking-tight text-domus-primary">Top Clientes</h3>
        <p className="text-sm text-black mt-1.5">Mayor cantidad de mensajes este mes.</p>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 pr-2">
        <div className="space-y-6">
          {topClientes.length === 0 ? (
            <p className="text-sm text-black text-center py-8">No hay consultas este mes.</p>
          ) : (
            topClientes.map((cliente, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-domus-primary/10 border border-domus-primary/30">
                  <span className="flex h-full w-full items-center justify-center text-sm font-black text-domus-primary">
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </span>
                </span>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-bold text-domus-primary truncate">{cliente.nombre}</p>
                  <p className="text-xs text-black truncate mt-0.5">{cliente.telefono}</p>
                </div>
                <div className="shrink-0 text-right text-sm font-medium">
                  <span className="font-black text-domus-primary">{cliente.cantidad}</span> 
                  <span className="text-xs text-black ml-1">msjs</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}