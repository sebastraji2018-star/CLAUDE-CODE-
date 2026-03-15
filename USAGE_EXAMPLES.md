# 📘 Usage Examples

## Ejemplo 1: Setup Inicial Completo

### 1. Crear Cuenta y Workspace

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sales@mycompany.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "company": "MyCompany Inc"
  }'

# Respuesta:
{
  "token": "eyJhbGc...",
  "user": { "id": "uuid-1", "email": "sales@mycompany.com" }
}

# Guardar token
TOKEN="eyJhbGc..."
```

### 2. Crear Workspace

```bash
curl -X POST http://localhost:5000/api/v1/workspaces \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sales Team Q1 2025",
    "plan": "professional"
  }'

# Respuesta:
{
  "id": "workspace-1",
  "name": "Sales Team Q1 2025",
  "plan": "professional",
  "status": "active"
}

WORKSPACE_ID="workspace-1"
```

## Ejemplo 2: Cargar Datos Históricos

### Crear archivo CSV con tus clientes

```csv
email,name,company,industry,jobTitle,companySize,budgetRange,conversionStatus,dealValue
john@acme.com,John Smith,ACME Corporation,Technology,VP of Sales,500-1000,$100k-500k,customer,150000
jane@techco.com,Jane Wilson,TechCo Inc,Software,CTO,100-500,$50k-100k,customer,75000
bob@startup.io,Bob Johnson,Startup Inc,Technology,CEO,10-50,$10k-50k,lead,0
alice@finance.com,Alice Brown,Finance Corp,Finance,CFO,1000+,$500k+,customer,500000
mike@retail.com,Mike Davis,Retail LLC,Retail,Operations Director,50-100,$25k-75k,lost,0
```

### Cargar datos

```bash
curl -X POST http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/data-import/upload \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "historical_customers.csv",
    "fileType": "csv",
    "records": [
      {
        "email": "john@acme.com",
        "name": "John Smith",
        "company": "ACME Corporation",
        "industry": "Technology",
        "jobTitle": "VP of Sales",
        "companySize": "500-1000",
        "budgetRange": "$100k-500k",
        "conversionStatus": "customer",
        "dealValue": 150000
      }
    ]
  }'

# Respuesta
{
  "importId": "import-1",
  "status": "completed",
  "totalRecords": 1,
  "successfulRecords": 1,
  "failedRecords": 0,
  "errors": []
}
```

## Ejemplo 3: Generar ICP Automáticamente

```bash
curl -X POST http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/icp/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Enterprise Tech Buyers 2025"
  }'

# El AI analiza tus datos históricos y genera:
{
  "id": "icp-1",
  "name": "Enterprise Tech Buyers 2025",
  "status": "draft",
  "characteristics": {
    "industries": ["Technology", "Finance", "Software"],
    "companySizes": ["100-1000", "500-1000", "1000+"],
    "jobTitles": ["VP of Sales", "CTO", "CFO", "Sales Director"],
    "budgetRange": { "min": 50000, "max": 500000 },
    "painPoints": [
      "Lead generation challenges",
      "Sales team inefficiency",
      "Revenue growth"
    ],
    "buyingSignals": [
      "Expanding sales team",
      "New product launch",
      "Revenue target increase"
    ]
  }
}
```

### Activar ICP

```bash
curl -X PUT http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/icp/$ICP_ID/activate \
  -H "Authorization: Bearer $TOKEN"
```

## Ejemplo 4: Monitorear Agentes

```bash
# Ver estado de agentes
curl -X GET http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/agents/status \
  -H "Authorization: Bearer $TOKEN"

# Respuesta:
{
  "workspaceId": "workspace-1",
  "agents": {
    "icpAnalysis": { "status": "active", "lastRun": "2025-03-15T10:30:00Z" },
    "leadSearch": { "status": "running", "leadsFound": 42 },
    "qualification": { "status": "active", "leadsQualified": 38 },
    "engagement": { "status": "running", "messagesSent": 120 },
    "analytics": { "status": "active", "lastUpdate": "2025-03-15T11:00:00Z" }
  }
}
```

## Ejemplo 5: Ver Leads Generados

```bash
# Get all leads
curl -X GET http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/leads \
  -H "Authorization: Bearer $TOKEN"

# Get qualified leads
curl -X GET "http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/leads?qualificationStatus=qualified" \
  -H "Authorization: Bearer $TOKEN"

# Get hot leads (highest priority)
curl -X GET "http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/leads?qualificationStatus=hot&minScore=80" \
  -H "Authorization: Bearer $TOKEN"

# Respuesta:
[
  {
    "id": "lead-1",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "email": "sarah.johnson@techcorp.com",
    "company": "TechCorp Inc",
    "jobTitle": "VP of Sales",
    "industry": "Technology",
    "companySize": "500-1000",
    "qualificationScore": 92,
    "icpMatchPercentage": 95,
    "qualificationStatus": "hot",
    "status": "new",
    "discoveredAt": "2025-03-15T09:30:00Z"
  }
]
```

## Ejemplo 6: Ver Métricas de ROI

```bash
# Get ROI dashboard
curl -X GET http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/analytics/roi \
  -H "Authorization: Bearer $TOKEN"

# Respuesta:
{
  "leadsGenerated": 250,
  "conversions": 12,
  "conversionRate": 4.8,
  "costPerLead": 50,
  "averageDealValue": 75000,
  "totalCost": 12500,
  "totalRevenue": 900000,
  "roi": 7100,
  "projectedMonthlyRevenue": 1200000
}
```

## Ejemplo 7: Engagement Automático

El sistema automáticamente:

1. **Busca leads** que cumplan con el ICP
2. **Enriquece datos** (emails, teléfono, información de empresa)
3. **Califica leads** con ML basado en tu ICP
4. **Genera mensajes personalizados** usando IA
5. **Envía sequences** por email, LinkedIn, SMS
6. **Monitorea respuestas** (opens, clicks, replies)
7. **Escala calificados** a tu equipo de ventas
8. **Mide ROI** en tiempo real

### Ver métricas de engagement

```bash
curl -X GET http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Respuesta:
{
  "totalLeads": 250,
  "qualifiedLeads": 125,
  "convertedLeads": 12,
  "conversionRate": 4.8,
  "qualificationRate": 50,
  "engagement": {
    "emailOpenRate": 35.2,
    "emailClickRate": 12.5,
    "emailResponseRate": 6.4,
    "linkedInMessageRate": 8.2,
    "followUpRate": 45
  }
}
```

## Ejemplo 8: Exportar Reportes

```bash
# Export qualified leads
curl -X GET "http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/leads/export?format=csv&qualificationStatus=qualified" \
  -H "Authorization: Bearer $TOKEN" \
  > qualified_leads.csv

# Export analytics report
curl -X GET "http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/analytics/export-report?format=pdf&days=30" \
  -H "Authorization: Bearer $TOKEN" \
  > monthly_report.pdf
```

## Ejemplo 9: Integración con CRM

El sistema automáticamente sincroniza leads con:

- **Salesforce**: Crea contactos en tu Salesforce automáticamente
- **HubSpot**: Agrega a tu pipeline de sales
- **Pipedrive**: Crea deals automáticos
- **Custom Webhooks**: Integra con cualquier sistema

### Configurar integración

```bash
curl -X POST http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/integrations/hubspot/connect \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-hubspot-api-key",
    "accountId": "your-account-id",
    "autoSync": true,
    "mappings": {
      "firstName": "firstname",
      "lastName": "lastname",
      "email": "email",
      "company": "company",
      "jobTitle": "jobtitle"
    }
  }'
```

## Ejemplo 10: Webhook de Eventos

Recibe notificaciones en tiempo real:

```bash
# Configure webhook
curl -X POST http://localhost:5000/api/v1/workspaces/$WORKSPACE_ID/webhooks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhooks/leadgen",
    "events": ["lead.discovered", "lead.qualified", "lead.converted"],
    "secret": "webhook-secret-key"
  }'

# Webhook payload you'll receive:
{
  "event": "lead.qualified",
  "timestamp": "2025-03-15T10:30:00Z",
  "data": {
    "leadId": "lead-123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Example Corp",
    "score": 85,
    "qualificationStatus": "hot"
  }
}
```

---

## Dashboard Automático

Una vez activado, el dashboard mostrará:

```
┌─────────────────────────────────────────────────────────────┐
│  Lead Generation Dashboard - Sales Team Q1 2025             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 Key Metrics                                              │
│  ├─ Leads Generated: 250 (↑ 45% vs last month)             │
│  ├─ Qualified Leads: 125 (50% qual rate)                    │
│  ├─ Conversions: 12 (4.8% conv rate)                        │
│  └─ Estimated Revenue: $900,000                             │
│                                                               │
│  🤖 Agent Status                                             │
│  ├─ Lead Search: ✅ Running (42 new leads found)            │
│  ├─ Qualification: ✅ Active (38 qualified today)           │
│  ├─ Engagement: ✅ Running (120 messages sent)              │
│  └─ Analytics: ✅ Updated 5 min ago                         │
│                                                               │
│  🔥 Hot Leads (Ready to Contact)                            │
│  ├─ Sarah Johnson @ TechCorp (Score: 92, Match: 95%)       │
│  ├─ Mike Chen @ DataFlow (Score: 88, Match: 92%)           │
│  └─ Lisa Rodriguez @ CloudSys (Score: 85, Match: 90%)      │
│                                                               │
│  💰 ROI Metrics                                              │
│  ├─ Cost per Lead: $50                                       │
│  ├─ Deal Value: $75,000                                      │
│  ├─ ROI: 7,100% 🚀                                           │
│  └─ Payback Period: < 1 day                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

Para más ejemplos: https://github.com/yourcompany/lead-gen-saas/examples
