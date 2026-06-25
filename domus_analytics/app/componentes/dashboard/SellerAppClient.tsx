"use client";

import {
  Users,
  Home,
  FileText,
  Archive,
  Eye,
  Trophy,
  MapPin,
  DollarSign,
  Building2,
} from "lucide-react";
import type { SellerAppData } from "@/app/lib/types";
import { PROPERTY_TYPE_SHORT_LABEL } from "@/app/lib/property-types";
import { KpiCard } from "@/app/componentes/ui/KpiCard";
import { TopList } from "@/app/componentes/ui/TopList";
import { BarChart } from "@/app/componentes/ui/BarChart";
import { DonutChart } from "@/app/componentes/ui/DonutChart";
import { DataTable } from "@/app/componentes/ui/DataTable";
import { SectionCard } from "@/app/componentes/ui/SectionCard";

interface Props {
  data: SellerAppData;
}

export function SellerAppClient({ data }: Props) {
  const { generales, views, viewsMeta, neighborhoods, prices, sellersRanking } =
    data;

  return (
    <div className="space-y-8 animate-fade-up">
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard icon={<Users />} label="Total Sellers" value={generales.totalSellers} />
        <KpiCard icon={<Home />} label="Publicadas" value={generales.publishedProperties} />
        <KpiCard icon={<FileText />} label="Borradores" value={generales.draftProperties} />
        <KpiCard icon={<Archive />} label="Archivadas" value={generales.archivedProperties} />
        <KpiCard icon={<Eye />} label="Visitas Totales" value={generales.totalViews} />
      </section>

      <SectionCard
        title="Propiedades más vistas"
        icon={<Trophy />}
        subtitle={`Top 10 · ${viewsMeta.totalViews.toLocaleString("es-AR")} visitas`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopList
            items={views.map((p) => ({
              id: p.id,
              title: p.title ?? "Sin título",
              subtitle: `${p.sellerName} · ${formatPrice(p.price, p.currency)}`,
              value: p.views,
              imageUrl: p.multimedia?.[0]?.fileUrl,
              href: `https://domus-buyer-app.vercel.app/property/${p.id}`,
            }))}
          />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}>
              <MapPin className="w-3.5 h-3.5" />
              Por barrio
            </h3>
            <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
              Distribución geográfica
            </p>
            <div className="space-y-2">
              {neighborhoods.slice(0, 10).map((n) => (
                <div key={n.neighborhood}
                  className="flex items-center justify-between py-1.5 px-3 rounded-lg text-sm"
                  style={{ background: "var(--bg-secondary)" }}>
                  <span className="font-medium text-main truncate">{n.neighborhood}</span>
                  <span className="font-semibold tabular-nums flex-shrink-0 ml-3"
                    style={{ color: "var(--primary)" }}>
                    {n.count.toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard
          title="Precio promedio"
          icon={<DollarSign />}
          subtitle="Por tipo de operación y propiedad"
        >
          <BarChart
            data={prices
              .filter((p) => p.operationType === "SALE")
              .map((p) => ({
                ...p,
                propertyType: PROPERTY_TYPE_SHORT_LABEL[p.propertyType] ?? p.propertyType,
              }))}
            labelKey="propertyType"
            valueKey="avgPrice"
            valueFormat={(v) =>
              `$${v.toLocaleString("es-AR")}`
            }
          />
        </SectionCard>

        <SectionCard
          title="Distribución de estados"
          icon={<Home />}
          subtitle="Propiedades por estado"
        >
          <DonutChart
            items={[
              {
                label: "Publicadas",
                value: generales.publishedProperties,
                color: "var(--primary)",
              },
              {
                label: "Borrador",
                value: generales.draftProperties,
                color: "#d97706",
              },
              {
                label: "Archivadas",
                value: generales.archivedProperties,
                color: "#6b7280",
              },
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Ranking de sellers"
        icon={<Building2 />}
        subtitle="Por cantidad de propiedades"
      >
        <DataTable
          columns={[
            { key: "index", label: "#", width: 40 },
            { key: "fullName", label: "Inmobiliaria" },
            { key: "propertyCount", label: "Propiedades", align: "right" },
            { key: "publishedCount", label: "Publicadas", align: "right" },
            { key: "totalViews", label: "Visitas", align: "right" },
          ]}
          data={sellersRanking.map((s, i) => ({ ...s, index: i + 1 }))}
        />
      </SectionCard>
    </div>
  );
}

function formatPrice(price: number, currency: string) {
  return `${currency} $${price.toLocaleString("es-AR")}`;
}
