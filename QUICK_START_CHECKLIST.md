# ⚡ Quick Start Checklist - Claude Class

**Tu guía rápida de 30 días para lanzar el curso**

---

## 📌 RESUMEN EJECUTIVO (Lee esto primero)

**Stack elegido**: Vercel + Supabase + Stripe + Mailchimp + Bunny CDN
**Costo**: $5-15/mes
**Margen de ganancia**: 96%
**Timeline**: 3-4 semanas
**Equipo necesario**: 1 dev + 1 copywriter (o haz todo tú)

---

## 📅 SEMANA 1: Infraestructura

### Día 1: Registros y Cuentas (2 horas)
- [ ] Registrar dominio en Namecheap (`claudeclass.com`)
  - Presupuesto: $0.98 año 1
  - Guardar credenciales en 1Password
- [ ] Crear cuenta Vercel (vercel.com)
  - Conectar GitHub
  - Crear proyecto vacío
- [ ] Crear cuenta Supabase (supabase.com)
  - Crear proyecto "claude-class"
  - Region: us-east-1
  - Guardar credenciales
- [ ] Crear cuenta Stripe (stripe.com)
  - Completar perfil
  - Obtener API keys
- [ ] Crear cuenta Mailchimp (mailchimp.com)
  - Crear "Audience"
  - Obtener API key
- [ ] Crear cuenta Bunny CDN (bunnycdn.com)
  - Crear storage zone
  - Obtener credenciales

**Checklist completado**: ✅ Todas las cuentas creadas

---

### Día 2-3: Setup Inicial Frontend (6 horas)
- [ ] Clonar/preparar repositorio
  ```bash
  git clone https://github.com/your-repo/claude-class.git
  cd claude-class
  npm install
  ```
- [ ] Crear archivo `.env.local` con variables
- [ ] Setup Tailwind CSS
- [ ] Crear estructura de carpetas
- [ ] Crear `pages/index.tsx` (landing básica)
- [ ] Crear `pages/pricing.tsx`
- [ ] Crear `pages/dashboard.tsx` (básico)
- [ ] Verificar que `npm run dev` funciona

**Deliverable**: Landing y pricing pages funcionales

---

### Día 4: Supabase Setup (3 horas)
- [ ] Copiar SQL de tablas en documento técnico
- [ ] Ejecutar en Supabase SQL Editor
- [ ] Crear índices para performance
- [ ] Configurar Row Level Security (RLS)
- [ ] Probar conexión desde Next.js
  ```typescript
  npm install @supabase/supabase-js
  ```

**Deliverable**: Base de datos lista con 6 tablas

---

### Día 5: Stripe Integration (4 horas)
- [ ] Crear `pages/api/checkout.ts`
- [ ] Implementar Stripe.js en frontend
- [ ] Crear botón "Comprar" en pricing page
- [ ] Probar con tarjeta de prueba (4242 4242 4242 4242)
- [ ] Crear webhook handler: `pages/api/webhooks/stripe.ts`
- [ ] Probar localmente con `stripe listen`

**Deliverable**: Flujo de compra completo (pagos en test mode)

---

## 📧 SEMANA 2: Email y Contenido

### Día 6: Mailchimp Setup (2 horas)
- [ ] Crear secuencias de email en Mailchimp
  - Email 1 (hora 0): Bienvenida
  - Email 2 (día 3): Check-in
  - Email 3 (día 7): Resumen semanal
  - Email 4 (día 14): Invitación comunidad
  - Email 5 (día 30): Celebración
- [ ] Obtener plantillas HTML
- [ ] Conectar Mailchimp API a webhook

**Deliverable**: Sistema de email automático configurado

---

### Día 7-8: Videos y Bunny CDN (8 horas)
- [ ] Preparar 30+ horas de video en 1080p
  - Conversión si es necesario (ffmpeg)
  - Nombres de archivo estandarizados
- [ ] Crear cuenta Bunny CDN
- [ ] Subir videos a Bunny Storage
  ```bash
  ./scripts/upload-videos.sh
  ```
- [ ] Verificar URLs públicas funcionan
- [ ] Guardar metadata en Supabase

**Deliverable**: Todos los videos accesibles desde Bunny CDN

---

### Día 9: Video Player (4 horas)
- [ ] Crear componente `VideoPlayer.tsx`
- [ ] Implementar control de acceso (solo usuarios inscritos)
- [ ] Agregar tracking de progreso
- [ ] Crear página `pages/lesson/[id].tsx`
- [ ] Probar reproducción en múltiples dispositivos

**Deliverable**: Video player funcional con progreso guardado

---

## 🔐 SEMANA 3: Autenticación y Polish

### Día 10: Autenticación (4 horas)
- [ ] Setup Supabase Auth
- [ ] Crear `pages/auth/login.tsx`
- [ ] Crear `pages/auth/signup.tsx`
- [ ] Implementar middleware de autenticación
- [ ] Crear componente `useAuth()` hook
- [ ] Probar login/signup/logout

**Deliverable**: Sistema de autenticación completo

---

### Día 11: Dashboard Estudiante (4 horas)
- [ ] Crear `pages/dashboard.tsx`
- [ ] Mostrar cursos inscritos
- [ ] Mostrar progreso por curso
- [ ] Mostrar próximas lecciones
- [ ] Agregar datos de estudiante

**Deliverable**: Dashboard funcional para estudiantes

---

### Día 12: Pulido y Testing (6 horas)
- [ ] Testing de flujo completo
  - Visitante → Pricing → Compra → Email → Dashboard → Ver video
- [ ] Optimizar velocidad de carga
- [ ] Mobile responsiveness
- [ ] SEO básico (meta tags, sitemap)
- [ ] Pruebas de pago real en modo test
- [ ] Verificar emails de bienvenida

**Deliverable**: Producto completamente funcional

---

### Día 13-14: DNS y Lanzamiento (3 horas)
- [ ] Conectar dominio en Vercel
- [ ] Cambiar nameservers en Namecheap
- [ ] Esperar propagación DNS (5-30 min)
- [ ] Verificar SSL automático
- [ ] Cambiar Stripe a modo producción
- [ ] Actualizar URLs en Mailchimp
- [ ] Hacer compra real de prueba

**Deliverable**: Sitio en vivo en claudeclass.com

---

## 🚀 SEMANA 4: Post-Lanzamiento

### Día 15-21: Mejoras Iniciales
- [ ] Recolectar feedback de primeros clientes
- [ ] Optimizar landing page basado en datos
- [ ] Agregar más testimonios
- [ ] Crear página FAQ
- [ ] Mejorar copias
- [ ] Agregar certificado de finalización
- [ ] Setup de Discord comunidad

**Deliverable**: Producto pulido con feedback implementado

---

## 💻 SCRIPTS ÚTILES

### Script 1: Setup Rápido
```bash
#!/bin/bash
# setup.sh

echo "🚀 Iniciando setup de Claude Class..."

# Instalar dependencias
npm install
npm install @supabase/supabase-js stripe @mailchimp/mailchimp_marketing

# Crear estructura
mkdir -p src/{pages,components,utils,lib,types,hooks,styles}
mkdir -p src/pages/api/webhooks
mkdir -p public/images

# Crear .env.local
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "⚠️  Edita .env.local con tus credenciales"
fi

# Vercel CLI
npm install -g vercel

echo "✅ Setup completado. Ejecuta 'npm run dev' para comenzar"
```

### Script 2: Deploy a Producción
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Desplegando a producción..."

# Verificar tests
npm run test

# Build
npm run build

# Deployar
vercel --prod

# Verificar
echo "✅ Deployment completado"
echo "🌐 URL: https://claudeclass.com"
```

### Script 3: Subir Videos
```bash
#!/bin/bash
# upload-videos.sh

BUNNY_ACCESS_KEY="YOUR_KEY"
BUNNY_HOSTNAME="claudeclass-videos.b-cdn.net"
VIDEOS_DIR="./videos"

for video in $VIDEOS_DIR/*.mp4; do
  filename=$(basename "$video")
  echo "Subiendo $filename..."

  curl -X PUT \
    "https://${BUNNY_HOSTNAME}/${filename}" \
    -H "AccessKey: ${BUNNY_ACCESS_KEY}" \
    -d @"$video"

  echo "✅ $filename subido"
done

echo "✅ Todos los videos subidos"
```

---

## 💰 DESGLOSE DE COSTOS FINALES

### Inversión Inicial (Mes 1)
```
Dominio (Namecheap):     $0.98
Supabase:               $0
Vercel:                 $0
Bunny CDN (180GB):      $2-5
Mailchimp:              $0
Stripe:                 $0 (solo comisión)
────────────────────────────
TOTAL FIJO:            $2.98-5.98
+ Comisión Stripe: 2.9% + $0.30 por venta
```

### Mes 2+
```
Dominio (amortizado):   $0.74
Resto:                  $2-5
────────────────────────────
TOTAL FIJO:            $2.74-5.74
```

### Ejemplo: 50 ventas/mes a $99
```
Ingresos:              $4,950
Gastos fijos:          $5.74
Comisión Stripe:       $173.70
Costo total:           $179.44
────────────────────────────
MARGEN NETO:           96.4%
GANANCIA NETA:         $4,770.56
```

---

## 🎯 KPIs A MONITOREAR

### Día 1-7
- [ ] Landing page creada
- [ ] Pricing page funcional
- [ ] Checkout funcionando

### Día 8-14
- [ ] Videos subidos
- [ ] Emails automáticos
- [ ] Dashboard del estudiante

### Día 15-21
- [ ] Primeros clientes pagados
- [ ] Email open rate > 30%
- [ ] Tiempo de carga < 2s

### Mes 1+
- [ ] Conversion rate (visitors → buyers)
- [ ] Customer acquisition cost
- [ ] Email engagement rate
- [ ] Video completion rate
- [ ] Net promoter score

---

## 🔧 TROUBLESHOOTING RÁPIDO

### "El checkout no funciona"
- [ ] Verificar API keys en .env.local
- [ ] Verificar URLs en Stripe webhook
- [ ] Revisar console del navegador
- [ ] Probar con tarjeta 4242 4242 4242 4242

### "Los emails no se envían"
- [ ] Verificar API key de Mailchimp
- [ ] Verificar audience ID
- [ ] Revisar logs en Mailchimp
- [ ] Probar webhook con Postman

### "Videos no se ven"
- [ ] Verificar URLs de Bunny CDN
- [ ] Verificar access key de Bunny
- [ ] Probar en incógnito (caché)
- [ ] Verificar CORS settings

### "Base de datos lenta"
- [ ] Agregar índices en Supabase
- [ ] Verificar queries lentas
- [ ] Usar connection pooling
- [ ] Considerar caché con Redis

---

## 📱 CHECKLIST DE LANZAMIENTO FINAL

### 48 Horas Antes
- [ ] Revisar todos los links
- [ ] Probar flujo completo 3 veces
- [ ] Verificar móvil
- [ ] Revisar copias (sin typos)
- [ ] Verificar HTTPS en dominio
- [ ] Backup de base de datos

### Día del Lanzamiento
- [ ] Realizar compra real de prueba
- [ ] Verificar email de confirmación
- [ ] Verificar acceso a videos
- [ ] Monitorear logs de errores
- [ ] Responder inquiries rápidamente

### Primeras 24 Horas
- [ ] Publicar en redes sociales
- [ ] Enviar a lista de espera
- [ ] Responder preguntas
- [ ] Recolectar feedback
- [ ] Estar alerta a errores

---

## 📞 SOPORTE RÁPIDO

| Problema | Contacto | Tiempo Respuesta |
|---|---|---|
| Stripe | support@stripe.com | 2-4 horas |
| Supabase | support@supabase.com | 24 horas |
| Vercel | support@vercel.com | 24 horas |
| Bunny CDN | support@bunny.net | 4-8 horas |
| Mailchimp | support@mailchimp.com | 1-2 días |

---

## ✅ ESTADO ACTUAL (Después de completar)

### Después del Día 5
- [ ] Landing page en vivo
- [ ] Pricing page con checkout
- [ ] Base de datos funcionando

### Después del Día 9
- [ ] Videos subidos y accesibles
- [ ] Player de videos funcional

### Después del Día 14
- [ ] **SITIO EN VIVO EN PRODUCCIÓN**
- [ ] Dominio propio configurado
- [ ] Primer cliente potencial

### Después del Día 21
- [ ] Primeros pagos procesados
- [ ] Sistema de email funcionando
- [ ] Dashboard de estudiante activo

---

## 🎓 Próximos Pasos (Después del Lanzamiento)

**Semana 5-8**: Crecimiento
- [ ] Implementar referral program
- [ ] Crear landing pages específicas
- [ ] AB testing en copy/precios
- [ ] Expandir contenido (bonus lessons)
- [ ] Community management activo

**Mes 2+**: Escalabilidad
- [ ] Implementar coaching/mentoría
- [ ] Crear programa de afiliados
- [ ] Lanzar versión grupo/corporativa
- [ ] Agregar certificado profesional
- [ ] Integraciones con plataformas

---

## 📊 Métricas de Éxito

✅ **Éxito**:
- ROI > 50% en mes 1
- 20+ alumnos en mes 1
- Email open rate > 25%
- Video completion rate > 60%

⚠️ **Requiere mejora**:
- Menos de 10 alumnos
- Email open rate < 20%
- Video completion < 40%

---

## 🎉 ¡Felicidades!

Después de completar este checklist, tendrás:
- ✅ Curso completamente funcional
- ✅ Sistema de pagos automático
- ✅ Email marketing automático
- ✅ Comunidad de estudiantes
- ✅ Analytics y tracking
- ✅ Todo por $5-15/mes

**Tu margen de ganancia**: 96%+

---

**Última actualización**: 26 de marzo de 2026
**Tiempo total de implementación**: 3-4 semanas
**Presupuesto total**: $10-30 primer mes

¡Que tengas éxito con Claude Class! 🚀

