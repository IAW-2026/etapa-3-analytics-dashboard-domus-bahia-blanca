import { Users, MessageSquare, Heart, UserCheck, AlertCircle } from "lucide-react";
import StatCard from "@/app/componentes/buyer-app/StatCard";
import AnnualChart from "@/app/componentes/buyer-app/AnnualChart";
import TopClients from "@/app/componentes/buyer-app/TopClientes";
import HotProperties from "@/app/componentes/buyer-app/HotProperties";
import RecentActivity from "@/app/componentes/buyer-app/RecentActivity";

import { fetchBuyerAnalyticsApi } from "@/app/servicios/buyer.servicio";

export const revalidate = 0;

export default async function BuyerAnalyticsDashboard() {
  let data;
  
  try {
    data = await fetchBuyerAnalyticsApi();
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-200 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error de conexión</h2>
          <p className="text-gray-500">No se pudieron cargar las analíticas desde la Buyer App.</p>
        </div>
      </div>
    );
  }

  const { kpis, topClientes, grafico, propiedadesCalientes, ultimasConsultas } = data;

  return (
    <div className="flex-col md:flex bg-gray-50/50 min-h-screen pb-12">

      <main className="flex-1 space-y-6 px-4 pb-4 md:px-8 md:pb-8 pt-0 md:pt-0 max-w-7xl mx-auto w-full">
        
        <div className="flex items-center justify-between space-y-2 mb-4">
          <h1 className="text-3xl font-black tracking-tight text-domus-primary">
            Resumen de Actividad
          </h1>
        </div>

        <section aria-label="Indicadores de rendimiento">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Usuarios" value={kpis.totalCompradores} Icon={Users} />
            <StatCard title="Consultas Totales" value={kpis.totalConsultas} Icon={MessageSquare} />
            <StatCard title="Tasa de Contacto" value={`${kpis.tasaContacto}%`} Icon={UserCheck} />
            <StatCard title="Favoritos Guardados" value={kpis.totalFavoritos} Icon={Heart} />
          </div>
        </section>

        <section aria-label="Análisis mensual y clientes destacados" className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <AnnualChart 
            dataGrafico={grafico.dataGrafico} 
            maxConsultasMes={grafico.maxConsultasMes} 
            chartScale={grafico.chartScale} 
            year={grafico.year} 
            currentMonth={grafico.currentMonth} 
          />
          <TopClients topClientes={topClientes} />
        </section>

        <section aria-label="Propiedades populares y actividad reciente" className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <HotProperties propiedades={propiedadesCalientes} />
          <RecentActivity consultas={ultimasConsultas} />
        </section>
        
      </main>
    </div>
  );
}