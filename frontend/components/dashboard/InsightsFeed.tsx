import { Zap, Calendar } from 'lucide-react';

interface Insight {
  id: string;
  snapshotDate: string;
  aiInsights: string;
}

interface InsightsFeedProps {
  insights: Insight[];
  title?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function InsightsFeed({ insights, title }: InsightsFeedProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Zap size={16} className="text-blue-500" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      <div className="divide-y divide-gray-50">
        {insights.filter(i => i.aiInsights).map((insight, idx) => (
          <div key={insight.id} className={`px-6 py-4 ${idx === 0 ? 'bg-blue-50/40' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={13} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">{formatDate(insight.snapshotDate)}</span>
              {idx === 0 && (
                <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                  Último
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {insight.aiInsights}
            </p>
          </div>
        ))}

        {insights.filter(i => i.aiInsights).length === 0 && (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Zap size={20} className="text-blue-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Sin insights todavía</p>
            <p className="text-xs text-gray-400">
              El agente de IA generará insights después del primer análisis diario.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
