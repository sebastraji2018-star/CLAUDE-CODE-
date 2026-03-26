# 🚀 Plan Detallado de Infraestructura - Curso "Claude Class"

**Presupuesto Total**: $0-50/mes | **Fecha**: Marzo 2026 | **Actualización**: 26/03/2026

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Opciones de Stack Recomendadas](#opciones-de-stack-recomendadas)
3. [Desglose de Costos](#desglose-de-costos)
4. [Comparativa de Soluciones](#comparativa-de-soluciones)
5. [Opción Recomendada: STACK PERSONALIZADO](#opción-recomendada-stack-personalizado)
6. [Alternativa 1: Gumroad](#alternativa-1-gumroad)
7. [Alternativa 2: SendOwl](#alternativa-2-sendowl)
8. [Arquitectura Técnica](#arquitectura-técnica)
9. [Instrucciones de Setup](#instrucciones-de-setup)
10. [Integraciones](#integraciones)
11. [Flujo de Datos](#flujo-de-datos)
12. [Timeline de Implementación](#timeline-de-implementación)
13. [Plan de Escalabilidad](#plan-de-escalabilidad)
14. [Seguridad y Compliance](#seguridad-y-compliance)

---

## 📊 Resumen Ejecutivo

### Desafío
Lanzar un curso online de educación (30+ horas) con:
- Landing page + Página de precios
- Hosting de videos de alto rendimiento
- Email marketing automático
- Procesamiento de pagos
- Comunidad de estudiantes
- Analytics

**Restricción crítica**: Máximo $50/mes

### Solución Recomendada
**Stack Personalizado con Servicios Gratuitos + Pagos por Uso**
- Frontend: Vercel (gratis hasta 100GB/mes)
- Videos: Bunny CDN o Vimeo Free Tier
- Email Marketing: Mailchimp (hasta 500 contactos gratis)
- Pagos: Stripe (comisiones sin cuota mensual)
- Dominio: Namecheap ($0.98 primer año)
- Comunidad: Discord (gratis)
- Analytics: Plausible Analytics ($9/mes) O Google Analytics (gratis)
- Base de datos: Supabase (PostgreSQL gratis hasta 500MB)

**Costo Total Mes 1**: $9-12/mes | **Meses siguientes**: $9-12/mes

---

## 🛠️ Opciones de Stack Recomendadas

### OPCIÓN 1: Stack Personalizado (RECOMENDADO)
**Presupuesto**: $9-50/mes | **Flexibilidad**: Alta | **Scalabilidad**: Excelente

| Componente | Herramienta | Precio | Notas |
|---|---|---|---|
| **Dominio** | Namecheap | $0.98/año ($0.08/mes) | Promoción año 1 |
| **Frontend** | Vercel + Next.js | $0 | Gratis hasta 100GB/mes ancho de banda |
| **Videos** | Bunny CDN + R2 | $4-15/mes | $0.01/GB descarga, almacenamiento flexible |
| **Email** | Mailchimp | $0 | Gratis hasta 500 contactos |
| **Pagos** | Stripe | 2.9% + $0.30 por transacción | Sin cuota mensual |
| **Base de Datos** | Supabase | $0 | PostgreSQL gratis (500MB) |
| **Community** | Discord | $0 | Gratis |
| **Analytics** | Google Analytics | $0 | Gratis |
| **TOTAL MES 1** | | **$4-15/mes** | Sin dominio en meses posteriores |
| **TOTAL MESES 2+** | | **$4-15/mes** | Costo recurrente bajo |

**Análisis de costos video hosting**:
- 30 horas = ~180GB en calidad 1080p
- Bunny CDN: ~1GB transferencia/estudiante/curso
- 100 estudiantes = 100GB/mes = $1 transferencia
- Almacenamiento: 180GB = $0.005/GB/mes = $0.90/mes
- **Total Video**: $1.90/mes con 100 estudiantes

---

### OPCIÓN 2: Gumroad (Todo en uno)
**Presupuesto**: $0/mes (comisiones por venta) | **Flexibilidad**: Media | **Scalabilidad**: Buena

| Componente | Solución | Precio | Ventajas |
|---|---|---|---|
| **Dominio** | Gumroad.com/tu-nombre | $0 | Subdominio gratis |
| **Landing + Venta** | Gumroad | $0 | Interfaz lista para vender |
| **Videos** | Gumroad Hosting | $0 | Almacenamiento ilimitado |
| **Email** | Gumroad Digest | $0 | Secuencias básicas |
| **Pagos** | Gumroad | 10% comisión | Sin cuota adicional |
| **Comunidad** | Gumroad Community | $0 | Comunidad integrada |
| **Dominio Propio** | Namecheap | $0.98/año | Opcional |
| **TOTAL COSTO FIJO** | | **$0** | |
| **COSTO POR VENTA** | | **10%** | $9.90 en venta de $99 |

**Estimado con 50 ventas/mes**:
- Ingresos: 50 × $99 = $4,950/mes
- Comisión Gumroad: $495/mes
- Neto: $4,455/mes
- Si dominio propio: +$0.98/año

**Ventajas Gumroad**:
✅ Cero fricción: publicar y vender inmediatamente
✅ Hosting de videos ilimitado
✅ Secuencias de email integradas
✅ Comunidad nativa
✅ 10% comisión es competitivo para todo-en-uno

**Desventajas**:
❌ Menos control sobre el branding
❌ Comunidad limitada vs Discord
❌ Análisis más básicos

---

### OPCIÓN 3: SendOwl
**Presupuesto**: $19/mes | **Flexibilidad**: Alta | **Scalabilidad**: Buena

| Componente | Herramienta | Precio | Notas |
|---|---|---|---|
| **Plan Base** | SendOwl | $19/mes | Hasta 100 productos |
| **Dominio** | Namecheap | $0.98/año | Propio dominio |
| **Videos** | SendOwl Hosting | Incluido | Almacenamiento ilimitado |
| **Email** | SendOwl Integrado | Incluido | Secuencias automáticas |
| **Pagos** | Stripe/PayPal integrado | 3.5% + $0.50 | Sin cuota adicional |
| **Comunidad** | Discord + SendOwl | $0 | Comunidad externa |
| **Analytics** | SendOwl Dashboard | Incluido | Completo |
| **TOTAL MES 1** | | **$20/mes** | |
| **TOTAL MESES 2+** | | **$19/mes** | |

**Ventajas SendOwl**:
✅ Mejor control que Gumroad
✅ Hosting de videos incluido
✅ Secuencias de email robustas
✅ Precios de transacción más bajos
✅ Reportes de ventas detallados

**Desventajas**:
❌ Costo fijo $19/mes
❌ Interfaz menos moderna
❌ Comunidad menos activa

---

## 💰 Desglose de Costos

### Comparativa Mensual (Primeros 100 estudiantes)

```
STACK PERSONALIZADO (RECOMENDADO)
├── Dominio (amortizado): $0.08
├── Vercel: $0
├── Bunny CDN (100GB/mes): $1-2
├── Mailchimp: $0
├── Supabase: $0
├── Stripe: Solo comisiones
├── Discord: $0
├── Google Analytics: $0
└── TOTAL FIJO: $1-2/mes
    VARIABLE: 2.9% + $0.30 por transacción

GUMROAD (TODO-EN-UNO)
├── Costo fijo: $0
├── Comisión por venta: 10%
└── TOTAL: $0 fijo + comisiones variables

SENDOWL
├── Plan base: $19/mes
├── Dominio: $0.08/mes
├── Transacciones: 3.5% + $0.50
└── TOTAL FIJO: $19.08/mes + variables
```

### Proyección Financiera (100 estudiantes)

**Escenario: 50 ventas/mes a $99**

```
OPCIÓN 1: STACK PERSONALIZADO
─────────────────────────────────
Ingresos: $4,950
Gastos fijos: $2 (CDN + dominio)
Gastos variables: 2.9% + $0.30 = $173.70
Costo total: $175.70
MARGEN NETO: 96.4%
GANANCIA: $4,774.30

OPCIÓN 2: GUMROAD
─────────────────────────────────
Ingresos: $4,950
Gastos: 10% comisión = $495
Costo total: $495
MARGEN NETO: 90%
GANANCIA: $4,455

OPCIÓN 3: SENDOWL
─────────────────────────────────
Ingresos: $4,950
Gastos fijos: $19/mes
Gastos variables: 3.5% + ($0.50 × 50) = $198.15
Costo total: $217.15
MARGEN NETO: 95.6%
GANANCIA: $4,732.85
```

---

## 📊 Comparativa de Soluciones

| Criterio | Stack Personalizado | Gumroad | SendOwl |
|---|---|---|---|
| **Costo inicial** | $5-10 | $0 | $19 |
| **Costo recurrente** | $2-15/mes | $0 | $19/mes |
| **Comisión transacciones** | 2.9% + $0.30 | 10% | 3.5% + $0.50 |
| **Hosting videos** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Email marketing** | ⭐⭐⭐ (3º parten) | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Customización** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Comunidad** | ⭐⭐⭐⭐⭐ (Discord) | ⭐⭐⭐ | ⭐⭐ |
| **Escalabilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Soporte** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Setup tiempo** | 2-3 semanas | 1-2 días | 3-5 días |
| **Mejor para** | Control total | Quick launch | Balance |
| **ROI con 100 alumnos** | 96.4% | 90% | 95.6% |

---

## ✅ OPCIÓN RECOMENDADA: Stack Personalizado

### Por qué esta opción es superior:

1. **Costo óptimo**: $4-15/mes vs $19/mes (SendOwl) o 10% comisiones (Gumroad)
2. **Control total**: Tu dominio, tu branding, tus datos
3. **Escalabilidad infinita**: Crece sin costos fijos exponenciales
4. **Margen de ganancia**: 96.4% vs 95.6% (SendOwl) o 90% (Gumroad)
5. **Flexibilidad técnica**: Implementa exactamente lo que necesitas
6. **Comunidad moderna**: Discord es más activo que comunidades integradas

### Con 1000 estudiantes:
- **Stack Personalizado**: ~$30-50/mes, margen 96%+
- **Gumroad**: $0 fijo, pero pagas 10% en comisión siempre
- **SendOwl**: $19 fijo, margen similar pero más costoso

---

## 🏗️ Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CLASS PLATFORM                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CAPA DE PRESENTACIÓN (Frontend)                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Landing Page    │  │  Dashboard       │                │
│  │  (Next.js)       │  │  (Next.js)       │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  Hosting: Vercel (gratis)                                   │
│  Dominio: Namecheap ($0.98/año)                             │
│  SSL: Vercel automático                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ CAPA DE INTEGRACIÓN & PAGOS                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Stripe API      │  │  Webhook Server  │                │
│  │  (Pagos)         │  │  (Vercel)        │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  Comisión: 2.9% + $0.30 por transacción                     │
│  Flujo: Cliente → Stripe → Webhook → Email + DB             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ CAPA DE DATOS & LÓGICA                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Supabase        │  │  Mailchimp API   │                │
│  │  (PostgreSQL)    │  │  (Email)         │                │
│  │  500MB gratis    │  │  500 contactos   │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  - Usuarios/Autenticación                                   │
│  - Cursos y módulos                                         │
│  - Progreso de estudiantes                                  │
│  - Facturas y transacciones                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ CAPA DE CONTENIDO & MEDIA                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Bunny CDN       │  │  Cloudflare R2   │                │
│  │  Videos +        │  │  Almacenamiento  │                │
│  │  Descarga        │  │  $5/mes          │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  - Videos 1080p/4K  (Bunny CDN: $0.01/GB)                   │
│  - Descargas de recursos                                    │
│  - PDFs, Documentos                                         │
│  - Backup automático                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ CAPA DE COMUNIDAD & ANALYTICS                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Discord Server  │  │  Google Analytics│                │
│  │  (Comunidad)     │  │  (Estadísticas)  │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  - Foros de discusión                                       │
│  - Soporte peer-to-peer                                     │
│  - Networking de alumnos                                    │
│  - Conversion rate tracking                                 │
│  - User behavior analytics                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

```

---

## 🔧 Instrucciones de Setup

### FASE 1: Preparación Inicial (Día 1-2)

#### 1.1 Registrar Dominio
```bash
# En Namecheap.com
1. Ir a https://www.namecheap.com
2. Buscar "claudeclass.com" (o similar)
3. Promoción año 1: ~$0.98 (después $8.88/año)
4. Pagar y obtener nameservers:
   - dns1.namecheap.com
   - dns2.namecheap.com
   - dns3.namecheap.com
   - dns4.namecheap.com
```

#### 1.2 Crear Proyecto en Vercel
```bash
# A través de GitHub
1. Ir a https://vercel.com
2. Sign up con GitHub
3. Conectar repositorio de Claude Class
4. Vercel automáticamente detectará Next.js
5. Deploy automático en cada push a main

# Variables de entorno en Vercel:
STRIPE_PUBLISHABLE_KEY=pk_live_XXX
STRIPE_SECRET_KEY=sk_live_XXX
MAILCHIMP_API_KEY=XXX
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SITE_URL=https://claudeclass.com
```

#### 1.3 Setup de Supabase
```bash
# En supabase.com
1. Sign up gratuito
2. Crear nuevo proyecto "claude-class"
3. Region: Más cercana a tu audiencia
4. Esperar creación (~2 minutos)
5. Obtener credenciales en Settings > API

# SQL Inicial (en SQL Editor):
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  video_count INTEGER,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT now(),
  payment_intent_id TEXT,
  status TEXT DEFAULT 'active' -- 'active', 'cancelled'
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  lesson_completed INTEGER DEFAULT 0,
  last_watched_at TIMESTAMP
);
```

---

### FASE 2: Setup de Pagos (Día 3-4)

#### 2.1 Crear Cuenta Stripe
```bash
# En stripe.com
1. Sign up: https://dashboard.stripe.com/register
2. Verificar email
3. Completar perfil de negocio
   - Nombre: Claude Class
   - Website: claudeclass.com
   - País: Tu ubicación
4. Ir a Settings > API Keys
5. Copiar:
   - Publishable Key (pk_live_...)
   - Secret Key (sk_live_...)
6. Activar "Test mode" para desarrollo
```

#### 2.2 Crear Webhooks en Stripe
```bash
# En Stripe Dashboard > Webhooks
1. Agregar endpoint
   - URL: https://claudeclass.com/api/webhooks/stripe
   - Eventos:
     * payment_intent.succeeded
     * payment_intent.payment_failed
     * customer.subscription.deleted

2. Copiar Webhook Secret (whsec_...)
3. Agregar a variables de entorno:
   STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 2.3 Backend para Pagos (Next.js API Route)
```typescript
// /pages/api/checkout.ts
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { courseId, userEmail } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Claude Class - Curso Completo',
            description: '30+ horas de contenido exclusivo',
          },
          unit_amount: 9900, // $99
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      courseId,
      userEmail,
    },
  });

  res.status(200).json({ url: session.url });
}
```

#### 2.4 Webhook para Stripe
```typescript
// /pages/api/webhooks/stripe.ts
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send('Webhook Error');
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const { courseId, userEmail } = paymentIntent.metadata;

  if (event.type === 'payment_intent.succeeded') {
    // Crear inscripción en Supabase
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (user) {
      await supabase.from('enrollments').insert({
        user_id: user.id,
        course_id: courseId,
        payment_intent_id: paymentIntent.id,
        status: 'active',
      });

      // Enviar email de bienvenida
      await sendWelcomeEmail(userEmail);
    }
  }

  res.status(200).json({ received: true });
}
```

---

### FASE 3: Email Marketing (Día 5-6)

#### 3.1 Crear Cuenta Mailchimp
```bash
# En mailchimp.com
1. Sign up: https://mailchimp.com/signup/
2. Completar perfil
3. Crear "Audience" para Claude Class
4. Ir a Settings > API keys
5. Copiar API Key
6. Agregar a variables de entorno:
   MAILCHIMP_API_KEY=xxx
   MAILCHIMP_AUDIENCE_ID=xxx
```

#### 3.2 Configurar Secuencias de Email
```javascript
// Script para crear segmentos en Mailchimp
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us1", // Cambia según tu servidor Mailchimp
});

// Secuencia de bienvenida (automática cuando se paga)
const welcomeSequence = async (email) => {
  // Email 0: Inmediato - Bienvenida + Primeras lecciones
  await sendEmail({
    to: email,
    template: 'welcome',
    subject: 'Bienvenido a Claude Class!',
    delay: 0,
  });

  // Email 1: Día 3 - ¿Cómo va el curso?
  await sendEmail({
    to: email,
    template: 'day3_check_in',
    subject: 'Continúa tu viaje en Claude Class 🚀',
    delay: 3 * 24 * 60 * 60 * 1000, // 3 días
  });

  // Email 2: Día 7 - Recapitulación semanal
  await sendEmail({
    to: email,
    template: 'week1_recap',
    subject: '📊 Tu progreso en la semana 1',
    delay: 7 * 24 * 60 * 60 * 1000,
  });

  // Email 3: Día 14 - Oportunidad a comunidad
  await sendEmail({
    to: email,
    template: 'community_invite',
    subject: 'Únete a la comunidad exclusiva 👥',
    delay: 14 * 24 * 60 * 60 * 1000,
  });

  // Email 4: Día 30 - Feedback y siguiente nivel
  await sendEmail({
    to: email,
    template: 'day30_feedback',
    subject: 'Estás a mitad de camino! 🎉',
    delay: 30 * 24 * 60 * 60 * 1000,
  });
};
```

#### 3.3 Conectar Mailchimp a Supabase
```typescript
// /pages/api/webhooks/user-signup.ts
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us1",
});

export default async function handler(req, res) {
  const { email, fullName, courseId } = req.body;

  try {
    // Agregar a lista Mailchimp
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fullName.split(' ')[0],
          LNAME: fullName.split(' ')[1] || '',
        },
        tags: ['claude-class-student', `course-${courseId}`],
      }
    );

    // Iniciar secuencia automática
    await sendWelcomeSequence(email);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mailchimp error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

---

### FASE 4: Hosting de Videos (Día 7-8)

#### 4.1 Opción A: Bunny CDN (RECOMENDADO)
```bash
# En bunnycdn.com
1. Sign up: https://bunnycdn.com
2. Crear Pull Zone: claudeclass-videos
3. Crear carpeta para almacenamiento
4. Obtener credenciales en Settings > API

# Pricing:
- Almacenamiento: $0.005/GB/mes (180GB = $0.90/mes)
- Transferencia: $0.01/GB descargado
- Con 100 estudiantes viendo 1GB cada uno: $1/mes
- TOTAL: ~$1.90/mes

# Subir videos:
curl -X PUT https://sy1.b-cdn.net/claudeclass-videos/video1.mp4 \
  -H "AccessKey: YOUR_ACCESS_KEY" \
  -d @video1.mp4

# URL de reproducción:
https://claudeclass-videos.b-cdn.net/video1.mp4
```

#### 4.2 Opción B: Cloudflare R2 (Alternativa)
```bash
# En cloudflare.com
1. Crear cuenta / Ir a R2
2. Crear bucket "claude-class-videos"
3. Configurar acceso público
4. Obtener credenciales de API

# Pricing:
- Almacenamiento: $0.015/GB/mes (180GB = $2.70/mes)
- Transferencia: GRATIS (primer TB/mes)
- TOTAL: ~$2.70/mes
- MÁS ECONÓMICO si hay mucha transferencia

# Subir con AWS CLI:
aws s3 cp video1.mp4 s3://claude-class-videos/ \
  --endpoint-url https://xyz.r2.cloudflarestorage.com
```

#### 4.3 Implementar Player de Videos
```typescript
// /components/VideoPlayer.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function VideoPlayer({ lessonId }) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    // Verificar si usuario está enrolled
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (enrollment) {
      setHasAccess(true);
      // Cargar URL del video desde Bunny CDN
      setVideoUrl(`https://claudeclass-videos.b-cdn.net/lesson-${lessonId}.mp4`);
    }
  };

  const handleVideoProgress = async (currentTime) => {
    // Guardar progreso cada 30 segundos
    if (Math.floor(currentTime) % 30 === 0) {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        watched_seconds: currentTime,
        last_watched_at: new Date(),
      });
    }
  };

  if (!hasAccess) {
    return (
      <div className="bg-red-100 p-4 rounded">
        <p>Necesitas estar inscrito al curso para ver este video.</p>
        <a href="/pricing" className="text-blue-600">Comprar acceso</a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video
        src={videoUrl}
        controls
        width="100%"
        onTimeUpdate={(e) => handleVideoProgress(e.currentTarget.currentTime)}
        style={{ backgroundColor: '#000' }}
      />
      <div className="mt-4">
        <h2>Progreso en este video</h2>
        <div className="w-full bg-gray-200 rounded">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

---

### FASE 5: Dominio y DNS (Día 9)

#### 5.1 Conectar Dominio a Vercel
```bash
# En Namecheap Dashboard
1. Seleccionar dominio claudeclass.com
2. Ir a "Manage"
3. En "Nameservers", seleccionar "Custom DNS"
4. Reemplazar con nameservers de Vercel:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com

# En Vercel Dashboard
1. Proyecto > Settings > Domains
2. Agregar claudeclass.com
3. Vercel verificará la propagación (~5 min)
4. Una vez verificado, SSL automático con Let's Encrypt
```

#### 5.2 Configurar Registros DNS Adicionales
```bash
# En Vercel o Namecheap, según dónde hagas DNS
# Para email (si usas servicio externo):
MX record: mail.zoho.com (si usas Zoho)
SPF record: v=spf1 zoho.com ~all
DKIM: Según configuración de tu proveedor email

# Para verificación de Mailchimp:
TXT record: v=mailchimp ... (si lo requiere)
```

---

## 🔗 Integraciones

### Flujo de Integración Completo

```
USUARIO VISITA LANDING
        ↓
   VIENDO PRICING
        ↓
   HACE CLIC EN "COMPRAR"
        ↓
   STRIPE CHECKOUT ─────→ Validación de tarjeta
        ↓                 ↓
   PAGO EXITOSO         PAGO FALLIDO → Error
        ↓                 ↓
   Webhook a Vercel ← Stripe notification
        ↓
   Crear Usuario en Supabase
        ↓
   Agregar a Enrollments
        ↓
   Agregar a Mailchimp (lista)
        ↓
   Enviar Email #1 (Bienvenida)
        ↓
   Otorgar acceso a Cursos
        ↓
   Redirigir a Dashboard
        ↓
   ESTUDIANTE VE VIDEOS EN BUNNY CDN
        ↓
   Progreso guardado en Supabase
        ↓
   Email #2 (Día 3) → Mailchimp automation
        ↓
   Email #3 (Día 7) → ...
```

### Integraciones de Terceros Necesarias

#### 1. Stripe ↔ Vercel
**Webhook**: https://claudeclass.com/api/webhooks/stripe
**Eventos**: payment_intent.succeeded, payment_intent.failed

#### 2. Mailchimp ↔ Supabase
**Trigger**: Cuando se crea enrollment
**Acción**: Agregar email a Mailchimp, iniciar secuencia

#### 3. Supabase ↔ Bunny CDN
**Relación**: Video URL guardada en tabla `courses`
**Estructura**:
```sql
video_url: https://claudeclass-videos.b-cdn.net/module-1-lesson-1.mp4
```

#### 4. Google Analytics ↔ Vercel
**Tracking**: Conversiones, funnel de compra
```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_ID);
    }

    const handleRouteChange = (url) => {
      if (process.env.NEXT_PUBLIC_GA_ID) {
        window.gtag('pageview', { page_path: url });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

#### 5. Discord ↔ Comunidad
**Integración manual**: Enviar link de Discord en email
```typescript
// Email template
const discordInviteLink = "https://discord.gg/claudeclass";
```

---

## 📊 Flujo de Datos

```
┌──────────────────────────────────────────────────────────────┐
│ USUARIOS                                                      │
├──────────────────────────────────────────────────────────────┤
│ Tabla: users                                                  │
│ ├─ id (UUID)                                                  │
│ ├─ email (unique)                                             │
│ ├─ password_hash (bcrypt)                                     │
│ ├─ full_name                                                  │
│ ├─ created_at                                                 │
│ └─ stripe_customer_id (opcional)                              │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ INSCRIPCIONES (Enrollments)                                   │
├──────────────────────────────────────────────────────────────┤
│ Tabla: enrollments                                            │
│ ├─ id (UUID)                                                  │
│ ├─ user_id (FK → users)                                       │
│ ├─ course_id (FK → courses)                                   │
│ ├─ enrolled_at                                                │
│ ├─ payment_intent_id (Stripe)                                 │
│ ├─ status ('active', 'cancelled')                             │
│ └─ refund_at (si aplica)                                      │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ PROGRESO                                                       │
├──────────────────────────────────────────────────────────────┤
│ Tabla: progress                                               │
│ ├─ id (UUID)                                                  │
│ ├─ user_id (FK → users)                                       │
│ ├─ lesson_id (FK → lessons)                                   │
│ ├─ watched_seconds                                            │
│ ├─ completed (boolean)                                        │
│ ├─ last_watched_at                                            │
│ └─ completion_percentage                                      │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ CONTENIDO (Cursos & Lecciones)                                │
├──────────────────────────────────────────────────────────────┤
│ Tabla: courses                                                │
│ ├─ id (UUID)                                                  │
│ ├─ title                                                      │
│ ├─ description                                                │
│ ├─ price                                                      │
│ ├─ created_at                                                 │
│ └─ updated_at                                                 │
│                                                               │
│ Tabla: lessons                                                │
│ ├─ id (UUID)                                                  │
│ ├─ course_id (FK → courses)                                   │
│ ├─ title                                                      │
│ ├─ video_url (Bunny CDN)                                      │
│ ├─ duration_seconds                                           │
│ ├─ order_index                                                │
│ └─ created_at                                                 │
└──────────────────────────────────────────────────────────────┘
```

### Flujo de Datos en Tiempo Real

```
1. USUARIO COMPRA
   ├─ Stripe crea payment_intent
   ├─ Usuario hace transacción
   └─ Stripe emite evento: payment_intent.succeeded

2. WEBHOOK RECIBE EVENTO
   ├─ Vercel → /api/webhooks/stripe
   ├─ Valida firma del webhook
   └─ Extrae metadata (user_id, course_id)

3. BASE DE DATOS SE ACTUALIZA
   ├─ INSERT en enrollments
   ├─ UPDATE en users (si es primer compra)
   └─ CREATE progress record (inicializa)

4. EMAIL SE DISPARA
   ├─ Obtiene email del usuario
   ├─ Envía a Mailchimp
   ├─ Mailchimp inicia secuencia automática
   └─ Email 1 (inmediato) llega en 5 min

5. ACCESO A CONTENIDO
   ├─ Usuario hace login
   ├─ Check: ¿está en enrollments con status=active?
   ├─ SI: Mostrar videos de Bunny CDN
   ├─ NO: Mostrar página de compra
   └─ Registrar visionado en progress table

6. ANALYTICS SE ACTUALIZA
   ├─ Google Analytics registra eventos
   ├─ Stripe dashboard muestra transacción
   ├─ Supabase Dashboard muestra nueva inscripción
   └─ Mailchimp muestra engagement de email
```

---

## ⏱️ Timeline de Implementación

### SEMANA 1: Infraestructura Base

| Día | Tarea | Duración | Responsable |
|---|---|---|---|
| 1 | Registrar dominio en Namecheap | 30 min | Tú |
| 1 | Crear proyecto en Vercel | 30 min | Tú |
| 1 | Setup inicial Next.js + Tailwind | 2 horas | Dev |
| 2 | Crear cuenta Supabase | 1 hora | Dev |
| 2 | Diseñar y crear tablas SQL | 3 horas | Dev |
| 3 | Landing page básica | 4 horas | Dev |
| 3 | Página de precios | 3 horas | Dev |
| 4 | Crear cuenta Stripe | 1 hora | Tú |
| 4 | Integración Stripe checkout | 3 horas | Dev |
| 5 | Webhook de Stripe | 2 horas | Dev |
| 5 | Testing de pagos | 2 horas | QA |
| **TOTAL SEMANA 1** | | **26 horas** | |

### SEMANA 2: Email + Contenido

| Día | Tarea | Duración | Responsable |
|---|---|---|---|
| 6 | Crear cuenta Mailchimp | 30 min | Tú |
| 6 | Configurar secuencias de email | 3 horas | Copy/Dev |
| 7 | Integración Mailchimp ↔ Supabase | 2 horas | Dev |
| 7 | Crear cuenta Bunny CDN | 30 min | Tú |
| 8 | Upload de videos (180GB) | 6 horas | Técnico |
| 8 | Crear video player | 2 horas | Dev |
| 9 | Integración progreso + videos | 2 horas | Dev |
| 9 | DNS + SSL | 1 hora | Dev |
| **TOTAL SEMANA 2** | | **17.5 horas** | |

### SEMANA 3: Comunidad + Pulido

| Día | Tarea | Duración | Responsable |
|---|---|---|---|
| 10 | Crear servidor Discord | 1 hora | Tú |
| 10 | Configurar roles y canales | 2 horas | Tú |
| 11 | Setup Google Analytics | 1 hora | Dev |
| 11 | Dashboard de admin | 4 horas | Dev |
| 12 | Testing completo de flujos | 4 horas | QA |
| 12 | Optimización de rendimiento | 3 horas | Dev |
| 13 | Copias y contenido final | 4 horas | Copywriter |
| 14 | Preparación de launch | 2 horas | Tú |
| **TOTAL SEMANA 3** | | **21 horas** | |

### RESUMEN TOTAL
- **Horas de desarrollo**: ~44 horas (1 dev a tiempo completo = 1 semana)
- **Horas administrativas**: ~5 horas (tú)
- **Horas de contenido**: ~6 horas (copywriter)
- **Timeline realista**: 3 semanas con equipo de 3 personas
- **Timeline solista**: 6-8 semanas

---

## 📈 Plan de Escalabilidad

### Fase 1: Inicio (0-100 estudiantes)
**Presupuesto**: $5-15/mes

```
Infraestructura actual:
├─ Vercel (gratis)
├─ Supabase (gratis, 500MB)
├─ Bunny CDN ($2-5/mes)
├─ Mailchimp (gratis)
├─ Stripe (comisiones)
└─ Dominio ($0.98/año)
```

### Fase 2: Crecimiento (100-500 estudiantes)
**Presupuesto**: $30-80/mes

```
Agregar:
├─ Supabase Tier Pro ($25/mes, 100GB)
├─ Bunny CDN aumenta a $10-20/mes
├─ Mailchimp Tier Standard ($20/mes, 50K contactos)
├─ Vercel aumenta si supera 100GB BW (pero sigue siendo muy económico)
└─ Soporte dedicado (opcional)
```

**Cambios técnicos**:
```sql
-- Agregar índices para rendimiento
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_lesson_id ON progress(lesson_id);

-- Caching con Redis para sesiones frecuentes
-- Implementar CDN en Vercel para assets estáticos
```

### Fase 3: Escala (500-2000 estudiantes)
**Presupuesto**: $100-300/mes

```
Migrar a:
├─ Supabase Tier Pro+ ($100/mes, 500GB)
├─ Cloudflare R2 ($100/mes, transferencia ilimitada)
├─ Mailchimp Tier Pro ($300/mes pero más automatizaciones)
├─ Stripe sigue igual (2.9% + $0.30)
├─ Vercel sigue siendo económico
├─ Implementar Redis caché ($15/mes, Upstash)
└─ Email dedicado (SendGrid o similar, $10-50/mes)
```

**Cambios técnicos**:
```typescript
// Implementar caching en Next.js
export const getStaticProps = async () => {
  return {
    props: { /* data */ },
    revalidate: 3600 // ISR - regenerate cada hora
  }
}

// Usar Image Optimization de Next.js
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt=""
  width={800}
  height={600}
  priority
  loading="lazy"
/>

// Implementar lazy loading de videos
```

### Fase 4: Profesional (2000+ estudiantes)
**Presupuesto**: $500-1500/mes

```
Arquitectura empresarial:
├─ Base datos: PostgreSQL gerenciada (AWS RDS) $50-200
├─ CDN: Cloudflare Enterprise (custom pricing)
├─ Video: Mux o Wistia ($500+)
├─ Email: SendGrid o Klaviyo ($200-500)
├─ Analytics: Segment ($200)
├─ Observabilidad: DataDog ($300+)
├─ Support: Dedicated engineer ($2000+)
└─ Load balancing, autoscaling, etc.
```

**Cambios técnicos**:
```typescript
// Microservicios
├─ API (Node + Express)
├─ Worker (Stripe webhooks, async tasks)
├─ Search (Elasticsearch)
├─ Analytics (BigQuery)
├─ Email (Bull Queue + workers)
└─ Video streaming (Mux)

// Monitoreo
├─ DataDog (todos los eventos)
├─ Sentry (error tracking)
├─ New Relic (performance)
└─ CloudFlare Analytics
```

### Tabla de Escalabilidad

| Métrica | Fase 1 | Fase 2 | Fase 3 | Fase 4 |
|---|---|---|---|---|
| **Estudiantes** | 0-100 | 100-500 | 500-2000 | 2000+ |
| **Costo/mes** | $5-15 | $30-80 | $100-300 | $500-1500 |
| **Costo/alumno** | $0.15 | $0.06 | $0.05 | $0.25-0.75 |
| **Margen bruto** | 96% | 95% | 94% | 90% |
| **DB Storage** | 500MB | 100GB | 500GB | Unlimited |
| **BW/mes** | 100GB | 500GB | 2TB | Custom |
| **Email contacts** | 500 | 50K | 50K+ | Custom |
| **Support** | Community | Email | Priority | Dedicated |
| **SLA** | Best effort | 99.5% | 99.9% | 99.99% |

---

## 🔒 Seguridad y Compliance

### Medidas de Seguridad Implementadas

#### 1. Autenticación
```typescript
// Supabase Auth integrado
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Signup con email verification
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    emailRedirectTo: 'https://claudeclass.com/auth/callback',
  },
});

// MFA opcional
const { data } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
});
```

#### 2. Encriptación
```typescript
// Passwords: bcrypt (automático en Supabase)
// Datos sensibles: AES-256 en variables de entorno
// Comunicación: TLS 1.3 (HTTPS)

// Encriptar datos en Supabase (si necesario)
import crypto from 'crypto';

const encryptField = (plaintext: string, key: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key),
    iv
  );
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};
```

#### 3. Rate Limiting
```typescript
// Usar Vercel Middleware
import { rateLimit } from '@/utils/rate-limit';

export async function middleware(request) {
  const limit = await rateLimit(request);
  if (!limit.success) {
    return new Response('Too many requests', { status: 429 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

#### 4. GDPR Compliance
```typescript
// Derecho al olvido
export async function deleteUserData(userId: string) {
  // Eliminar datos de Supabase
  await supabase.from('users').delete().eq('id', userId);
  await supabase.from('enrollments').delete().eq('user_id', userId);

  // Eliminar de Mailchimp
  await mailchimp.lists.deleteListMember(
    process.env.MAILCHIMP_AUDIENCE_ID,
    user.email
  );

  // Anonimizar datos en Stripe
  await stripe.customers.del(user.stripe_customer_id);

  // Log de eliminación para compliance
  await logComplianceEvent({
    action: 'user_data_deletion',
    userId,
    timestamp: new Date(),
  });
}

// Exportar datos del usuario
export async function getUserData(userId: string) {
  const user = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  const enrollments = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId);

  const progress = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId);

  return {
    user: user.data,
    enrollments: enrollments.data,
    progress: progress.data,
    exported_at: new Date(),
  };
}
```

#### 5. CCPA Compliance
```typescript
// Banner de privacidad
export function PrivacyBanner() {
  return (
    <div className="fixed bottom-0 bg-gray-900 text-white p-4">
      <p>Utilizamos cookies para mejorar tu experiencia.</p>
      <button onClick={acceptCookies}>Aceptar</button>
      <a href="/privacy">Política de Privacidad</a>
    </div>
  );
}
```

### Variables de Entorno (NO COMMITEAR NUNCA)
```bash
# .env.local (gitignored)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

MAILCHIMP_API_KEY=xxx
MAILCHIMP_AUDIENCE_ID=xxx

BUNNY_ACCESS_KEY=xxx
BUNNY_STORAGE_ZONE=xxx

# Nunca en .env.local:
# - Contraseñas de base de datos
# - API keys privadas
# - Secrets de OAuth
```

### Auditoría y Monitoreo
```typescript
// Logging de eventos sensibles
export async function logSecurityEvent(event: {
  type: string;
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
}) {
  await supabase
    .from('security_logs')
    .insert([event]);

  // Si es evento sospechoso, alertar
  if (event.type === 'failed_login_attempt') {
    // Limitar reintentos
    const attempts = await countFailedAttempts(event.ip);
    if (attempts > 5) {
      // Bloquear IP temporalmente
      await blockIP(event.ip);
    }
  }
}
```

---

## 🚀 Checklist de Lanzamiento

### Antes del Lanzamiento
- [ ] Dominio registrado y DNS configurado
- [ ] SSL certificate activo (verificar https://)
- [ ] Landing page completa y optimizada
- [ ] Página de precios con descripciones claras
- [ ] Checkout de Stripe testing completo
- [ ] Emails de bienvenida probados
- [ ] Videos subidos a Bunny CDN
- [ ] Player de videos funcional
- [ ] Autenticación de usuarios completa
- [ ] Dashboard de usuario funcional
- [ ] Discord server configurado
- [ ] Google Analytics implementado
- [ ] Política de Privacidad actualizada
- [ ] Términos de Servicio actualizados
- [ ] Suporte via email configurado
- [ ] Backup automático de Supabase
- [ ] Monitoreo de errores (Sentry) configurado

### Día del Lanzamiento
- [ ] Realizar compra de prueba
- [ ] Verificar recepción de email
- [ ] Confirmar acceso a videos
- [ ] Probar flujo completo en móvil
- [ ] Monitorear dashboard de Stripe
- [ ] Responder inquiries inmediatamente
- [ ] Anunciar en redes sociales
- [ ] Invitar a primeros usuarios beta

### Post-Lanzamiento (Primeras 2 semanas)
- [ ] Recopilar feedback de primeros alumnos
- [ ] Optimizar landing page basado en datos
- [ ] Mejorar emails según open rates
- [ ] Monitorear rendimiento de videos
- [ ] Revisar y responder comentarios

---

## 📞 Soporte y Recursos

### Recursos de Documentación
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Mailchimp: https://mailchimp.com/help/
- Bunny CDN: https://support.bunny.net

### Canales de Soporte
- Email: support@claudeclass.com
- Discord: https://discord.gg/claudeclass
- Community: Foro en Discord
- Documentación: https://docs.claudeclass.com

### Contactos Importantes
- Stripe Support: support@stripe.com
- Supabase Support: support@supabase.com
- Mailchimp Support: support@mailchimp.com
- Bunny CDN Support: support@bunny.net

---

## 📋 Resumen Final

### ✅ RECOMENDACIÓN FINAL

**Opción elegida**: Stack Personalizado (Vercel + Supabase + Stripe + Mailchimp + Bunny CDN)

**Razones**:
1. **Costo óptimo**: $5-15/mes vs $19 (SendOwl)
2. **Márgenes**: 96% vs 95.6% (SendOwl) vs 90% (Gumroad)
3. **Control total**: Tu branding, tus datos, tus integraciones
4. **Escalabilidad**: Crece sin costos exponenciales
5. **Flexibilidad**: Customiza exactamente lo que necesitas

### Costos Finales (Mes 1-2)
| Item | Costo |
|---|---|
| Dominio (primer año) | $0.98 |
| Hosting (Vercel) | $0 |
| Base de datos (Supabase) | $0 |
| Videos (Bunny CDN) | $2-5 |
| Email (Mailchimp) | $0 |
| Community (Discord) | $0 |
| Analytics (Google) | $0 |
| **TOTAL** | **$2.98-5.98** |

### Costos Recurrentes (Mes 3+)
| Item | Costo |
|---|---|
| Dominio (amortizado/año) | $0.74 |
| Hosting (Vercel) | $0 |
| Base de datos (Supabase) | $0 |
| Videos (Bunny CDN) | $2-5 |
| Email (Mailchimp) | $0 |
| Community (Discord) | $0 |
| Analytics (Google) | $0 |
| **TOTAL** | **$2.74-5.74** |

**MÁS**: 2.9% + $0.30 por cada transacción en Stripe

### Con 50 ventas/mes ($99 cada una):
- **Ingresos**: $4,950
- **Gastos fijos**: $5.74
- **Gastos variables**: $173.70 (2.9% + $0.30 × 50)
- **Costo total**: $179.44
- **Margen**: 96.4%
- **Ganancia neta**: $4,770.56

---

**Documento actualizado**: 26 de marzo de 2026
**Válido hasta**: 31 de diciembre de 2026
**Revisión próxima**: Junio 2026

