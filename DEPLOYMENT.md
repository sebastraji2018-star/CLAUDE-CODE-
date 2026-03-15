# 🚀 Deployment Guide for Customers

## Cómo Vender e Instalar para Empresas

Este documento explica cómo instalar y configurar el sistema para clientes.

### Paso 1: Preparar el Servidor

```bash
# Requisitos del servidor
- Mínimo 4GB RAM
- 20GB almacenamiento
- Docker 20.10+
- Docker Compose 1.29+

# Instalación en Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

### Paso 2: Deployment

```bash
# Clonar repositorio
git clone https://github.com/yourcompany/lead-gen-saas.git /opt/lead-gen
cd /opt/lead-gen

# Copiar y configurar .env
cp .env.example .env

# IMPORTANTE: Generar JWT_SECRET único
openssl rand -base64 32 > jwt_secret.txt

# Editar .env con datos del cliente
nano .env
```

### Paso 3: Iniciar Servicios

```bash
# Iniciar en background
docker-compose up -d

# Verificar estado
docker-compose ps

# Ver logs
docker-compose logs -f
```

### Paso 4: Acceso

Proporcionar al cliente:
- URL del dashboard: https://domain.com
- Usuario administrador inicial
- Instrucciones de primer uso

## Configuración para Producción

### SSL/HTTPS

```bash
# Usar Let's Encrypt con Certbot
sudo certbot certonly -d domain.com

# Actualizar nginx config
# ... agregar certificados SSL
```

### Nginx Reverse Proxy

```nginx
upstream backend {
    server backend:5000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name domain.com;

    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Backups Automáticos

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/lead-gen"
DB_CONTAINER="lead-gen-postgres"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker-compose exec -T $DB_CONTAINER pg_dump -U postgres lead_gen_saas > \
    $BACKUP_DIR/backup_$TIMESTAMP.sql

# Compress
gzip $BACKUP_DIR/backup_$TIMESTAMP.sql

# Keep last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$TIMESTAMP.sql.gz"
```

### Monitoreo

```bash
# Prometheus config
cat > prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']
EOF

# Iniciar monitoreo
docker-compose -f docker-compose.monitoring.yml up -d
```

### Logging y Alertas

```bash
# ELK Stack para logs
docker-compose -f docker-compose.elk.yml up -d

# Ver logs centralizados
# Accesar a Kibana en http://localhost:5601
```

## Escalado

### Múltiples Instancias de Agentes

```yaml
# docker-compose.prod.yml
services:
  backend:
    deploy:
      replicas: 3
    environment:
      AGENT_POOL_SIZE: 10

  frontend:
    deploy:
      replicas: 2
```

### Load Balancing

```bash
# Usar HAProxy o Nginx upstream
```

## Mantenimiento

### Actualizar Sistema

```bash
# Pull nueva versión
git pull origin main

# Rebuild images
docker-compose build --no-cache

# Restart servicios
docker-compose down
docker-compose up -d
```

### Limpiar Datos Antiguos

```bash
# Política de retención por plan
# Starter: 30 días
# Professional: 90 días
# Enterprise: 365 días

# Script para limpiar
docker-compose exec backend npm run cleanup:old-data
```

## Troubleshooting en Producción

### Alto Uso de CPU

```bash
# Verificar procesos
docker stats

# Escalar agentes horizontalmente
docker-compose scale backend=5
```

### Disco Lleno

```bash
# Ver uso
docker system df

# Limpiar imágenes antiguas
docker image prune -a

# Limpiar volúmenes sin usar
docker volume prune
```

### Conexión a Base de Datos

```bash
# Verificar conexión
docker-compose exec backend npm run db:check

# Reset base de datos (cuidado!)
docker-compose exec backend npm run db:reset
```

## Seguridad

### Firewall

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### Secrets Management

```bash
# Usar AWS Secrets Manager, HashiCorp Vault, etc.
# No guardar keys en .env

# O usar Kubernetes secrets
kubectl create secret generic api-keys \
  --from-literal=ANTHROPIC_API_KEY=sk-ant-xxx
```

### Rate Limiting

```bash
# Implementar en Nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;

location /api {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://backend;
}
```

## Onboarding del Cliente

### Checklist de Instalación

- [ ] Sistema instalado y verificado
- [ ] Base de datos migrada
- [ ] Usuario administrador creado
- [ ] API keys configuradas
- [ ] Email de bienvenida enviado
- [ ] Documentación entregada
- [ ] Soporte asignado
- [ ] Primera sincronización de datos realizada

### Template de Email de Bienvenida

```
Asunto: Tu plataforma de Lead Generation está lista 🚀

Hola [Customer Name],

¡Estamos emocionados de anunciar que tu sistema de generación de leads
está completamente instalado y listo para comenzar!

URLs de Acceso:
- Dashboard: https://[subdomain].leadgen-saas.com
- API: https://api.[subdomain].leadgen-saas.com

Credenciales Iniciales:
- Usuario: [email]
- Contraseña: [temporary_password]

Próximos Pasos:
1. Inicia sesión en el dashboard
2. Carga tus datos históricos de clientes (CSV o JSON)
3. El AI analizará automáticamente tus patrones de clientes exitosos
4. Los agentes comenzarán a buscar leads similares
5. Verás resultados en tu dashboard en tiempo real

Recursos:
- Documentación: https://docs.leadgen-saas.com
- Video Tutorial: https://youtube.com/leadgen
- Soporte: support@leadgen-saas.com

¡Comencemos a generar clientes juntos!

Saludos,
El equipo de Lead Generation
```

---

Para soporte técnico: devops@yourcompany.com
