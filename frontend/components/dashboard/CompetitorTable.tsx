import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CompetitorRow {
  name: string;
  isOwnBrand?: boolean;
  marketPositionScore: number;
  shareOfVoice: number;
  pricingIndex: number;
  featureScore: number;
  sentimentScore: number;
  trend?: number;
}

interface CompetitorTableProps {
  rows: CompetitorRow[];
  title?: string;
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{Math.round(value)}</span>
    </div>
  );
}

function TrendBadge({ trend }: { trend?: number }) {
  if (trend === undefined) return <span className="text-gray-300">—</span>;
  if (trend > 0) return (
    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
      <TrendingUp size={12} />+{trend}%
    </span>
  );
  if (trend < 0) return (
    <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
      <TrendingDown size={12} />{trend}%
    </span>
  );
  return <span className="flex items-center gap-1 text-gray-400 text-xs"><Minus size={12} />0%</span>;
}

const ENTITY_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export function CompetitorTable({ rows, title }: CompetitorTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Marca</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[140px]">Posición</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[140px]">Share of Voice</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[140px]">Precio</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[140px]">Producto</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[140px]">Sentimiento</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const color = row.isOwnBrand ? ENTITY_COLORS[0] : ENTITY_COLORS[Math.min(i, ENTITY_COLORS.length - 1)];
              return (
                <tr key={row.name} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${row.isOwnBrand ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-sm font-medium text-gray-900">
                        {row.name}
                        {row.isOwnBrand && (
                          <span className="ml-2 text-xs text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded-full">Tu marca</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><ScoreBar value={row.marketPositionScore} color={color} /></td>
                  <td className="px-4 py-4"><ScoreBar value={row.shareOfVoice} color={color} /></td>
                  <td className="px-4 py-4"><ScoreBar value={row.pricingIndex} color={color} /></td>
                  <td className="px-4 py-4"><ScoreBar value={row.featureScore} color={color} /></td>
                  <td className="px-4 py-4"><ScoreBar value={row.sentimentScore} color={color} /></td>
                  <td className="px-4 py-4"><TrendBadge trend={row.trend} /></td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-400">
                  No hay datos aún. Configura tu marca y espera el análisis diario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
