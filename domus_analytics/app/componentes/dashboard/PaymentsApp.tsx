import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ view?: string; year?: string }>;
}

// Interfaces para tipar la respuesta de la API de Payments
interface TransaccionExterna {
  id: string;
  fecha: string;
  plan: string;
  monto: number;
  vendedor_id: string;
}

interface FinancialMetricsResponse {
  meta: {
    vista_actual: string;
    año_seleccionado: number;
    años_disponibles: number[];
  };
  recaudacion_total: number;
  chart_data: { label: string; monto: number }[];
  transacciones: TransaccionExterna[];
  error?: string;
}

export default async function PaymentsApp({ searchParams }: Props) {
  const params = await searchParams;
  const view = params.view || 'mensual';
  const yearQuery = params.year ? `&year=${params.year}` : '';

  const paymentsUrl = process.env.NEXT_PUBLIC_PAYMENTS_URL || 'http://localhost:3000';
  
  const response = await fetch(`${paymentsUrl}/api/payments/financial-metrics?view=${view}${yearQuery}`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.PAYMENT_API_KEY as string,
      'Content-Type': 'application/json',
    },
    cache: 'no-store' 
  });

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-[var(--color-domus-bg)] p-8 flex items-center justify-center">
        <div className="card p-10 text-center">
          <h3 className="text-2xl font-bold text-[#b91c1c] mb-3">Error de Conexión</h3>
          <p className="text-[#dc2626]">No se pudo conectar con el servidor de pagos. Verifique la API Key o la URL.</p>
        </div>
      </div>
    );
  }

  const data: FinancialMetricsResponse = await response.json();
  const { meta, recaudacion_total, chart_data, transacciones } = data;
  const { año_seleccionado, años_disponibles } = meta;

  const maxMonto = Math.max(...chart_data.map(d => d.monto), 1) * 1.15;

  return (
    <div className="min-h-screen bg-[var(--color-domus-bg)] p-4 md:p-8 text-[var(--color-domus-text)] font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-[var(--color-domus-secondary)] pb-8 gap-6 animate-fade-in">
          
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-domus-primary)] tracking-tight">
              Control Financiero
            </h1>
            <p className="text-[var(--color-domus-textSoft)] text-sm italic">
              {view === 'mensual' ? `Detalle Mensual ${año_seleccionado}` : 'Balance Anual Comparativo'}
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <div className="w-full max-w-[320px] stat-card text-center md:text-right hover-lift">
              <span className="text-[10px] font-bold text-[var(--color-domus-primaryMid)] uppercase tracking-widest block mb-1">
                Recaudación Total
              </span>
              <p className="text-3xl md:text-4xl font-black text-[var(--color-domus-terracota)]">
                ${recaudacion_total.toLocaleString('es-AR', { minimumFractionDigits: 1 })}
              </p>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-4 animate-fade-up">
          <div className="inline-flex bg-[var(--color-domus-secondary)] p-1 rounded-xl border border-[var(--color-domus-secondary)]">
            <Link href="?view=mensual" className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'mensual' ? 'bg-[var(--color-domus-primary)] text-white shadow-md' : 'text-[var(--color-domus-textSoft)] hover:text-[var(--color-domus-primary)]'}`}>Mensual</Link>
            <Link href="?view=anual" className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'anual' ? 'bg-[var(--color-domus-primary)] text-white shadow-md' : 'text-[var(--color-domus-textSoft)] hover:text-[var(--color-domus-primary)]'}`}>Anual</Link>
          </div>
          
          {view === 'mensual' && (
            <div className="flex flex-wrap gap-1">
              {años_disponibles.map(a => (
                <Link key={a} href={`?view=mensual&year=${a}`} className={`px-3 py-1 rounded-md text-[10px] font-bold border transition-all ${año_seleccionado === a ? 'bg-[var(--color-domus-primarySoft)] text-white border-[var(--color-domus-primarySoft)]' : 'bg-white text-[var(--color-domus-textSoft)] border-[var(--color-domus-secondary)] hover:border-[var(--color-domus-primarySoft)]'}`}>
                  {a}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* GRAFICO DE BARRAS */}
        <section className="card p-4 md:p-10 overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
          
          <div className="overflow-x-auto pb-6 scrollbar-thin">
            
            <div className="flex items-end justify-start md:justify-center min-w-[650px] h-72 md:h-80 gap-3 md:gap-6 px-2">
              
              {chart_data.map(({ label, monto }) => {
                const porcentajeAlt = (monto / maxMonto) * 100;
                
                return (
                  <div key={label} className="flex-1 max-w-[60px] flex flex-col h-full shrink-0 animate-scale-in">
                    
                    <div className="flex-1 w-full flex flex-col justify-end items-center group relative">
                      
                      <div className="mb-2 transition-all duration-700">
                        <span className="text-[9px] font-bold text-[var(--color-domus-primaryMid)] whitespace-nowrap bg-[var(--color-domus-bg)] px-1.5 py-0.5 rounded shadow-sm border border-[var(--color-domus-secondary)]">
                          ${monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>

                      <div 
                        className="w-full bg-[var(--color-domus-primarySoft)] rounded-t-md group-hover:bg-[var(--color-domus-terracota)] transition-all duration-700 ease-out shadow-sm relative cursor-pointer"
                        style={{ height: `${porcentajeAlt}%` }}
                      >
                      </div>
                    </div>

                    <div className="h-8 flex items-center justify-center pt-2 border-t border-dashed border-[var(--color-domus-secondary)] mt-1 w-full">
                      <span className="text-[10px] md:text-xs font-black text-[var(--color-domus-textSoft)] uppercase tracking-tighter">
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TABLA HISTÓRICA */}
        <section className="card overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>

          <div className="bg-[var(--color-domus-primarySoft)] px-6 py-4 font-bold text-white text-[10px] uppercase tracking-widest">
            Registro Histórico de Pagos
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-[var(--color-domus-card)] text-[var(--color-domus-primaryMid)] uppercase text-[10px] font-black border-b border-[var(--color-domus-secondary)]">
                <tr>
                  <th className="px-6 py-4 text-left">Fecha</th>
                  <th className="px-6 py-4 text-left">Plan</th>
                  <th className="px-6 py-4 text-left">Monto</th>
                  <th className="px-6 py-4 text-right">ID Vendedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-domus-secondary)]">
                {transacciones.map(t => (
                  <tr key={t.id} className="hover:bg-[var(--color-domus-bg)] transition-colors">
                    <td className="px-6 py-4 text-[var(--color-domus-textSoft)] whitespace-nowrap">
                      {new Date(t.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-[var(--color-domus-primary)]">{t.plan}</td>
                    <td className="px-6 py-4 font-black text-[var(--color-domus-terracota)]">${t.monto.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-[10px] text-[var(--color-domus-textSoft)] max-w-[150px] truncate" title={t.vendedor_id}>
                      {t.vendedor_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}