'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Settings, BarChart2, TrendingUp, Users, Star, Zap, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { CompetitorRadar } from '@/components/dashboard/CompetitorRadar';
import { CompetitorTable } from '@/components/dashboard/CompetitorTable';
import { InsightsFeed } from '@/components/dashboard/InsightsFeed';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const WORKSPACE_ID = 'demo-workspace';

const ENTITY_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

interface BenchmarkData {
  ownBrand: any;
  competitors: any[];
  summary: {
    competitiveScore: number;
    shareOfVoice: number;
    sentimentScore: number;
    featureScore: number;
    avgCompetitorScore: number;
    avgShareOfVoice: number;
  };
}

interface BrandContext {
  brandName: string;
  industry: string;
}

function buildTrendSeries(trends: any[], ownBrandName: string, competitorNames: string[]) {
  const byDateEntity: Record<string, Record<string, number>> = {};

  trends.forEach((s: any) => {
    const date = s.snapshotDate?.substring(0, 10) || s.snapshotDate;
    if (!byDateEntity[date]) byDateEntity[date] = {};
    const key = s.competitorId ? (competitorNames[s.competitorId] || s.competitorId) : ownBrandName;
    byDateEntity[date][key] = s.marketPositionScore;
  });

  return Object.entries(byDateEntity)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, vals]) => ({ date, ...vals }));
}

export default function BenchmarkPage() {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData | null>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [brandContext, setBrandContext] = useState<BrandContext | null>(null);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setError('');
    try {
      const [ctxRes, benchRes, trendsRes, insightsRes, compsRes] = await Promise.all([
        fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/brand-context`),
        fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/benchmark`),
        fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/benchmark/trends?days=30`),
        fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/insights?limit=7`),
        fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/competitors`),
      ]);

      if (ctxRes.ok) setBrandContext(await ctxRes.json());
      if (benchRes.ok) setBenchmarkData(await benchRes.json());
      if (trendsRes.ok) setTrendData(await trendsRes.json());
      if (insightsRes.ok) setInsights(await insightsRes.json());
      if (compsRes.ok) setCompetitors(await compsRes.json());
      setLastUpdated(new Date());
    } catch {
      setError('No se pudo conectar con el backend. Asegúrate que está corriendo en el puerto 5000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  }

  // Build competitor id -> name map
  const compNameMap: Record<string, string> = {};
  competitors.forEach(c => { compNameMap[c.id] = c.name; });

  const ownBrandName = brandContext?.brandName || 'Tu Marca';

  // Build chart data
  const trendChartData = buildTrendSeries(trendData, ownBrandName, compNameMap);

  const trendSeries = [
    { id: ownBrandName, name: ownBrandName, color: ENTITY_COLORS[0] },
    ...competitors.map((c, i) => ({
      id: c.name,
      name: c.name,
      color: ENTITY_COLORS[Math.min(i + 1, ENTITY_COLORS.length - 1)],
    })),
  ];

  // Radar entries
  const radarEntries = [
    {
      name: ownBrandName,
      color: ENTITY_COLORS[0],
      data: benchmarkData?.ownBrand
        ? {
            marketPositionScore: benchmarkData.ownBrand.marketPositionScore,
            shareOfVoice: benchmarkData.ownBrand.shareOfVoice,
            pricingIndex: benchmarkData.ownBrand.pricingIndex,
            featureScore: benchmarkData.ownBrand.featureScore,
            sentimentScore: benchmarkData.ownBrand.sentimentScore,
          }
        : { marketPositionScore: 0, shareOfVoice: 0, pricingIndex: 0, featureScore: 0, sentimentScore: 0 },
    },
    ...(benchmarkData?.competitors ?? []).map((c, i) => ({
      name: c.competitorName,
      color: ENTITY_COLORS[Math.min(i + 1, ENTITY_COLORS.length - 1)],
      data: {
        marketPositionScore: c.marketPositionScore,
        shareOfVoice: c.shareOfVoice,
        pricingIndex: c.pricingIndex,
        featureScore: c.featureScore,
        sentimentScore: c.sentimentScore,
      },
    })),
  ];

  // Table rows
  const tableRows = [
    ...(benchmarkData?.ownBrand
      ? [{
          name: ownBrandName,
          isOwnBrand: true,
          marketPositionScore: benchmarkData.ownBrand.marketPositionScore,
          shareOfVoice: benchmarkData.ownBrand.shareOfVoice,
          pricingIndex: benchmarkData.ownBrand.pricingIndex,
          featureScore: benchmarkData.ownBrand.featureScore,
          sentimentScore: benchmarkData.ownBrand.sentimentScore,
        }]
      : []),
    ...(benchmarkData?.competitors ?? []).map(c => ({
      name: c.competitorName,
      isOwnBrand: false,
      marketPositionScore: c.marketPositionScore,
      shareOfVoice: c.shareOfVoice,
      pricingIndex: c.pricingIndex,
      featureScore: c.featureScore,
      sentimentScore: c.sentimentScore,
    })),
  ];

  const summary = benchmarkData?.summary;
  const scoreDiff = summary ? summary.competitiveScore - summary.avgCompetitorScore : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <p className="text-sm">Cargando datos de benchmark...</p>
      </div>
    );
  }

  if (!brandContext) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
          <Settings size={28} className="text-blue-500" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Configura tu marca primero</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Para ver el benchmark competitivo necesitas configurar el contexto de tu marca y agregar competidores.
          </p>
          <Link
            href="/dashboard/brand-setup"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            <Settings size={16} /> Ir a configuración
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Benchmark Competitivo</h1>
            {brandContext.industry && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                {brandContext.industry}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            {ownBrandName} vs {competitors.length} competidores
            {lastUpdated && (
              <span className="ml-2 text-gray-400">
                · Actualizado {lastUpdated.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/brand-setup"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg transition-colors"
          >
            <Settings size={14} /> Editar
          </Link>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 px-3 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Analizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Score Competitivo"
          value={Math.round(summary?.competitiveScore ?? 0)}
          unit="/100"
          trend={scoreDiff > 0 ? Math.round(scoreDiff) : scoreDiff < 0 ? Math.round(scoreDiff) : 0}
          description={`Prom. competidores: ${summary?.avgCompetitorScore ?? 0}`}
          color="blue"
          icon={<BarChart2 size={20} />}
        />
        <MetricCard
          title="Share of Voice"
          value={Math.round(summary?.shareOfVoice ?? 0)}
          unit="%"
          description={`Prom. mercado: ${summary?.avgShareOfVoice ?? 0}%`}
          color="purple"
          icon={<Users size={20} />}
        />
        <MetricCard
          title="Sentimiento de Marca"
          value={Math.round(summary?.sentimentScore ?? 0)}
          unit="/100"
          color="green"
          icon={<Star size={20} />}
        />
        <MetricCard
          title="Score de Producto"
          value={Math.round(summary?.featureScore ?? 0)}
          unit="/100"
          color="orange"
          icon={<Zap size={20} />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TrendChart
          title="Posición Competitiva (30 días)"
          data={trendChartData}
          series={trendSeries}
          yDomain={[0, 100]}
        />
        <CompetitorRadar
          title="Comparación Multidimensional (actual)"
          entries={radarEntries}
        />
      </div>

      {/* Comparison table */}
      <div className="mb-6">
        <CompetitorTable
          title="Comparación Detallada"
          rows={tableRows}
        />
      </div>

      {/* AI Insights */}
      <InsightsFeed
        title="Insights Diarios de IA"
        insights={insights}
      />

      {/* No data state */}
      {!benchmarkData?.ownBrand && !error && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Primer análisis en proceso</h3>
            <p className="text-sm text-blue-700">
              El agente de IA aún no ha generado datos para tu marca. El primer análisis se ejecuta automáticamente o puedes forzarlo haciendo clic en "Actualizar" arriba.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
