'use client';

import Link from 'next/link';
import { ArrowRight, Target, BarChart2, Settings, Zap, TrendingUp, Clock } from 'lucide-react';

export default function DashboardOverviewPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Competencia</h1>
        <p className="text-gray-500 mt-1">
          Monitoreo automático 24/7 de tu posición competitiva en el mercado
        </p>
      </div>

      {/* Quick start cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/dashboard/brand-setup"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
            <Settings size={24} className="text-blue-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Configurar Marca</h3>
          <p className="text-sm text-gray-500 mb-4">
            Ingresa el contexto de tu marca y define qué competidores rastrear
          </p>
          <div className="flex items-center text-blue-500 text-sm font-medium">
            Comenzar <ArrowRight size={14} className="ml-1" />
          </div>
        </Link>

        <Link
          href="/dashboard/benchmark"
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
            <BarChart2 size={24} className="text-purple-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Ver Benchmark</h3>
          <p className="text-sm text-gray-500 mb-4">
            Compara tu marca vs competidores con métricas visuales actualizadas diariamente
          </p>
          <div className="flex items-center text-purple-500 text-sm font-medium">
            Ver Dashboard <ArrowRight size={14} className="ml-1" />
          </div>
        </Link>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
            <Zap size={24} className="text-white" />
          </div>
          <h3 className="font-semibold mb-1">Análisis IA Activo</h3>
          <p className="text-sm text-white/80 mb-4">
            El agente de IA analiza tu competencia automáticamente todos los días
          </p>
          <div className="flex items-center text-white/90 text-sm font-medium">
            <Clock size={14} className="mr-1" /> Próxima actualización: en 24h
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-500" />
          Cómo funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Ingresa tu contexto', desc: 'Describe tu marca, industria y competidores a rastrear' },
            { step: '02', title: 'IA analiza diario', desc: 'Claude AI genera métricas competitivas cada 24 horas' },
            { step: '03', title: 'Dashboard visual', desc: 'Ve tendencias, comparaciones y posicionamiento en tiempo real' },
            { step: '04', title: 'Insights accionables', desc: 'Recibe recomendaciones estratégicas basadas en datos' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {step}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
