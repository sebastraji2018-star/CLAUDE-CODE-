# Claude Class - Guía de Setup Paso a Paso

## 🎯 Objetivo
Tener el sistema completo funcionando en 4 días con presupuesto mínimo.

---

## DÍA 1: Dominio + Landing Pages

### 1.1 Registrar Dominio (15 minutos)

#### En Namecheap (Recomendado):
```
1. Ir a namecheap.com
2. En la barra de búsqueda escribir: claudeclass.com
   (o claudelearn.com, leadgenai.com, etc)
3. Si está disponible, agregar al carrito
4. Ir a checkout
5. Email: tu@tumail.com
6. Crear cuenta
7. Pagar (~$8.88 por año)
8. Confirmar email de verificación
```

✅ **Resultado**: Dominio registrado

---

### 1.2 Conectar GitHub a Vercel (30 minutos)

#### Paso 1: Crear cuenta Vercel
```
1. Ir a vercel.com
2. Click "Sign Up"
3. Seleccionar "Continue with GitHub"
4. Autorizar Vercel en GitHub
5. Completar perfil
```

#### Paso 2: Importar tu repositorio
```
1. En Vercel dashboard: "Add New" → "Project"
2. Seleccionar "Import Git Repository"
3. Buscar: "CLAUDE-CODE-"
4. Click "Import"
5. Vercel auto-detecta que es estático
6. Click "Deploy"
```

✅ **Resultado**: Landing pages en vercel.com

---

### 1.3 Conectar Dominio Propio a Vercel (20 minutos)

#### En Vercel:
```
1. Ir a Settings → Domains
2. Agregar dominio: "claudeclass.com"
3. Vercel mostrará 4 registros NS (Name Servers)
4. Copiar los valores
```

#### En Namecheap:
```
1. Ir a Namecheap Dashboard
2. "Manage" en tu dominio
3. Pestaña "Nameservers"
4. Cambiar de "Namecheap BasicDNS" a "Custom DNS"
5. Agregar los 4 servidores de Vercel
6. Guardar cambios

ESPERAR 24-48 HORAS para propagación DNS
```

#### Verificar (después de 24-48h):
```
1. Ir a mxtoolbox.com
2. Hacer "DNS Lookup" de tu dominio
3. Debería mostrar servidores de Vercel
4. Visitar claudeclass.com en navegador
5. Debería cargar tu landing page
```

✅ **Resultado**: Landing pages en tu dominio

---

## DÍA 2: Email + Pagos

### 2.1 Configurar Mailchimp (20 minutos)

#### Paso 1: Crear cuenta
```
1. Ir a mailchimp.com
2. Click "Sign Up Free"
3. Email: tu@tumail.com
4. Contraseña: fuerte y segura
5. Nombre: Tu Nombre
6. Completar verificación email
```

#### Paso 2: Crear lista de audiencia
```
1. Panel izquierdo → "Audience"
2. Click "Create Audience"
3. Nombre: "Claude Class Students"
4. Email: tu@tumail.com
5. Compañía: Tu Nombre/Empresa
6. Industria: "Education"
7. Privacidad: Aceptar términos
8. Crear
```

#### Paso 3: Crear formulario de signup
```
1. "Audience" → "Signup forms" → "General signup form"
2. Copiar código de embed
3. Ir a tu landing page (en Vercel repo)
4. Abrir archivo: landing-page/index.html
5. Buscar: <form class="cta-form"
6. Reemplazar con el código de Mailchimp
7. Hacer commit y push (Vercel auto-redeploy)
```

#### Paso 4: Crear automations
```
Para cada uno de los 7 emails:

1. "Campaigns" → "Automations"
2. "Create" → "Email automation"
3. Nombre: "Email 1 - Problema"
4. Trigger: "User added to audience"
5. Delay: 0 días para Email 1
       1 día para Email 2
       2 días para Email 3, etc.
6. Contenido: Copiar-pegar del archivo email-sequence.md
7. Personalizar con variables:
   - *|FNAME|* (nombre)
   - *|LNAME|* (apellido)
   - *|EMAIL|* (email)
8. Guardar y activar
```

**Ejemplo de Email 1**:
```
Asunto: Generas POCOS leads porque lo haces manual 😬

Preheader: Esto es lo que no te dijeron sobre prospección

Cuerpo:
Hola *|FNAME|*,

Acabo de terminar una llamada con un CEO...
[copiar contenido del archivo email-sequence.md]

Cuidados:
- Personalizar [Tu nombre]
- Personalizar links de conversión
```

✅ **Resultado**: Email list + 7 automations configuradas

---

### 2.2 Configurar Gumroad (25 minutos)

#### Paso 1: Crear cuenta
```
1. Ir a gumroad.com
2. Click "Start selling"
3. Conectar con Google/email
4. Completar perfil
5. Agregar foto + descripción
```

#### Paso 2: Crear 3 productos
```
Para cada producto (Starter, Professional, VIP):

1. Click "Products" (en navegación top)
2. "Create a product"
3. Nombre: "Claude Class - Starter"
4. Precio: $49
5. Descripción:
   "Aprende los primeros 3 módulos del curso:
   - Fundamentos
   - Setup e instalación
   - Uso básico
   + Acceso de por vida
   + Comunidad
   + Templates"
6. Agregar cover (usa una imagen de Canva)
7. Contenido (opciones):
   - Opción A: "Add file" → Subir archivos ZIP
   - Opción B: "Add link" → Agregar links de Google Drive
   - Opción C: "Mensaje" → Enviar acceso por email
8. Guardar producto
```

#### Paso 3: Obtener links de venta
```
Cada producto tendrá un link:
- Starter: gumroad.com/tu-nombre/l/claude-class-starter
- Professional: gumroad.com/tu-nombre/l/claude-class-pro
- VIP: gumroad.com/tu-nombre/l/claude-class-vip

(O Gumroad genera uno automático)

Copiar estos links para la landing page
```

#### Paso 4: Agregar links a landing page
```
1. Abrir landing-page/index.html en tu editor
2. Buscar todos los [LINK COMPRA] o "Comprar Ahora"
3. Reemplazar con tus URLs de Gumroad
4. Hacer commit y push
```

✅ **Resultado**: Tienda online en Gumroad

---

## DÍA 3: Videos + Contenido

### 3.1 Crear Canal YouTube (30 minutos)

#### Paso 1: Crear canal
```
1. Ir a youtube.com
2. Click tu avatar (arriba a la derecha)
3. "Create a channel"
4. Nombre: "Claude Class"
5. Descripción: "Curso de Lead Generation con IA"
6. Crear
```

#### Paso 2: Personalizar canal
```
1. Studio.youtube.com
2. Settings (engranaje)
3. Channel → Channel customization
4. Banner: Descargar template de Canva
   Tamaño: 2560x1440px
   Subir archivo
5. Icono del canal: Logo tuyo (800x800px)
6. Descripción: "Aprende a generar leads automáticamente..."
```

#### Paso 3: Subir videos
```
Para cada video:

1. Studio.youtube.com → "Create" → "Upload video"
2. Seleccionar archivo MP4
3. Llenar información:
   - Título: "Módulo 1: Fundamentos (Parte 1)"
   - Descripción:
     "Aprende por qué lead generation es valioso
     📚 Curso completo: https://claudeclass.com
     ⏱️ 4:42 minutos"

   - Privacidad: "Unlisted" (no se ve en búsquedas)
     (Esto protege el contenido)

4. Tags: "leadgen", "ai", "automatizacion"
5. Thumbnail: Subir imagen atractiva (1280x720px)
6. Click "Save" (no publicar aún)
```

#### Paso 4: Crear playlists
```
1. Studio → Playlists
2. "Create" → "New playlist"
3. Nombre: "Módulo 1 - Fundamentos"
4. Descripción: "Introducción al curso"
5. Agregar videos del módulo 1
6. Repetir para cada módulo
```

✅ **Resultado**: Videos hosteados en YouTube

---

### 3.2 Crear carpeta de contenido (Google Drive)

```
1. Ir a drive.google.com
2. Click "New" → "Folder"
3. Nombre: "Claude Class Content"
4. Abrir la carpeta
5. Crear sub-carpetas:
   - "Módulo 1"
   - "Módulo 2"
   - ... (Módulo 7)
   - "Templates"
   - "Bonus"

6. Subir archivos:
   - PDFs de guías
   - Plantillas Excel/Word
   - Pitch deck
   - Modelos financieros

7. Compartir (botón azul "Share"):
   - Change → "Anyone with the link"
   - Role → "Viewer"
   - Copy link para cada carpeta/archivo
```

✅ **Resultado**: Contenido organizado y accesible

---

## DÍA 4: Testing + Lanzamiento

### 4.1 Test completo del flujo

#### Test 1: Registro en email
```
1. Ir a claudeclass.com
2. Scroll hasta CTA
3. Ingresar email de prueba: test@gmail.com
4. Click "Suscribirse"
5. Verificar que se agregó a Mailchimp
   - Mailchimp → Audience → See contacts
   - Debería estar test@gmail.com
```

#### Test 2: Recibir email automático
```
1. Esperar 1-2 minutos
2. Revisar email (test@gmail.com)
3. Debería llegar Email 1 de la secuencia
4. Click en links para verificar funcionan
```

#### Test 3: Hacer compra
```
1. Ir a claudeclass.com/pricing
2. Click "Comprar Ahora" en plan Professional
3. Ir a Gumroad
4. Completar información
5. Usar tarjeta de prueba Gumroad:
   Número: 4242 4242 4242 4242
   Expiración: 12/25
   CVC: 123
6. Completar transacción
7. Debería mostrar "Success"
```

#### Test 4: Acceso a contenido
```
1. Verificar que se recibió email de confirmación
2. Hacer click en link de acceso
3. Debería permitir acceso a contenido
4. Ver videos en YouTube
5. Descargar PDFs
```

✅ **Resultado**: Sistema funcionando end-to-end

---

### 4.2 Verificar Analytics

```
1. Google Analytics
   - Ir a analytics.google.com
   - Seleccionar propiedad "Claude Class"
   - Ver tráfico en tiempo real
   - Debería mostrar al menos 1-2 visitas (tú)

2. Mailchimp
   - Ver contactos agregados
   - Ver open rate de emails (con retraso)

3. Gumroad
   - Ver transacciones completadas
   - Verificar pago llegó a tu cuenta
```

✅ **Resultado**: Analytics configurado

---

## 🚀 LANZAMIENTO (Después del testing)

### Checklist Final

- [ ] Dominio funcionando
- [ ] Landing pages visibles
- [ ] Email signup funcionando
- [ ] 7 automations configuradas
- [ ] Gumroad tienda activa
- [ ] YouTube videos subidos
- [ ] Google Drive organizado
- [ ] Flujo completo testeado
- [ ] Analytics configurado

### Promoción inicial

```
DÍA 1 POST-LANZAMIENTO:
1. Publicar en LinkedIn (post 1)
2. Publicar en Twitter (tweet 1)
3. Publicar en Facebook (si tienes audiencia)
4. Email a tu lista personal (20-50 contactos)

DÍA 2-3:
5. 2-3 posts más en LinkedIn
6. 2-4 tweets en Twitter
7. Engagement: responder comentarios
8. Compartir one-pager a contactos B2B

SEMANA 1:
9. Publicar 3-5 posts en redes
10. Responder todas las preguntas
11. Recolectar feedback de primeros clientes
12. Optimizar landing/emails basado en feedback
```

✅ **LANZAMIENTO EXITOSO**

---

## 💬 Soporte y Troubleshooting

### El dominio no funciona
```
Solución:
1. Esperar 48 horas (DNS propaga lentamente)
2. Limpiar cache navegador (Ctrl+Shift+Del)
3. Verificar en mxtoolbox.com que DNS apunta a Vercel
4. Contactar soporte Vercel si persiste
```

### Email no llega
```
Solución:
1. Revisar spam/promotions en Gmail
2. Agregar tu email a "trusted senders" en Mailchimp
3. Verificar que automate está "Enabled"
4. Probar con email diferente
```

### Compra no funciona
```
Solución:
1. Probar con otra tarjeta
2. Usar tarjeta de prueba (números arriba)
3. Verificar que Gumroad está activo
4. Revisar configuración de impuestos
```

### Videos no se ven
```
Solución:
1. Esperar 24h después de subir (YouTube procesa)
2. Verificar privacidad en "Unlisted" (correcto)
3. Probar en incógnito (sin cache)
4. Usar link público de YouTube (copy share link)
```

---

## 📞 Contactos de soporte

- **Vercel**: vercel.com/help
- **Mailchimp**: mailchimp.com/help
- **Gumroad**: gumroad.com/support
- **YouTube**: youtube.com/help
- **Namecheap**: namecheap.com/support

¡Listo! Siguiente paso: empezar a promover 🎉
