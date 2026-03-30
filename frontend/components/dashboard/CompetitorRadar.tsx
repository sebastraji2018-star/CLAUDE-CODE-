'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RadarEntry {
  name: string;
  color: string;
  data: Record<string, number>; // dimension -> value
}

interface CompetitorRadarProps {
  entries: RadarEntry[];
  title?: string;
}

const DIMENSIONS = [
  { key: 'marketPositionScore', label: 'Posición' },
  { key: 'shareOfVoice', label: 'Share of Voice' },
  { key: 'pricingIndex', label: 'Precio' },
  { key: 'featureScore', label: 'Producto' },
  { key: 'sentimentScore', label: 'Sentimiento' },
];

export function CompetitorRadar({ entries, title }: CompetitorRadarProps) {
  const chartData = DIMENSIONS.map(dim => {
    const point: Record<string, any> = { dimension: dim.label };
    entries.forEach(e => {
      point[e.name] = e.data[dim.key] ?? 0;
    });
    return point;
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200">
      {title && <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#f0f0f0" />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} tickCount={4} />
          <Tooltip
            formatter={(val: number) => [Math.round(val), '']}
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            formatter={(value) => <span style={{ color: '#6b7280' }}>{value}</span>}
          />
          {entries.map(e => (
            <Radar
              key={e.name}
              name={e.name}
              dataKey={e.name}
              stroke={e.color}
              fill={e.color}
              fillOpacity={0.12}
              strokeWidth={2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
