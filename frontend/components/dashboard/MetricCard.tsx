import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: number; // positive = up, negative = down
  description?: string;
  color?: 'blue' | 'purple' | 'green' | 'orange';
  icon?: React.ReactNode;
}

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', badge: 'bg-orange-100' },
};

export function MetricCard({ title, value, unit, trend, description, color = 'blue', icon }: MetricCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
          {icon && <span className={colors.text}>{icon}</span>}
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trend > 0
                ? 'bg-green-100 text-green-600'
                : trend < 0
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {trend > 0 ? (
              <TrendingUp size={12} />
            ) : trend < 0 ? (
              <TrendingDown size={12} />
            ) : (
              <Minus size={12} />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="mb-1">
        <span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
        {unit && <span className="text-gray-400 text-sm ml-1">{unit}</span>}
      </div>

      <p className="text-sm font-medium text-gray-700">{title}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
  );
}
