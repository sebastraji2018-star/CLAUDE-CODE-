'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, Loader2, CheckCircle, AlertCircle, Target } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const WORKSPACE_ID = 'demo-workspace'; // In production, pull from auth context

const INDUSTRY_OPTIONS = [
  'Tecnología', 'E-commerce', 'SaaS', 'Fintech', 'Salud', 'Educación',
  'Marketing', 'Retail', 'Logística', 'Manufactura', 'Servicios', 'Otro',
];

const METRIC_OPTIONS = [
  'Precio', 'Características de producto', 'Posicionamiento de marca',
  'Share of voice', 'Reputación online', 'Presencia en redes sociales',
  'Estrategia de contenido', 'Velocidad de innovación',
];

export default function BrandSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    brandName: '',
    industry: '',
    valueProposition: '',
    targetAudience: '',
    competitors: [''],
    keyMetrics: [] as string[],
  });

  useEffect(() => {
    fetchExistingContext();
  }, []);

  async function fetchExistingContext() {
    try {
      const res = await fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/brand-context`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setForm({
            brandName: data.brandName || '',
            industry: data.industry || '',
            valueProposition: data.valueProposition || '',
            targetAudience: data.targetAudience || '',
            competitors: data.competitors?.length ? data.competitors : [''],
            keyMetrics: data.keyMetrics || [],
          });
        }
      }
    } catch {
      // no existing context, use defaults
    } finally {
      setFetching(false);
    }
  }

  function addCompetitor() {
    setForm(f => ({ ...f, competitors: [...f.competitors, ''] }));
  }

  function removeCompetitor(i: number) {
    setForm(f => ({ ...f, competitors: f.competitors.filter((_, idx) => idx !== i) }));
  }

  function updateCompetitor(i: number, val: string) {
    setForm(f => {
      const competitors = [...f.competitors];
      competitors[i] = val;
      return { ...f, competitors };
    });
  }

  function toggleMetric(metric: string) {
    setForm(f => ({
      ...f,
      keyMetrics: f.keyMetrics.includes(metric)
        ? f.keyMetrics.filter(m => m !== metric)
        : [...f.keyMetrics, metric],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaved(false);

    const cleanedCompetitors = form.competitors.filter(c => c.trim() !== '');
    if (!form.brandName || !form.industry || !form.valueProposition || !form.targetAudience) {
      setError('Por favor completa todos los campos obligatorios.');
      setLoading(false);
      return;
    }
    if (cleanedCompetitors.length === 0) {
      setError('Agrega al menos un competidor para rastrear.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/brand-context`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, competitors: cleanedCompetitors }),
      });

      if (!res.ok) throw new Error('Error al guardar');

      // Also create competitors in competitor-tracking
      for (const name of cleanedCompetitors) {
        await fetch(`${API_BASE}/workspaces/${WORKSPACE_ID}/competitors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        }).catch(() => {});
      }

      setSaved(true);
      setTimeout(() => router.push('/dashboard/benchmark'), 1500);
    } catch {
      setError('No se pudo guardar. Asegúrate que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Target size={20} className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurar tu Marca</h1>
            <p className="text-gray-500 text-sm">
              Esta información guía el análisis competitivo automatizado de IA
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-900">Información de la Marca</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la marca <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.brandName}
                onChange={e => setForm(f => ({ ...f, brandName: e.target.value }))}
                placeholder="Ej: MiEmpresa"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industria <span className="text-red-500">*</span>
              </label>
              <select
                value={form.industry}
                onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar industria...</option>
                {INDUSTRY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Propuesta de valor <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.valueProposition}
              onChange={e => setForm(f => ({ ...f, valueProposition: e.target.value }))}
              placeholder="¿Qué hace única a tu marca? ¿Qué problema resuelves?"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audiencia objetivo <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.targetAudience}
              onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))}
              placeholder="¿A quién le vendes? Describe tu cliente ideal."
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Competitors */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-900">Competidores a Rastrear</h2>
          <p className="text-sm text-gray-500">
            Agrega los nombres o URLs de tus competidores. La IA los analizará diariamente.
          </p>

          <div className="space-y-2">
            {form.competitors.map((comp, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={comp}
                  onChange={e => updateCompetitor(i, e.target.value)}
                  placeholder={`Competidor ${i + 1} (nombre o URL)`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.competitors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompetitor(i)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCompetitor}
            className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            <Plus size={16} /> Agregar competidor
          </button>
        </div>

        {/* Key metrics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-900">Métricas Clave a Monitorear</h2>
          <p className="text-sm text-gray-500">
            Selecciona qué aspectos competitivos son más importantes para tu marca.
          </p>

          <div className="flex flex-wrap gap-2">
            {METRIC_OPTIONS.map(metric => (
              <button
                key={metric}
                type="button"
                onClick={() => toggleMetric(metric)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  form.keyMetrics.includes(metric)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
            <CheckCircle size={16} />
            Configuración guardada. Redirigiendo al benchmark...
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Guardando...</>
          ) : (
            <><Save size={18} /> Guardar y ver Benchmark</>
          )}
        </button>
      </form>
    </div>
  );
}
