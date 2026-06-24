interface AnnualChartProps {
  dataGrafico: { mes: string; cantidad: number }[];
  maxConsultasMes: number;
  chartScale: number;
  year: number;
  currentMonth: number;
}

export default function AnnualChart({ dataGrafico, maxConsultasMes, chartScale, year, currentMonth }: AnnualChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm col-span-1 md:col-span-1 lg:col-span-4 flex flex-col p-6 min-w-0">
      <div className="pb-4">
        <h3 className="font-bold leading-none tracking-tight text-domus-primary">Evolución de Consultas</h3>
        <p className="text-sm text-black mt-1.5">Actividad mensual registrada durante {year}</p>
      </div>
      <div className="flex-1 flex flex-col justify-end min-w-0">
        {/* 1. Aumentamos la altura del contenedor de 180px a 200px */}
        <div className="flex items-end justify-between w-full h-[200px] border-b border-gray-200 pb-2 gap-2 overflow-x-auto min-w-0">
          {dataGrafico.map((item, idx) => {
            const isCurrentMonth = idx === currentMonth;
            
            // 2. Bajamos el multiplicador de 140 a 120 para que la barra más alta tenga límite
            const barHeight = maxConsultasMes > 0 ? (item.cantidad / chartScale) * 120 : 0;
            const finalHeight = item.cantidad > 0 ? Math.max(barHeight, 4) : 0;

            return (
              <div key={item.mes} className="flex flex-col items-center flex-1 group min-w-[2rem] flex-shrink-0">
                <div className="h-6 flex items-end mb-1">
                  {item.cantidad > 0 && (
                    <span className="text-[10px] sm:text-xs font-black text-domus-primary">
                      {item.cantidad}
                    </span>
                  )}
                </div>
                <div 
                  className={`w-full max-w-[2.5rem] rounded-t-sm transition-all duration-300 ${isCurrentMonth ? 'bg-domus-primary shadow-sm' : 'bg-domus-primary/20 group-hover:bg-domus-primary/45'}`}
                  style={{ height: `${finalHeight}px` }}
                ></div>
                <span className={`text-[10px] sm:text-xs mt-2 font-bold ${isCurrentMonth ? 'text-domus-primary' : 'text-black'}`}>
                  {item.mes}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}