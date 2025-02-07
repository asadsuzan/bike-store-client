import React from "react";
import { LucideIcon } from "lucide-react";

interface AnalyticsSummaryCardProps {
  icon: LucideIcon;
  iconColor?: string;
  value: number | string;
  label: string;
  backgroundColor?: string;
}

const AnalyticsSummaryCard: React.FC<AnalyticsSummaryCardProps> = ({
  icon: Icon,
  iconColor = "#FFBF00",
  value,
  label,
  backgroundColor = "white",
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm`}
      style={{ backgroundColor }}
    >
      <Icon className={`w-8 h-8`} style={{ color: iconColor }} />
      <div className="text-right">
        <h2 className="text-xl font-semibold">{value}</h2>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default AnalyticsSummaryCard;
