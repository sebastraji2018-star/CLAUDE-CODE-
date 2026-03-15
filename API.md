# API Reference

## Base URL

```
http://localhost:5000/api/v1
```

## Autenticación

Todos los endpoints (excepto auth) requieren:

```
Authorization: Bearer {JWT_TOKEN}
```

---

## Authentication

### Register

```
POST /auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe",
  "company": "My Company"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "My Company"
  }
}
```

### Login

```
POST /auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

---

## Workspaces

### Create Workspace

```
POST /workspaces
```

**Body:**
```json
{
  "name": "My Sales Team",
  "plan": "professional"
}
```

### Get All Workspaces

```
GET /workspaces
```

### Get Workspace Details

```
GET /workspaces/{workspace_id}
```

### Update Workspace

```
PUT /workspaces/{workspace_id}
```

**Body:**
```json
{
  "name": "Updated Name",
  "settings": {
    "icpEnabled": true,
    "engagementEnabled": true
  }
}
```

### Get Workspace Status

```
GET /workspaces/{workspace_id}/status
```

**Response:**
```json
{
  "id": "uuid",
  "name": "My Sales Team",
  "plan": "professional",
  "status": "active",
  "leadsGeneratedThisMonth": 1250,
  "apiUsage": {
    "used": 45000,
    "limit": 100000
  },
  "agents": {
    "icpAnalysis": { "status": "active", "lastRun": "2025-03-15T10:30:00Z" },
    "leadSearch": { "status": "running", "leadsFound": 42 },
    "qualification": { "status": "active", "leadsQualified": 38 },
    "engagement": { "status": "running", "messagesSent": 120 },
    "analytics": { "status": "active", "lastUpdate": "2025-03-15T11:00:00Z" }
  }
}
```

---

## Data Import

### Upload Customer Data

```
POST /workspaces/{workspace_id}/data-import/upload
```

**Body:**
```json
{
  "fileName": "customers.csv",
  "fileType": "csv",
  "records": [
    {
      "email": "john@acme.com",
      "name": "John Doe",
      "company": "ACME Corp",
      "industry": "Technology",
      "jobTitle": "VP Sales",
      "companySize": "100-500",
      "budgetRange": "$50k-100k",
      "conversionStatus": "customer",
      "dealValue": 50000
    }
  ]
}
```

### Get Import History

```
GET /workspaces/{workspace_id}/data-import/history
```

---

## ICP Profiles

### Generate ICP

```
POST /workspaces/{workspace_id}/icp/generate
```

**Body:**
```json
{
  "name": "Enterprise Tech Buyers"
}
```

### Get All ICPs

```
GET /workspaces/{workspace_id}/icp
```

### Activate ICP

```
PUT /workspaces/{workspace_id}/icp/{icp_id}/activate
```

### Get Active ICP

```
GET /workspaces/{workspace_id}/icp/active
```

### Update ICP

```
PUT /workspaces/{workspace_id}/icp/{icp_id}
```

**Body:**
```json
{
  "name": "Updated Name",
  "characteristics": {
    "industries": ["Technology", "Finance"],
    "companySizes": ["100-500", "500-1000"],
    "jobTitles": ["VP Sales", "CRO", "Sales Director"],
    "budgetRange": { "min": 50000, "max": 500000 },
    "painPoints": ["Lead generation", "Sales efficiency"],
    "buyingSignals": ["Hiring sales team", "Expansion"]
  }
}
```

---

## Leads

### Get Leads

```
GET /workspaces/{workspace_id}/leads?status=new&qualificationStatus=qualified&minScore=70
```

**Query Parameters:**
- `status`: new, contacted, responded, qualified, converted, lost
- `qualificationStatus`: unqualified, qualified, hot
- `minScore`: 0-100

### Get Lead Count

```
GET /workspaces/{workspace_id}/leads/count?status=qualified
```

### Create Lead Manually

```
POST /workspaces/{workspace_id}/leads
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "jobTitle": "CTO",
  "industry": "Technology",
  "companySize": "50-100",
  "source": "manual"
}
```

### Bulk Upload Leads

```
POST /workspaces/{workspace_id}/leads/bulk-upload
```

**Body:**
```json
{
  "leads": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "company": "Tech Corp",
      "jobTitle": "CTO"
    }
  ]
}
```

### Update Lead Status

```
PUT /workspaces/{workspace_id}/leads/{lead_id}/status
```

**Body:**
```json
{
  "status": "contacted"
}
```

---

## Analytics

### Get Dashboard Metrics

```
GET /workspaces/{workspace_id}/analytics/dashboard
```

**Response:**
```json
{
  "totalLeads": 2500,
  "qualifiedLeads": 1200,
  "convertedLeads": 85,
  "conversionRate": 3.4,
  "qualificationRate": 48
}
```

### Get ROI Metrics

```
GET /workspaces/{workspace_id}/analytics/roi
```

**Response:**
```json
{
  "leadsGenerated": 2500,
  "conversions": 85,
  "conversionRate": 3.4,
  "costPerLead": 50,
  "averageDealValue": 5000,
  "totalCost": 125000,
  "totalRevenue": 425000,
  "roi": 240
}
```

### Get Time Series Metrics

```
GET /workspaces/{workspace_id}/analytics/timeseries?days=30
```

---

## Engagement

### Get Engagement Sequences

```
GET /workspaces/{workspace_id}/engagement/sequences
```

### Get Engagement Metrics

```
GET /workspaces/{workspace_id}/engagement/metrics
```

**Response:**
```json
{
  "totalSequences": 500,
  "openRate": 32.5,
  "clickRate": 15.2,
  "responseRate": 8.4,
  "respondedLeads": 42
}
```

---

## Agent Status

### Get Agent Status

```
GET /workspaces/{workspace_id}/agents/status
```

**Response:**
```json
{
  "workspaceId": "uuid",
  "jobs": [
    {
      "id": "uuid",
      "agentType": "lead_search",
      "status": "completed",
      "itemsProcessed": 42,
      "createdAt": "2025-03-15T10:00:00Z",
      "completedAt": "2025-03-15T10:05:00Z"
    }
  ],
  "agentTypes": [
    "icp_analysis",
    "lead_search",
    "qualification",
    "engagement",
    "optimization"
  ]
}
```

---

## Error Responses

Todos los errores devuelven:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "BadRequest"
}
```

### Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- **Starter**: 10,000 requests/month (~333/day)
- **Professional**: 100,000 requests/month (~3,333/day)
- **Enterprise**: Unlimited

Respuesta cuando se excede límite:
```json
{
  "statusCode": 429,
  "message": "Rate limit exceeded"
}
```

---

## Webhooks

Configura webhooks en el dashboard para recibir eventos en tiempo real:

- `lead.discovered`
- `lead.qualified`
- `lead.engaged`
- `lead.converted`
- `campaign.started`
- `campaign.completed`

**Webhook Payload:**
```json
{
  "event": "lead.qualified",
  "timestamp": "2025-03-15T10:30:00Z",
  "data": {
    "leadId": "uuid",
    "score": 85,
    "qualificationStatus": "hot"
  }
}
```

---

Para más detalles, visita: https://docs.leadgen-saas.com
