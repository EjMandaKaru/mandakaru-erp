import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
};

export const DashboardCard = ({
  title,
  value,
  icon: Icon,
}: DashboardCardProps) => (
  <div className="card bg-base-100 shadow-md rounded-box p-4">
    <div className="flex items-center gap-4">
      {Icon && <Icon className="w-6 h-6 text-primary" />}
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);
