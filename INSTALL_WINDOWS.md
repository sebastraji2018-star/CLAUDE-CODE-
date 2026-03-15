# 🪟 Installation Guide for Windows

## El Problema

El archivo `install.sh` es un script **Bash para Linux/Mac**. En Windows PowerShell no funciona directamente.

## Soluciones para Windows

### ✅ OPCIÓN 1: Usar Git Bash (Más Fácil)

Si tienes **Git** instalado en Windows, ya tienes **Git Bash**.

```bash
# 1. Abre Git Bash (desde el menú del explorador o aplicaciones)
# 2. Navega a la carpeta
cd C:\ruta\a\lead-gen-saas

# 3. Ejecuta el script
chmod +x scripts/install.sh
./scripts/install.sh

# Listo! Sigue los pasos
```

**Descarga Git para Windows**: https://git-scm.com/download/win

---

### ✅ OPCIÓN 2: Usar WSL (Windows Subsystem for Linux)

WSL te da un ambiente Linux completo en Windows.

```powershell
# 1. Abre PowerShell como Administrador
# 2. Instala WSL
wsl --install

# 3. Reinicia Windows
# 4. Abre WSL desde el menú inicio
# 5. Navega a tu carpeta y ejecuta
chmod +x scripts/install.sh
./scripts/install.sh
```

---

### ✅ OPCIÓN 3: Instalación Manual en Windows

Si no tienes Git Bash ni WSL, sigue estos pasos manualmente:

#### Paso 1: Instala los requisitos

```
✅ Docker Desktop para Windows
   https://www.docker.com/products/docker-desktop

✅ Docker Compose (viene con Docker Desktop)
```

#### Paso 2: Configura el archivo .env

```powershell
# En PowerShell, en la carpeta del proyecto:
Copy-Item ".env.example" ".env"

# Edita .env con Notepad:
notepad .env

# Busca esta línea:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx

# Reemplaza con tu API key de Anthropic:
ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui
```

**Obtén tu API Key gratis**: https://console.anthropic.com

#### Paso 3: Inicia los servicios

```powershell
# En PowerShell, en la carpeta del proyecto:

# Construye las imágenes
docker-compose build

# Inicia los servicios
docker-compose up -d

# Espera 10 segundos a que arranquen
Start-Sleep -Seconds 10

# Verifica que están corriendo
docker-compose ps
```

#### Paso 4: Accede al sistema

Abre tu navegador:

```
Dashboard: http://localhost:3000
API: http://localhost:5000/api/v1
```

---

## Comandos Útiles en Windows PowerShell

```powershell
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose stop

# Iniciar servicios
docker-compose start

# Detener y eliminar (cuidado: borra datos)
docker-compose down

# Ver estado de servicios
docker-compose ps

# Limpiar todo y reiniciar
docker-compose down -v
docker-compose up -d
```

---

## Troubleshooting en Windows

### Error: Docker no está instalado

```
Solución: Descarga Docker Desktop para Windows
https://www.docker.com/products/docker-desktop
```

### Error: Puerto 3000 o 5000 ya en uso

```powershell
# Encuentra el proceso usando el puerto
netstat -ano | findstr :5000

# Detén el proceso (reemplaza PID)
taskkill /PID <PID> /F
```

### Error: "docker" no se reconoce

```
Solución: Reinicia PowerShell después de instalar Docker
O abre PowerShell como Administrador
```

### Services no arrancan

```powershell
# Ver logs completos
docker-compose logs

# Reconstruir images
docker-compose build --no-cache
docker-compose down
docker-compose up -d
```

### Problema con permisos

```powershell
# Abre PowerShell como Administrador
# Click derecho en PowerShell → "Run as Administrator"
```

---

## Recomendación

Para mejor experiencia en Windows, usa **Git Bash**:

1. **Instala Git para Windows**: https://git-scm.com/download/win
2. **Click derecho en la carpeta** → "Git Bash Here"
3. **Ejecuta**: `./scripts/install.sh`

---

## Después de instalar

### 1. Abre el dashboard

```
http://localhost:3000
```

### 2. Crea una cuenta

- Email: tu-email@example.com
- Contraseña: segura
- Empresa: tu compañía

### 3. Carga datos de clientes

```
Dashboard → Data Import → Upload CSV
```

Formato CSV:
```
email,name,company,industry,jobTitle,conversionStatus,dealValue
john@acme.com,John Doe,ACME Corp,Technology,VP Sales,customer,150000
jane@techco.com,Jane Smith,TechCo,Software,CTO,customer,75000
```

### 4. Genera ICP

```
Dashboard → ICP Generation → Generate from Historical Data
```

### 5. Agentes activan

Los agentes empezarán automáticamente a:
- Buscar leads
- Calificarlos
- Enviar mensajes personalizados
- Rastrear respuestas
- Calcular ROI

---

## Soporte

Si tienes problemas:

1. Lee [QUICKSTART.md](./QUICKSTART.md)
2. Revisa [INSTALLATION.md](./INSTALLATION.md)
3. Mira los logs: `docker-compose logs`
4. Contacta: support@leadgen-saas.com

---

**¡Listo! Ahora ejecuta la instalación y deberías ver el dashboard en 5 minutos.** 🚀
