# 🚀 Installation Guide

## Requisitos Previos

- **Docker**: v20.10+ ([Descargar](https://www.docker.com/products/docker-desktop))
- **Docker Compose**: v1.29+ (incluido en Docker Desktop)
- **API Key de Anthropic**: Para usar Claude IA ([Obtener aquí](https://console.anthropic.com))
- Mínimo **4GB de RAM** disponible
- Conexión a internet

## Instalación Rápida (5 minutos)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/yourcompany/lead-gen-saas.git
cd lead-gen-saas
```

### Paso 2: Ejecutar el Script de Instalación

```bash
chmod +x scripts/install.sh
./scripts/install.sh
```

O manualmente:

```bash
# Copiar archivo de configuración
cp .env.example .env

# Editar .env y agregar tu ANTHROPIC_API_KEY
nano .env

# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Paso 3: Acceder a la Plataforma

- **Panel Web**: http://localhost:3000
- **API REST**: http://localhost:5000/api/v1

## Configuración Detallada

### Variables de Entorno Importantes

```env
# REQUERIDO - Tu API Key de Anthropic
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# JWT Secret (cambiar en producción)
JWT_SECRET=your-super-secret-key

# Base de datos
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=lead_gen_saas
```

## Uso Inicial

### 1. Crear Cuenta

Accede a http://localhost:3000 y crea una nueva cuenta

### 2. Cargar Datos Históricos

```bash
# Formato: CSV o JSON con estos campos:
# - email (requerido)
# - name (requerido)
# - company
# - industry
# - jobTitle
# - companySize
# - budgetRange
# - conversionStatus (lead, customer, lost)
# - dealValue (opcional)
```

**Ejemplo de CSV:**
```
email,name,company,industry,jobTitle,conversionStatus,dealValue
john@acme.com,John Doe,ACME Corp,Technology,VP Sales,customer,50000
jane@techco.com,Jane Smith,Tech Co,Software,CTO,customer,75000
```

### 3. Generar ICP

1. Ve a "Configuración > ICP Generation"
2. Click en "Generate ICP from Historical Data"
3. El AI analizará tus datos y creará 3-5 perfiles ideales

### 4. Iniciar Campañas

1. Ve a "Campaigns"
2. Click en "New Campaign"
3. Selecciona el ICP y canales
4. Los agentes comenzarán a buscar y contactar leads

### 5. Monitorear Resultados

- Ve a "Analytics" para ver métricas en tiempo real
- Dashboard muestra ROI, conversion rates, leads generados
- Exporta reportes en PDF o CSV

## Troubleshooting

### Error: Docker no está instalado
```bash
# macOS con Homebrew
brew install docker docker-compose

# O descargar: https://www.docker.com/products/docker-desktop
```

### Error: Puerto 5000 o 3000 en uso

```bash
# Cambiar puertos en docker-compose.yml
# O liberar el puerto:
lsof -i :5000
kill -9 <PID>
```

### Servicios no inician

```bash
# Ver logs detallados
docker-compose logs -f

# Reconstruir images
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Base de datos no se conecta

```bash
# Reset completo
docker-compose down -v
docker-compose up -d

# Esto eliminará todos los datos - usar solo en desarrollo
```

## Comandos Útiles

```bash
# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de servicio específico
docker-compose logs -f backend

# Ejecutar comando en contenedor
docker-compose exec backend npm run migrate

# Reconstruir imagen
docker-compose build --no-cache

# Ver estado de servicios
docker-compose ps
```

## Configuración Avanzada

### Integrar con APIs Externas

En `.env`, agrega tus API keys:

```env
# LinkedIn (para búsqueda de leads)
LINKEDIN_API_KEY=xxxxx

# Hunter.io (para emails)
HUNTER_IO_API_KEY=xxxxx

# Clearbit (para enriquecimiento)
CLEARBIT_API_KEY=xxxxx

# SendGrid (para emails)
SENDGRID_API_KEY=xxxxx

# Twilio (para SMS)
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
```

### Escalado Horizontal

Para producción:

```bash
# Usar Kubernetes
kubectl apply -f kubernetes/

# O usar Docker Swarm
docker swarm init
docker stack deploy -c docker-compose.prod.yml lead-gen
```

## Desinstalación

```bash
# Detener y eliminar contenedores
docker-compose down -v

# O solo detener sin eliminar datos
docker-compose stop
```

---

¿Preguntas? Contacta a: support@leadgen-saas.com
