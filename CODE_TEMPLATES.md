# 💻 Code Templates Listos para Usar

**Código copiable y configurable para Claude Class**

---

## 🏠 Template 1: Landing Page Completa

```typescript
// src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const testimonials = [
    {
      author: 'Juan García',
      role: 'Desarrollador',
      text: 'Excelente curso, aprendí mucho en poco tiempo',
      rating: 5,
    },
    {
      author: 'María López',
      role: 'PM Tech',
      text: 'Muy práctico, con ejercicios reales',
      rating: 5,
    },
    {
      author: 'Carlos Martínez',
      role: 'Entrepreneur',
      text: 'Cambió mi forma de trabajar',
      rating: 5,
    },
  ];

  return (
    <>
      <Head>
        <title>Claude Class - Domina la IA en 30 Horas</title>
        <meta name="description" content="Curso completo sobre Claude AI" />
        <meta property="og:title" content="Claude Class" />
        <meta property="og:description" content="Domina la IA en 30 horas" />
      </Head>

      <div className="bg-gradient-to-br from-slate-950 to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Claude Class</h1>
            <div className="flex gap-4">
              <Link href="#pricing" className="text-slate-300 hover:text-white">
                Precios
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Comprar
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Domina <span className="text-blue-400">Claude AI</span> en 30 Horas
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                El curso más completo sobre inteligencia artificial. Aprende desde cero
                hasta proyectos avanzados con ejercicios prácticos.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/pricing"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                  Empezar Ahora
                </Link>
                <button className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg font-bold hover:bg-blue-400/10">
                  Ver Demo
                </button>
              </div>
              <p className="text-slate-400 mt-4">✅ Acceso de por vida • ✅ 30+ horas • ✅ Certificado</p>
            </div>
            <div className="bg-slate-800 rounded-lg h-64 flex items-center justify-center">
              <div className="text-6xl">🤖</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-800/50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              ¿Qué Aprenderás?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🎬', title: '30+ Horas Video', desc: 'Contenido profesional en 1080p' },
                { icon: '💻', title: 'Ejercicios Prácticos', desc: 'Proyectos reales que puedes usar' },
                { icon: '👥', title: 'Comunidad', desc: 'Conecta con otros estudiantes' },
                { icon: '📈', title: 'Casos de Uso', desc: 'Aplicaciones reales de Claude' },
                { icon: '🔧', title: 'Herramientas', desc: 'Integra Claude en tus proyectos' },
                { icon: '🎓', title: 'Certificado', desc: 'Demuestra tu expertise' },
              ].map((feature) => (
                <div key={feature.title} className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Lo que dicen nuestros estudiantes
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-slate-800 p-6 rounded-lg border border-slate-700"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">{testimonial.text}</p>
                  <div>
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Comienza Tu Transformación Hoy
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Miles de estudiantes ya están aprendiendo. ¿Esperas para comenzar?
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50"
            >
              Ver Precios
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <p className="text-slate-400">© 2026 Claude Class. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-slate-400 hover:text-white">
                Privacidad
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white">
                Términos
              </a>
              <a href="https://discord.gg/claudeclass" className="text-slate-400 hover:text-white">
                Discord
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
```

---

## 💳 Template 2: Página de Precios con Botón de Compra

```typescript
// src/pages/pricing.tsx
import Head from 'next/head';
import { useState } from 'react';
import Stripe from '@stripe/stripe-js';
import { useUser } from '@/hooks/useAuth';

const stripePromise = Stripe.loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Pricing() {
  const { user, loading } = useUser();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [email, setEmail] = useState(user?.email || '');

  const handleCheckout = async () => {
    if (!email) {
      alert('Por favor ingresa tu email');
      return;
    }

    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: 'claude-class-1',
          userEmail: email,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error al procesar. Por favor intenta de nuevo.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const plans = [
    {
      name: 'Plan Completo',
      price: 99,
      description: 'Acceso de por vida a todo el contenido',
      features: [
        '✅ 30+ horas de video',
        '✅ Ejercicios prácticos',
        '✅ Acceso a comunidad Discord',
        '✅ Certificado al terminar',
        '✅ Updates de por vida',
        '✅ Soporte por email',
      ],
      highlighted: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Precios - Claude Class</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Invierte en tu Futuro
          </h1>

          <div className="grid gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border-2 p-8 ${
                  plan.highlighted
                    ? 'border-blue-500 bg-blue-500/10 shadow-2xl'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-300 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-400"> USD (pago único)</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-slate-300">
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  {!user ? (
                    <>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                      />
                      <button
                        onClick={handleCheckout}
                        disabled={checkoutLoading}
                        className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                      >
                        {checkoutLoading ? 'Procesando...' : 'Comprar Ahora'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                      {checkoutLoading ? 'Procesando...' : 'Comprar Ahora'}
                    </button>
                  )}
                </div>

                <p className="text-center text-slate-400 text-sm mt-4">
                  Garantía de 30 días de dinero de vuelta
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">¿Preguntas?</h3>
            <p className="text-slate-300">
              Envíanos un email a{' '}
              <a href="mailto:hola@claudeclass.com" className="text-blue-400 hover:underline">
                hola@claudeclass.com
              </a>{' '}
              o únete a nuestro{' '}
              <a
                href="https://discord.gg/claudeclass"
                className="text-blue-400 hover:underline"
              >
                Discord
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## 🎥 Template 3: Video Player con Progreso

```typescript
// src/components/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/hooks/useAuth';
import { getSupabaseClient } from '@/lib/supabase';

interface VideoPlayerProps {
  lessonId: string;
  videoUrl: string;
  duration: number;
}

export default function VideoPlayer({
  lessonId,
  videoUrl,
  duration,
}: VideoPlayerProps) {
  const { user } = useUser();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const supabase = getSupabaseClient();

  // Guardar progreso cada 30 segundos o al final
  const saveProgress = async (currentTime: number) => {
    if (!user || !videoRef.current) return;

    const completionPercentage = Math.round((currentTime / duration) * 100);
    setProgress(completionPercentage);

    // Guardar en BD
    try {
      await supabase.from('progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        watched_seconds: Math.floor(currentTime),
        completion_percentage: completionPercentage,
        completed: completionPercentage >= 90,
        last_watched_at: new Date(),
      });

      setLastSaved(Date.now());

      if (completionPercentage >= 90) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    const now = Date.now();

    // Guardar cada 30 segundos
    if (!lastSaved || now - lastSaved > 30000) {
      saveProgress(currentTime);
    }

    setProgress(Math.round((currentTime / duration) * 100));
  };

  const handleEnded = () => {
    if (videoRef.current) {
      saveProgress(videoRef.current.currentTime);
      setIsCompleted(true);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progreso del video</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Completion Status */}
      {isCompleted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          ✅ ¡Video completado! Continúa con la siguiente lección.
        </div>
      )}
    </div>
  );
}
```

---

## 🔐 Template 4: Hook de Autenticación

```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    // Verificar usuario actual
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/');
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
}

export function useUser() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // El componente que usa esto debe manejar redirección
    }
  }, [loading, user]);

  return { user, loading };
}
```

---

## 📧 Template 5: Email Automático

```typescript
// src/lib/mailchimp.ts
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export const addToMailchimp = async (
  email: string,
  firstName?: string,
  lastName?: string
) => {
  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID || '',
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
        tags: ['claude-class', 'student'],
      }
    );
  } catch (error) {
    console.error('Mailchimp error:', error);
    throw error;
  }
};

export const sendAutomationEmail = async (email: string) => {
  try {
    // Mailchimp automation se dispara automáticamente
    // basado en tags/segmentación
    // No necesitas llamada manual si tienes automation configurada
    console.log(`Automation triggered for ${email}`);
  } catch (error) {
    console.error('Error triggering automation:', error);
    throw error;
  }
};
```

---

## 🔄 Template 6: Integración Completa Checkout + Webhook

```typescript
// src/pages/api/webhooks/stripe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { addToMailchimp } from '@/lib/mailchimp';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    return res.status(400).send('Missing stripe-signature');
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send('Webhook Error');
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { courseId, userEmail } = paymentIntent.metadata;

        // 1. Obtener o crear usuario
        let { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .single();

        if (!user) {
          const { data: newUser } = await supabase
            .from('users')
            .insert([{ email: userEmail }])
            .select('id')
            .single();
          user = newUser;
        }

        // 2. Crear inscripción
        await supabase.from('enrollments').insert({
          user_id: user?.id,
          course_id: courseId,
          payment_intent_id: paymentIntent.id,
          status: 'active',
        });

        // 3. Agregar a Mailchimp
        await addToMailchimp(userEmail);

        console.log(`✅ Enrollment created for ${userEmail}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error(
          `❌ Payment failed: ${paymentIntent.metadata?.userEmail}`
        );
        break;
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal error' });
  }
}
```

---

## 🎯 Template 7: Dashboard de Estudiante

```typescript
// src/pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useAuth';
import { getSupabaseClient } from '@/lib/supabase';

interface Course {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
}

export default function Dashboard() {
  const { user, loading } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({ totalHours: 0, completion: 0 });

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      // Obtener cursos inscritos
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (!enrollments) return;

      // Obtener detalles de cursos
      const courseIds = enrollments.map((e: any) => e.course_id);
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);

      if (courseData) {
        // Obtener progreso
        const { data: progressData } = await supabase
          .from('progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id);

        const completed = progressData?.filter((p: any) => p.completed).length || 0;
        const total = progressData?.length || 0;

        setCourses(
          courseData.map((course: any) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            totalLessons: course.video_count,
            completedLessons: completed,
          }))
        );

        setStats({
          totalHours: courseData.reduce(
            (sum: number, c: any) => sum + (c.total_duration_hours || 0),
            0
          ),
          completion: total > 0 ? Math.round((completed / total) * 100) : 0,
        });
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-center py-20">Por favor inicia sesión</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <p className="text-gray-600">Horas Aprendidas</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalHours}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <p className="text-gray-600">Progreso General</p>
          <p className="text-3xl font-bold text-green-600">{stats.completion}%</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <p className="text-gray-600">Cursos Inscritos</p>
          <p className="text-3xl font-bold text-purple-600">{courses.length}</p>
        </div>
      </div>

      {/* Courses */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Mis Cursos</h2>
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  {course.completedLessons}/{course.totalLessons} lecciones completadas
                </span>
                <span className="text-sm font-medium">
                  {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(course.completedLessons / course.totalLessons) * 100}%`,
                  }}
                />
              </div>
            </div>

            <a
              href={`/course/${course.id}`}
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continuar Aprendiendo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔑 Template 8: .env.local.example

```bash
# Base de datos
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Pagos
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx

# Email
MAILCHIMP_API_KEY=your-mailchimp-key
MAILCHIMP_AUDIENCE_ID=your-audience-id
MAILCHIMP_SERVER=us1

# Videos
BUNNY_CDN_HOSTNAME=your-subdomain.b-cdn.net
BUNNY_ACCESS_KEY=your-bunny-key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🧪 Template 9: Testing Básico

```typescript
// __tests__/pages/pricing.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pricing from '@/pages/pricing';
import * as checkoutApi from '@/pages/api/checkout';

jest.mock('@/pages/api/checkout');

describe('Pricing Page', () => {
  it('renders pricing options', () => {
    render(<Pricing />);
    expect(screen.getByText('Invierte en tu Futuro')).toBeInTheDocument();
  });

  it('handles checkout', async () => {
    (checkoutApi.default as jest.Mock).mockResolvedValue({
      url: 'https://checkout.stripe.com/session/test',
    });

    render(<Pricing />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const buyButton = screen.getByText('Comprar Ahora');
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(checkoutApi.default).toHaveBeenCalled();
    });
  });
});
```

---

## 📱 Template 10: next.config.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['claudeclass-videos.b-cdn.net'],
  },
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
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

module.exports = nextConfig;
```

---

**Copia, adapta y usa estos templates. Son production-ready.**

Última actualización: 26 de marzo de 2026

