"use client";

import { Home, MapPin } from "lucide-react";
import type { TopVisitedPropertyDatum } from "@/app/lib/schedulingAnalytics";
import { cardClassName, chartColors, chartThemeStyle } from "./chartStyles";

type TopVisitedPropertiesCardProps = {
  data: TopVisitedPropertyDatum[];
};

export default function TopVisitedPropertiesCard({
  data,
}: TopVisitedPropertiesCardProps) {
  const maxVisits = Math.max(...data.map((property) => property.visits), 1);

  return (
    <section className={cardClassName} style={chartThemeStyle}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-domus-text">
          Propiedades con mas visitas
        </h2>
        <p className="text-sm text-domus-textSoft">
          Ranking de inmuebles por cantidad de turnos solicitados.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-domus-secondary text-sm text-domus-textSoft">
          No hay turnos suficientes para mostrar propiedades.
        </div>
      ) : (
        <ol className="space-y-3">
          {data.map((property, index) => {
            const barWidth = Math.max((property.visits / maxVisits) * 100, 8);

            return (
              <li
                key={property.propertyId}
                className="min-w-0 rounded-2xl border border-domus-secondary bg-white p-3 sm:p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: chartColors.primary }}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="flex min-w-0 items-start gap-2 text-sm font-bold leading-snug text-domus-text">
                          <Home className="h-4 w-4 shrink-0 text-domus-primary" />
                          <span className="min-w-0 break-words">{property.title}</span>
                        </h3>
                        <p className="mt-1 flex min-w-0 items-start gap-1.5 text-xs leading-snug text-domus-textSoft">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="min-w-0 break-words">{property.address ?? property.propertyId}</span>
                        </p>
                      </div>

                      <span
                        className="w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:ml-3"
                        style={{
                          backgroundColor: chartColors.accent,
                          color: chartColors.primary,
                        }}
                      >
                        {property.visits} turnos
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-domus-secondary">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: chartColors.primarySoft,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
