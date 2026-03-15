export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🚀 Lead Generation SaaS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Lead Generation Platform | Generate Customers 24/7
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              ✨ Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Feature title="🤖 ICP Inteligente" description="Analiza tus datos y crea perfiles de clientes ideales automáticamente" />
              <Feature title="🔍 Búsqueda 24/7" description="Agentes buscan leads continuamente en múltiples fuentes" />
              <Feature title="⚡ Calificación Automática" description="ML scoring para identificar los mejores prospectos" />
              <Feature title="💬 Mensajes Personalizados" description="Generados por IA para cada prospecto" />
              <Feature title="📊 ROI Medible" description="Dashboard con métricas en tiempo real" />
              <Feature title="🔗 Integraciones CRM" description="Sincroniza con Salesforce, HubSpot, Pipedrive" />
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="/auth/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 mr-4"
            >
              Inicia Sesión
            </a>
            <a
              href="/auth/register"
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Regístrate Gratis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
