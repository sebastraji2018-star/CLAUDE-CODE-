# 🔧 Guía Técnica de Setup - Claude Class

**Última actualización**: 26/03/2026 | **Versión**: 1.0

---

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Setup Local](#setup-local)
3. [Configuración de Servicios Externos](#configuración-de-servicios-externos)
4. [Código de Referencia](#código-de-referencia)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Monitoreo en Producción](#monitoreo-en-producción)

---

## ✅ Requisitos Previos

```bash
# Verificar versiones
node --version  # v18 o superior
npm --version   # v9 o superior
git --version   # v2.40 o superior

# Cuentas necesarias (gratuitas)
1. GitHub: https://github.com
2. Vercel: https://vercel.com
3. Supabase: https://supabase.com
4. Stripe: https://stripe.com
5. Mailchimp: https://mailchimp.com
6. Bunny CDN: https://bunny.net
7. Namecheap: https://namecheap.com (o tu registrador preferido)
```

---

## 🏠 Setup Local

### Paso 1: Clonar y Preparar Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/claude-class.git
cd claude-class

# Crear rama para desarrollo
git checkout -b develop

# Crear estructura de carpetas
mkdir -p src/{components,pages,utils,styles,hooks,types,lib}
mkdir -p public/{videos,images}
mkdir -p config
```

### Paso 2: Instalar Dependencias

```bash
# Instalar dependencias principales
npm install

# Instalar dependencias de desarrollo
npm install --save-dev \
  @types/node \
  @types/react \
  @types/react-dom \
  typescript \
  tailwindcss \
  postcss \
  autoprefixer \
  eslint \
  prettier

# Crear archivos de configuración
npx tailwindcss init -p
npx eslint --init
```

### Paso 3: Variables de Entorno

```bash
# Crear archivo .env.local
cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx

# Mailchimp
MAILCHIMP_API_KEY=xxxxx-us1
MAILCHIMP_AUDIENCE_ID=xxxxx
MAILCHIMP_SERVER=us1

# Bunny CDN
BUNNY_CDN_HOSTNAME=claudeclass-videos.b-cdn.net
BUNNY_ACCESS_KEY=xxxxx

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
EOF

# Crear .env.local.example para documentar variables
cp .env.local .env.local.example
# Limpiar valores sensibles en .example
sed -i 's/=.*/=xxxxx/g' .env.local.example

# Agregar a .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

### Paso 4: Estructura de Proyecto

```bash
# Crear estructura estándar
mkdir -p src/{pages,components,utils,lib,types,styles}

# Crear archivos iniciales
touch src/pages/_app.tsx
touch src/pages/_document.tsx
touch src/pages/index.tsx
touch src/pages/pricing.tsx
touch src/pages/dashboard.tsx
touch src/pages/api/checkout.ts
touch src/pages/api/webhooks/stripe.ts

touch tailwind.config.js
touch next.config.js
touch tsconfig.json
touch .eslintrc.json
```

### Paso 5: Verificar Instalación

```bash
# Iniciar servidor de desarrollo
npm run dev

# Debería mostrar:
# > next dev
# ▲ Next.js 14.0.0
# - Local: http://localhost:3000
```

---

## 🔐 Configuración de Servicios Externos

### 1️⃣ Supabase Setup

#### 1.1 Crear Proyecto

```bash
# En supabase.com
1. Click "New project"
2. Database password: Generar contraseña fuerte
3. Region: us-east-1 (recomendado)
4. Esperar 2-3 minutos a que se cree
```

#### 1.2 Obtener Credenciales

```bash
# En Settings > API
- URL: https://xxxxx.supabase.co
- Anon key: xxxxx (público, safe para frontend)
- Service role key: xxxxx (SECRETO, solo backend)

# Copiar a .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

#### 1.3 Crear Tablas y Políticas

```sql
-- Copiar este SQL en Supabase > SQL Editor

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 99.00,
  currency TEXT DEFAULT 'USD',
  image_url TEXT,
  video_count INTEGER DEFAULT 0,
  total_duration_hours DECIMAL(5,2),
  instructor_name TEXT,
  category TEXT,
  level TEXT, -- 'beginner', 'intermediate', 'advanced'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de módulos/lecciones
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  video_duration_seconds INTEGER,
  order_index INTEGER NOT NULL,
  resources_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(course_id, order_index)
);

-- Tabla de inscripciones
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  payment_intent_id TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'refunded'
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  refunded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, course_id)
);

-- Tabla de progreso
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  watched_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completion_percentage DECIMAL(5,2) DEFAULT 0,
  last_watched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, lesson_id)
);

-- Crear índices para performance
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_lesson_id ON progress(lesson_id);
CREATE INDEX idx_users_email ON users(email);

-- RLS (Row Level Security) - Permitir usuarios ver sus datos
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios solo ven sus propios datos
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can view their enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view their progress"
  ON progress FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can update their progress"
  ON progress FOR UPDATE
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Política: Todos pueden ver cursos públicos
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);
```

### 2️⃣ Stripe Setup

#### 2.1 Crear Cuenta y Obtener Keys

```bash
# En stripe.com
1. Sign up
2. Completar perfil (nombre negocio, país)
3. Ir a Settings > API keys
4. Copiar:
   - Publishable key (pk_live_...)
   - Secret key (sk_live_...)
```

#### 2.2 Crear Webhook

```bash
# En Stripe Dashboard > Webhooks
1. Agregar endpoint
   URL: https://claudeclass.com/api/webhooks/stripe (después de deploy)
   Eventos a escuchar:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - customer.subscription.updated
   - customer.subscription.deleted

2. Copiar "Signing secret" (whsec_...)

# Para testing local:
npm install -g stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Mostrará: whsec_test_xxxxx
```

### 3️⃣ Mailchimp Setup

#### 3.1 Crear Cuenta

```bash
# En mailchimp.com
1. Sign up
2. Crear "Audience" para Claude Class
3. Ir a Settings > API keys
4. Copiar API key
5. Anotar servidor (ej: us1, us2, etc.)
```

#### 3.2 Crear Secuencias de Email

```
Mailchimp > Automation > Customer Journey

Email 1 (Hora 0): Bienvenida
- Subject: ¡Bienvenido a Claude Class! 🎉
- Contenido: Presentación + primer video
- Link: Dashboard

Email 2 (Día 3): Check-in
- Subject: ¿Cómo va tu progreso?
- Contenido: Motivación + recursos extras

Email 3 (Día 7): Resumen semanal
- Subject: Tu progreso esta semana 📊
- Contenido: Lecciones completadas + logros

Email 4 (Día 14): Comunidad
- Subject: Únete a la comunidad 👥
- Contenido: Invitación a Discord + testimonios

Email 5 (Día 30): Mitad del camino
- Subject: ¡Estás a mitad de camino! 🎉
- Contenido: Celebrar, siguiente modulo
```

### 4️⃣ Bunny CDN Setup

#### 4.1 Crear Cuenta y Storage

```bash
# En bunnycdn.com
1. Sign up
2. Ir a Storage
3. Crear nuevo storage zone: claudeclass-videos
4. Region: Los Angeles (para Americas)
5. Copiar credenciales

# Configuración:
BUNNY_CDN_HOSTNAME=claudeclass-videos.b-cdn.net
BUNNY_ACCESS_KEY=xxxxx
BUNNY_BUCKET_NAME=claudeclass-videos
```

#### 4.2 Subir Videos

```bash
#!/bin/bash
# Instalar cliente (opcional, o usar API)
npm install --save-dev bunny-sdk

# Script para subir videos
cat > scripts/upload-videos.sh << 'EOF'
#!/bin/bash

BUNNY_ACCESS_KEY="your-access-key"
BUNNY_HOSTNAME="claudeclass-videos.b-cdn.net"

# Subir video
curl -X PUT \
  "https://${BUNNY_HOSTNAME}/module-1-lesson-1.mp4" \
  -H "AccessKey: ${BUNNY_ACCESS_KEY}" \
  -d @module-1-lesson-1.mp4

# URL pública:
# https://claudeclass-videos.b-cdn.net/module-1-lesson-1.mp4
EOF

chmod +x scripts/upload-videos.sh
```

---

## 💻 Código de Referencia

### Estructura de Carpetas Recomendada

```
claude-class/
├── src/
│   ├── pages/
│   │   ├── _app.tsx              # App wrapper
│   │   ├── _document.tsx         # HTML document
│   │   ├── index.tsx             # Landing page
│   │   ├── pricing.tsx           # Pricing page
│   │   ├── dashboard.tsx         # Student dashboard
│   │   ├── course/
│   │   │   └── [id].tsx          # Course page
│   │   ├── lesson/
│   │   │   └── [id].tsx          # Lesson with video
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   └── callback.tsx
│   │   ├── success.tsx           # Payment success
│   │   └── api/
│   │       ├── checkout.ts       # Create checkout session
│   │       ├── auth/
│   │       │   ├── signin.ts
│   │       │   └── callback.ts
│   │       ├── user/
│   │       │   └── progress.ts
│   │       └── webhooks/
│   │           └── stripe.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── course/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseCurriculum.tsx
│   │   │   └── VideoPlayer.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Loader.tsx
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── stripe.ts            # Stripe utilities
│   │   ├── mailchimp.ts         # Mailchimp API
│   │   └── bunny.ts             # Bunny CDN utilities
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCourse.ts
│   │   └── useProgress.ts
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validation.ts
│   │   └── formatters.ts
│   └── styles/
│       ├── globals.css
│       └── variables.css
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── og-image.jpg
├── config/
│   ├── site.ts
│   └── stripe.ts
├── .env.local.example
├── .env.local (⚠️ GITIGNORED)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Ejemplo: pages/index.tsx (Landing Page)

```typescript
// src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      title: '30+ Horas de Contenido',
      description: 'Videos de alta calidad en 1080p con subtítulos',
      icon: '🎬',
    },
    {
      title: 'Aprendizaje a tu Ritmo',
      description: 'Completa el curso cuando quieras, donde quieras',
      icon: '⏱️',
    },
    {
      title: 'Comunidad Exclusiva',
      description: 'Conecta con otros estudiantes en Discord',
      icon: '👥',
    },
    {
      title: 'Certificado al Finalizar',
      description: 'Demuestra tu expertise en tu CV',
      icon: '🎓',
    },
  ];

  const courseStats = [
    { label: '5000+', value: 'Estudiantes' },
    { label: '4.9/5', value: 'Rating Promedio' },
    { label: '30+', value: 'Horas de Video' },
  ];

  return (
    <>
      <Head>
        <title>Claude Class - Domina la IA en 30 Horas</title>
        <meta
          name="description"
          content="Curso completo de inteligencia artificial con Claude. Aprende desde cero"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Claude Class" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                Domina <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Claude AI</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Aprende a utilizar la inteligencia artificial más avanzada del mercado.
                Un curso completo de 30+ horas con ejercicios prácticos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition"
                >
                  Ver Precio
                </Link>
                <button
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-lg font-bold hover:bg-purple-400/10 transition"
                >
                  Saber Más
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {courseStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-slate-400">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">
              ¿Qué Aprenderás?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-black/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comienza tu viaje hoy
            </h2>
            <p className="text-slate-300 mb-8">
              Acceso de por vida a todo el contenido, updates incluidos
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition"
            >
              Ver Precios
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
```

### Ejemplo: pages/api/checkout.ts

```typescript
// src/pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { courseId, userEmail } = req.body;

  if (!courseId || !userEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Crear sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Claude Class - Curso Completo',
              description: '30+ horas de contenido exclusivo sobre Claude AI',
              images: ['https://claudeclass.com/og-image.jpg'],
            },
            unit_amount: 9900, // $99.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        courseId,
        userEmail,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      sessionUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

### Ejemplo: pages/api/webhooks/stripe.ts

```typescript
// src/pages/api/webhooks/stripe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import mailchimp from '@mailchimp/mailchimp_marketing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER || 'us1',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function sendWelcomeEmail(email: string) {
  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
        tags: ['claude-class-student', 'course-enrolled'],
      }
    );
  } catch (error) {
    console.error('Error adding to Mailchimp:', error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Missing stripe-signature header');
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send('Webhook Error');
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { courseId, userEmail } = paymentIntent.metadata;

        // Obtener o crear usuario
        let { data: user, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .single();

        if (userError) {
          // Crear nuevo usuario
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([{ email: userEmail }])
            .select('id')
            .single();

          if (createError) throw createError;
          user = newUser;
        }

        // Crear inscripción
        await supabase.from('enrollments').insert([
          {
            user_id: user.id,
            course_id: courseId,
            payment_intent_id: paymentIntent.id,
            status: 'active',
          },
        ]);

        // Agregar a Mailchimp
        await sendWelcomeEmail(userEmail);

        console.log(`Enrollment created for ${userEmail}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error(
          `Payment failed for ${paymentIntent.metadata?.userEmail}: ${paymentIntent.last_payment_error?.message}`
        );
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Ejemplo: lib/supabase.ts

```typescript
// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (supabase) return supabase;

  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
};

export const getSupabaseAdminClient = (): SupabaseClient => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};
```

---

## 🧪 Testing

### Setup de Testing

```bash
# Instalar dependencias de testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Crear jest.config.js
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
EOF

# Crear jest.setup.js
cat > jest.setup.js << 'EOF'
import '@testing-library/jest-dom'
EOF
```

### Ejemplo: Testing de Checkout

```typescript
// src/pages/api/checkout.test.ts
import { createMocks } from 'node-mocks-http';
import handler from './checkout';

describe('/api/checkout', () => {
  it('returns session URL on valid request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        courseId: 'test-course-id',
        userEmail: 'test@example.com',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const jsonData = JSON.parse(res._getData());
    expect(jsonData.sessionUrl).toBeDefined();
  });

  it('returns 400 on missing fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
```

---

## 🚀 Deployment

### Deploying en Vercel

```bash
# 1. Conectar repositorio a Vercel
# (en vercel.com > Import Project > seleccionar tu repo)

# 2. Variables de entorno en Vercel
# Settings > Environment Variables
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=xxx
STRIPE_SECRET_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx
MAILCHIMP_API_KEY=xxx
MAILCHIMP_AUDIENCE_ID=xxx
MAILCHIMP_SERVER=us1

# 3. Auto deploy en cada push
# Vercel lo hace automáticamente

# 4. Verificar deployment
# Debería estar en https://claudeclass.vercel.app
```

### Configurar Dominio Personalizado

```bash
# En Vercel Dashboard > Domains
1. Agregar dominio: claudeclass.com
2. Vercel dará opciones:
   a) Cambiar nameservers en registrador
   b) Agregar CNAME record

# Opción A (Nameservers) - RECOMENDADO
# En Namecheap:
# Nameservers > Custom DNS
# dns1.vercel-dns.com
# dns2.vercel-dns.com

# Verificar propagación:
nslookup claudeclass.com
dig claudeclass.com
```

---

## 📊 Monitoreo en Producción

### Google Analytics

```typescript
// src/lib/analytics.ts
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('pageview', {
      page_path: url,
    });
  }
};

export const event = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const conversion = (value: number) => {
  event('purchase', 'ecommerce', 'purchase', value);
};
```

### Stripe Dashboard Monitoring

```
Monitoreo automático en stripe.com:
- Transacciones exitosas
- Transacciones fallidas
- Webhook health
- Payout status
- Disputes
```

### Sentry (Error Tracking)

```bash
# Instalar
npm install @sentry/nextjs

# Configurar
cat > pages/_error.tsx << 'EOF'
import * as Sentry from "@sentry/nextjs";

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  // Sentry automaticamente captura errores
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return (
    <div>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </h1>
    </div>
  );
}

Error.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  return {
    statusCode: contextData.res?.statusCode || 404,
    hasGetInitialPropsRun: true,
  };
};

export default Sentry.withProfiler(Error);
EOF
```

---

## 🐛 Troubleshooting

### Problema: "CORS error" en checkout

```typescript
// next.config.js
module.exports = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ];
  },
};
```

### Problema: Webhook no recibe eventos

```bash
# Verificar:
1. URL de webhook es correcta en Stripe
2. Webhook secret es el correcto
3. Logs en Stripe Dashboard > Webhooks > Events
4. Local testing: stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Problema: Videos no cargan desde Bunny

```bash
# Verificar:
1. URL de video es correcta
2. Token de acceso de Bunny es válido
3. CORS habilitado en Bunny CDN
4. Video existe en storage zone

# Debug:
curl -I https://claudeclass-videos.b-cdn.net/video.mp4
```

---

**Última actualización**: 26 de marzo de 2026

