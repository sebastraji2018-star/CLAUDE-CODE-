# ⚡ Quickstart Guide

## 5-Minute Installation & Setup

### Prerequisites
- Docker & Docker Compose installed
- Anthropic API key (free tier available)
- 4GB RAM minimum

### Step 1: Install (2 minutes)

```bash
# Clone this repository
git clone https://github.com/yourcompany/lead-gen-saas.git
cd lead-gen-saas

# Make install script executable
chmod +x scripts/install.sh

# Run installation
./scripts/install.sh
```

The script will:
- Copy .env.example to .env
- Start Docker containers
- Initialize databases
- Give you the access URLs

### Step 2: Configure API Key (1 minute)

```bash
# Edit .env and add your Anthropic API key
nano .env

# Find this line and add your key:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Get a free key at: https://console.anthropic.com

### Step 3: Access Dashboard (1 minute)

Once services are running, access:
- **Dashboard**: http://localhost:3000
- **API**: http://localhost:5000/api/v1

### Step 4: Create Account & Workspace (1 minute)

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create your account
4. Create a workspace (e.g., "My Sales Team")

## First Results in 10 Minutes

### Load Sample Data

```bash
# Create test_data.csv
cat > test_data.csv << 'EOF'
email,name,company,industry,jobTitle,companySize,budgetRange,conversionStatus,dealValue
john@acme.com,John Smith,ACME Corp,Technology,VP Sales,500-1000,$100k-500k,customer,150000
jane@techco.com,Jane Wilson,TechCo,Software,CTO,100-500,$50k-100k,customer,75000
bob@startup.io,Bob Johnson,StartupInc,Tech,CEO,10-50,$10k-50k,lead,0
alice@finance.com,Alice Brown,FinanceCo,Finance,CFO,1000+,$500k+,customer,500000
EOF

# Upload via API
curl -X POST http://localhost:5000/api/v1/workspaces/{YOUR_WORKSPACE_ID}/data-import/upload \
  -H "Authorization: Bearer {YOUR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "fileName": "test_data.csv",
  "fileType": "csv",
  "records": [
    {"email":"john@acme.com","name":"John Smith","company":"ACME Corp","industry":"Technology","jobTitle":"VP Sales","conversionStatus":"customer","dealValue":150000}
  ]
}
EOF
```

Or use the Dashboard:
1. Go to "Data Import"
2. Click "Upload CSV"
3. Select test_data.csv
4. Click "Import"

### Generate ICP

```bash
# Generate from uploaded data
curl -X POST http://localhost:5000/api/v1/workspaces/{YOUR_WORKSPACE_ID}/icp/generate \
  -H "Authorization: Bearer {YOUR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Enterprise Tech Buyers"}'
```

Or via Dashboard:
1. Go to "ICP Generation"
2. Click "Generate from Historical Data"
3. Review the AI-generated profiles
4. Click "Activate"

### Agents Start Working 24/7

Once ICP is active, agents automatically start:

✅ **Lead Search Agent** - Finds matching prospects
✅ **Qualification Agent** - Scores leads (0-100)
✅ **Engagement Agent** - Sends personalized messages
✅ **Analytics Agent** - Tracks ROI

### View Results

Go to Dashboard → Analytics to see:
- Leads generated today
- Leads qualified
- Engagement metrics
- ROI calculation

## Full Feature Tour

### Create a Campaign

```bash
curl -X POST http://localhost:5000/api/v1/workspaces/{WORKSPACE_ID}/campaigns \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "name": "Enterprise Q2 Outreach",
    "icpId": "{ICP_ID}",
    "channels": ["email", "linkedin"]
  }'
```

### Monitor Leads

```bash
# Get all leads
curl -X GET http://localhost:5000/api/v1/workspaces/{WORKSPACE_ID}/leads \
  -H "Authorization: Bearer {TOKEN}"

# Get hot leads (highest priority)
curl -X GET "http://localhost:5000/api/v1/workspaces/{WORKSPACE_ID}/leads?qualificationStatus=hot" \
  -H "Authorization: Bearer {TOKEN}"
```

### Check ROI Metrics

```bash
curl -X GET http://localhost:5000/api/v1/workspaces/{WORKSPACE_ID}/analytics/roi \
  -H "Authorization: Bearer {TOKEN}"

# Response:
{
  "leadsGenerated": 42,
  "conversions": 2,
  "conversionRate": 4.8,
  "costPerLead": 11.90,
  "roi": 15840
}
```

### Get Agent Status

```bash
curl -X GET http://localhost:5000/api/v1/workspaces/{WORKSPACE_ID}/agents/status \
  -H "Authorization: Bearer {TOKEN}"
```

## Troubleshooting

### Services not starting?

```bash
# Check if Docker is running
docker ps

# View logs
docker-compose logs -f

# Restart everything
docker-compose down
docker-compose up -d
```

### Port already in use?

```bash
# Change ports in docker-compose.yml
# Or kill existing process
lsof -i :5000
kill -9 <PID>
```

### Need to reset database?

```bash
# WARNING: This deletes all data
docker-compose down -v
docker-compose up -d
```

## Next Steps

1. **Read Full Docs**: Check [README.md](./README.md)
2. **API Reference**: See [API.md](./API.md)
3. **Examples**: Look at [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)
4. **Deploy to Production**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Sell to Customers**: Use [SALES_PITCH.md](./SALES_PITCH.md)

## Quick Commands

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose stop

# Start services
docker-compose start

# Rebuild images
docker-compose build --no-cache

# Reset everything
docker-compose down -v
docker-compose up -d

# Check health
docker-compose ps
```

## Support

- 📖 Full Documentation: [README.md](./README.md)
- 🔌 API Docs: [API.md](./API.md)
- 📦 Deploy Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💼 Sales Guide: [SALES_PITCH.md](./SALES_PITCH.md)
- 📧 Email: support@leadgen-saas.com

---

**Ready to start?**

```bash
./scripts/install.sh
```

Then access http://localhost:3000 🚀
