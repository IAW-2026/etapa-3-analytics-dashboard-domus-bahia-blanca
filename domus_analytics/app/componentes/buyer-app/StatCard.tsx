import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
}

export default function StatCard({ title, value, Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-sm font-bold text-domus-primary">{title}</h2>
        <Icon className="h-5 w-5 text-domus-primary" strokeWidth={3} />
      </div>
      <div className="text-2xl font-black text-domus-primary mt-1">{value}</div>
    </div>
  );
}