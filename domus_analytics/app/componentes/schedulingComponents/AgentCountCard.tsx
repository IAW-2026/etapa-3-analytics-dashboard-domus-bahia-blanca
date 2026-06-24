"use client";

import { UsersRound } from "lucide-react";
import { cardClassName, chartThemeStyle } from "./chartStyles";

type AgentCountCardProps = {
  count: number;
};

export default function AgentCountCard({ count }: AgentCountCardProps) {
  return (
    <section className={cardClassName} style={chartThemeStyle}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-domus-text">
            Agentes en la inmobiliaria
          </h2>
          <p className="text-sm text-domus-textSoft">
            Total de agentes activos consultados por inmobiliaria.
          </p>
        </div>
        <div className="rounded-2xl bg-domus-secondary p-3 text-domus-primary">
          <UsersRound className="h-6 w-6" />
        </div>
      </div>

      <p className="mt-8 text-6xl font-bold leading-none text-domus-primary">
        {count}
      </p>
    </section>
  );
}
