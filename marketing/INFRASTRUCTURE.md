# Claude Class - Plan de Infraestructura Completa

## 📊 Overview

**Presupuesto**: $0-50/mes
**Dominio**: Nuevo (a registrar)
**Stack**: Vercel + Mailchimp + Stripe + Gumroad + YouTube

---

## 💰 DESGLOSE DE COSTOS

| Servicio | Costo | Notas |
|----------|-------|-------|
| **Dominio** | $12/año | GoDaddy, Namecheap |
| **Vercel** | $0 | Hosting landing pages (gratis) |
| **Mailchimp** | $0 | Email hasta 500 contactos (gratis) |
| **Stripe** | $0 base | Comisión 2.9% + $0.30 por transacción |
| **Gumroad** | $0 base | Comisión 10% (alternativa a Stripe) |
| **YouTube** | $0 | Hosting videos (gratis) |
| **Google Drive** | $0 | Backup contenido (gratis 15GB) |
| **Canva** | $0-120/año | Opcional, para diseño |
| **Buffer/Later** | $0-15/mes | Opcional, para scheduling social |
| **TOTAL MÍNIMO** | $1/mes | Solo dominio |
| **TOTAL RECOMENDADO** | $20-30/mes | + Buffer para social |

---

## 🏗️ ARQUITECTURA TÉCNICA

```
┌─────────────────────────────────────────────────────────┐
│                    TU DOMINIO                           │
│                  (claude-class.com)                     │
└──────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼────┐      ┌─────▼──────┐    ┌─────▼──────┐
    │ Vercel │      │  Gumroad   │    │  Mailchimp │
    │ (Site) │      │  (Tienda)  │    │  (Email)   │
    └────────┘      └────────────┘    └────────────┘
        │                  │                  │
    index.html        Carrito            Secuencias
    pricing.html      Checkout          Automáticas
    one-pager.html    Procesamiento

        ┌──────────────────┴──────────────────┐
        │                                     │
    ┌───▼────────┐                  ┌───────▼────┐
    │   Stripe   │                  │  YouTube   │
    │  (Pagos)   │                  │  (Videos)  │
    └────────────┘                  └────────────┘

    Optional: Integración con Zapier/IFTTT para automatización
```

---

## 🔧 SETUP PASO A PASO

### PASO 1: Registrar Dominio ($12/año)
**Duración**: 15 minutos

**Opción A: Namecheap** (recomendado - más barato)
```
1. Ir a namecheap.com
2. Buscar "claudeclass.com" (o similar)
3. Agregar al carrito
4. Comprar ($8.88/año + impuestos)
5. Confirmar email
```

**Opción B: GoDaddy**
```
1. Ir a godaddy.com
2. Buscar dominio
3. Comprar (~$12.99/año)
```

**Opciones de nombre**:
- claudeclass.com (si está disponible)
- claudelearn.com
- leadgenclass.com
- automationclass.com
- tu-nombre-class.com

✅ **Resultado**: Dominio registrado + acceso a DNS

---

### PASO 2: Configurar Vercel (Landing Pages) - GRATIS
**Duración**: 30 minutos
**Costo**: $0

**Instrucciones**:

```bash
# 1. Crear cuenta en vercel.com
# (Opción: usar GitHub, Google o email)

# 2. Conectar tu repositorio
# - Click "New Project"
# - Selecciona tu repo CLAUDE-CODE-
# - Vercel auto-detecta Next.js

# 3. Deploy automático
# - Vercel despliega automáticamente
# - URL: https://proyecto-nombre.vercel.app

# 4. Conectar dominio
# - Ir a Settings → Domains
# - Agregar tu dominio (claudeclass.com)
# - Vercel te da instrucciones DNS
```

**Verificar DNS en Namecheap**:
```
1. Ir a Namecheap.com → Dashboard
2. Seleccionar tu dominio
3. Ir a "Advanced DNS"
4. Agregar registros CNAME que Vercel proporciona
5. Esperar 24-48 horas propagación
```

✅ **Resultado**: Landing pages en tu dominio propio

---

### PASO 3: Email Marketing (Mailchimp) - GRATIS
**Duración**: 20 minutos
**Costo**: $0 hasta 500 contactos

**Instrucciones**:

```
1. Crear cuenta en mailchimp.com
   - Email: tu@email.com
   - Password: segura

2. Crear lista de audiencia
   - Click "Audience" → "Create Audience"
   - Nombre: "Claude Class Students"
   - Descripción: "Course students"

3. Crear formulario de signup
   - Audience → Signup forms → General signup form
   - Copiar código embed
   - Pegarlo en landing page (en Vercel)

4. Importar secuencia de emails
   - Campaigns → Create → Email
   - Crear 7 automations (una por email)
   - Copiar contenido de email-sequence.md

5. Configurar automations
   - Automation → Send an email
   - Trigger: User added to list
   - Delay: 1 día entre cada email
   - Personalizar {FNAME}, {LNAME}
```

**Template HTML para Mailchimp**:
```html
<!-- Agregar en tu landing page -->
<!-- Mailchimp signup form -->
<form action="https://mailchimp-action-url" method="POST">
  <input type="email" name="EMAIL" placeholder="Tu email">
  <button type="submit">Suscribirse</button>
</form>
```

✅ **Resultado**: Email list + secuencias automáticas configuradas

---

### PASO 4: Procesamiento de Pagos - Opción A: Gumroad ($0)
**Duración**: 25 minutos
**Costo**: 10% por venta

**Instrucciones**:

```
1. Crear cuenta en gumroad.com
   - Click "Start selling"
   - Conectar Google/email

2. Crear productos de curso
   - Click "Products" → "Create product"
   - Producto 1: "Claude Class - Starter" ($49)
   - Producto 2: "Claude Class - Professional" ($197)
   - Producto 3: "Claude Class - VIP" ($497)

3. Agregar descripción + contenido
   - Subir archivos (videos, PDFs)
   - O proporcionar links de descarga
   - Configurar acceso (inmediato)

4. Personalizar cobro
   - Gumroad cobra 10% automáticamente
   - Tú recibes 90%
   - Deposita en tu cuenta bancaria

5. Generar links de venta
   - Cada producto tiene su URL
   - Ej: gumroad.com/tu-nombre/l/claude-class
   - Pegar en landing page
```

✅ **Resultado**: Tienda online funcional, pagos procesados

---

### PASO 4B: Procesamiento de Pagos - Opción B: Stripe (Gratis, mejor comisión)
**Duración**: 30 minutos
**Costo**: 2.9% + $0.30 por transacción

**Instrucciones**:

```
1. Crear cuenta en stripe.com
   - Email, contraseña
   - Información de negocio

2. Obtener API keys
   - Dashboard → Developers → API keys
   - Copiar "Publishable key" y "Secret key"
   - Guardar en variables de entorno

3. Crear checkout
   - Opción A: Usar Stripe no-code
     * Products → Create product
     * Crear 3 productos (Starter, Pro, VIP)
     * Generar payment links

   - Opción B: Integración con Vercel (si sabes JS)
     * Instalar @stripe/stripe-js
     * Implementar formulario de checkout
     * Redirigir después de pago

4. Conectar cuenta bancaria
   - Settings → Bank transfers
   - Agregar cuenta bancaria
   - Stripe deposita cada 2 días

5. Pegar checkout en landing page
   - Botones "Comprar" → Links de Stripe
```

✅ **Resultado**: Pagos procesados, comisión 2.9% + $0.30

---

### PASO 5: Hosting de Videos - YouTube (GRATIS)
**Duración**: 1-2 horas (depende de video upload time)
**Costo**: $0

**Instrucciones**:

```
1. Crear canal de YouTube
   - youtube.com → Tu ícono → Crear canal
   - Nombre: "Claude Class" o similar
   - Descripción: "Curso de Lead Generation"
   - Banner: Usar tu branding

2. Subir videos del curso
   - Ir a studio.youtube.com
   - Click "Crear" → "Subir video"
   - Subir archivo MP4
   - Título: "Módulo 1: Fundamentos"
   - Descripción: "Aprende los conceptos básicos..."
   - Privacidad: "Unlisted" (no se ve en búsquedas)

3. Crear playlist para cada módulo
   - Studio → Playlists → Crear nueva
   - Playlist 1: "Módulo 1 - Fundamentos"
   - Playlist 2: "Módulo 2 - Setup"
   - Etc.

4. Generar URLs embebidas
   - Video → Compartir → Embed
   - Copiar código <iframe>
   - Pegar en tu plataforma de cursos

5. Alternativa: Video protegido con contraseña
   - YouTube privado + Vimeo con contraseña
   - O hacer un sitio privado con Vercel
```

**Script HTML para embed**:
```html
<iframe
  width="100%"
  height="600"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen>
</iframe>
```

✅ **Resultado**: Videos hosteados y embebidos

---

### PASO 6: Alojamiento del Contenido del Curso
**Duración**: 1 hora
**Costo**: $0

**Opción A: Google Drive + Vercel**
```
1. Crear carpeta en Google Drive
   - Drive.google.com → New folder
   - Nombre: "Claude Class Content"

2. Subir PDFs, documentos, plantillas
   - Hacer carpetas por módulo
   - Compartir (solo lectura)

3. Crear landing con links descarga
   - Google Drive permite direct links
   - Agregar botones de descarga
   - O simplemente listar archivos
```

**Opción B: Vercel + Archivos estáticos**
```
1. Crear carpeta /public/content en tu repo
2. Subir PDFs, documentos
3. Acceder vía: tu-dominio.com/content/archivo.pdf
4. Crear página de descargas
```

✅ **Resultado**: Contenido alojado y accesible

---

## 🔄 INTEGRACIONES

### Mailchimp → Gumroad (Automático)

**Mediante Zapier** (alternativa):
```
Si usa Zapier:
1. Trigger: Gumroad → Nuevo cliente
2. Action: Mailchimp → Agregar a lista
3. Resultado: Clientes automáticamente en lista de email

PERO Gumroad ya da opción de email automático,
así que esto es opcional.
```

### Stripe → Email (Automático)

**Mediante Vercel + Webhook**:
```
1. Crear endpoint en tu Vercel
   POST /api/webhook/payment

2. Configurar webhook en Stripe
   Events → payment_intent.succeeded
   URL: tu-dominio.com/api/webhook/payment

3. Lógica del webhook:
   - Recibir info de pago
   - Extraer email
   - Enviar email automático con instrucciones
   - O registrar en Mailchimp

PERO si usas Gumroad, esto ya está incluido.
```

---

## 📋 CHECKLIST DE SETUP

### Semana 1: Infraestructura Básica
- [ ] Registrar dominio ($12)
- [ ] Crear cuenta Vercel (gratis)
- [ ] Conectar GitHub repo a Vercel
- [ ] Deploy landing pages
- [ ] Conectar dominio a Vercel (DNS)
- [ ] Crear cuenta Mailchimp (gratis)
- [ ] Crear lista de audiencia
- [ ] Configurar formulario de signup

### Semana 2: Pagos + Contenido
- [ ] Crear cuenta Gumroad VERSUS Stripe
- [ ] Crear 3 productos (Starter, Pro, VIP)
- [ ] Obtener links de pago
- [ ] Pegar en landing page
- [ ] Crear canal YouTube
- [ ] Subir primeros videos
- [ ] Crear carpeta Google Drive para contenido

### Semana 3: Email + Automación
- [ ] Importar 7 emails en Mailchimp
- [ ] Configurar automations
- [ ] Crear plantilla de email bienvenida
- [ ] Probar secuencia completa (con test email)
- [ ] Conectar webhook de pagos

### Semana 4: Testing + Go Live
- [ ] Test completo del flujo:
  - [ ] Visita landing
  - [ ] Suscribirse email
  - [ ] Hacer compra en Gumroad/Stripe
  - [ ] Recibir email automático
  - [ ] Acceder al contenido
- [ ] Revisar analytics
- [ ] Documentar procesos
- [ ] LANZAMIENTO

---

## 🚀 FLUJO DE CLIENTE

```
1. DISCOVERY
   └─> Cliente visita: claudeclass.com
       (Landing page en Vercel)

2. INTEREST
   └─> Lee contenido
       Suscribe a email en Mailchimp
       AUTOMÁTICO: Recibe email 1 (Problema)

3. AWARENESS
   └─> Recibe emails días 1-7 (secuencia)
       Aprende sobre solución
       Lee testimonios/precios

4. PURCHASE
   └─> Hace click "Comprar Ahora"
       Va a Gumroad/Stripe
       Completa pago
       AUTOMÁTICO: Recibe email de confirmación

5. ONBOARDING
   └─> Accede a plataforma
       Ve lista de módulos
       Accede a videos en YouTube
       Descarga PDFs
       Accede a comunidad (Discord, por separado)

6. LEARNING
   └─> Completa módulo 1
       Hace quiz
       Ve módulo 2
       Etc.

7. MONETIZATION
   └─> Estudia módulo 7: "Venta y Monetización"
       Implementa sus propios cursos
       Genera ingresos
       Éxito ✓
```

---

## 📊 ANALYTICS

### Google Analytics (Gratis)
```
1. Crear cuenta en analytics.google.com
2. Crear propiedad "Claude Class"
3. Obtener Tracking ID
4. Agregar a HTML:

   <!-- Google Analytics -->
   <script async
     src="https://www.googletagmanager.com/gtag/js?id=GA_ID">
   </script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
```

**Métricas a trackear**:
- Tráfico a landing (origen: Google, LinkedIn, Twitter)
- Tasa de conversión (visitantes → email)
- Tasa de compra (email → pago)
- Tiempo en página (engagement)

### Mailchimp Analytics
- Open rate (objetivo: 40%+)
- Click rate (objetivo: 5-10%)
- Unsubscribe rate (objetivo: <0.5%)

### Stripe/Gumroad Analytics
- Conversión de checkout
- Valor promedio de pedido
- Refunds/chargebacks
- Revenue total

---

## 🔒 SEGURIDAD

### HTTPS (Automático en Vercel)
- ✅ Vercel proporciona SSL gratis

### Contraseñas Seguras
```
- Mailchimp: Contraseña fuerte
- Vercel: GitHub auth recomendado
- Stripe: No almacenar keys públicamente
- YouTube: 2FA activado
```

### Variables de Entorno
```
Si usas Vercel con Stripe:
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx (SECRETO)
MAILCHIMP_API_KEY=xxx
```

### Cumplimiento Legal
```
- Términos de Servicio (página /terms)
- Política de Privacidad (página /privacy)
- Política de Reembolso (30 días)
- GDPR compliance (Mailchimp lo maneja)
```

---

## 📈 ESCALABILIDAD FUTURA

**Si creces a 1,000+ estudiantes**:

```
AHORA:
├─ Mailchimp (gratis)
├─ Gumroad/Stripe
├─ YouTube
└─ Google Drive

DESPUÉS (más de 500 estudiantes):
├─ Passar a Mailchimp pago ($20/mes)
├─ O usar Substack ($0 pero menos control)
├─ O Teachable ($99/mes) para todo integrado
├─ Plataforma propia (React + Node)
└─ CDN para videos (Cloudflare, $20/mes)
```

---

## 💡 ALTERNATIVAS POR PRESUPUESTO

### Si tienes $0/mes:
```
✓ Vercel (gratis)
✓ YouTube (gratis)
✓ Mailchimp (gratis)
✓ Gumroad (comisión 10%)
✗ No puedes usar Stripe inicial
✗ Dominio: $1/mes (no incluido)
```

### Si tienes $20/mes:
```
✓ Todo lo anterior +
✓ Dominio propio ($12/año)
✓ Stripe (mejor comisión: 2.9%)
✓ Buffer para social media ($5/mes)
```

### Si tienes $50/mes:
```
✓ Todo lo anterior +
✓ Teachable ($99, reducido a $39 promo)
✓ O Kajabi (mejor pero más caro)
✓ Slack para comunidad ($8/mes)
✓ Mailchimp pago ($30/mes)
```

---

## ⏰ TIMELINE TOTAL

| Tarea | Tiempo | Cuando |
|-------|--------|--------|
| Registrar dominio | 15 min | Día 1 |
| Vercel setup | 30 min | Día 1 |
| Mailchimp setup | 20 min | Día 1 |
| Gumroad setup | 25 min | Día 2 |
| YouTube channel | 30 min | Día 2 |
| Subir videos | 2-4h | Día 2-3 |
| Email sequences | 1h | Día 3 |
| Testing completo | 1-2h | Día 3-4 |
| **TOTAL** | **~10-12h** | **4 días** |

---

## 🎯 PRÓXIMOS PASOS

1. **HOY**: Registrar dominio + Vercel setup
2. **MAÑANA**: Mailchimp + Gumroad + YouTube
3. **DÍA 3**: Subir videos + configurar email
4. **DÍA 4**: Testing completo
5. **LANZAMIENTO**: Empezar a promover en redes

---

## 📞 SOPORTE

Si tienes problemas con:
- **Vercel DNS**: Documentación oficial vercel.com
- **Mailchimp automations**: Mailchimp.com/help
- **Gumroad**: Gumroad.com/support
- **Stripe**: Stripe.com/docs
- **YouTube**: YouTube.com/help

¡Listo para lanzar! 🚀
