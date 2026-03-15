# Lead Generation SaaS - Installation Script for Windows PowerShell
# Run as Administrator

Write-Host "=================================================" -ForegroundColor Green
Write-Host "🚀 Lead Generation SaaS - Windows Installation" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "⚠️  This script must be run as Administrator" -ForegroundColor Yellow
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Docker
Write-Host "Checking Docker..." -ForegroundColor Cyan
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker is installed: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop for Windows" -ForegroundColor Red
    Write-Host "   Download: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check Docker Compose
Write-Host "Checking Docker Compose..." -ForegroundColor Cyan
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose is installed: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Copy .env file
Write-Host "Setting up environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env and add your ANTHROPIC_API_KEY" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Build and start containers
Write-Host "Building Docker images..." -ForegroundColor Yellow
docker-compose build

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host ""
Write-Host "Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if services are running
Write-Host "Checking service health..." -ForegroundColor Yellow
Write-Host ""

$psOutput = docker-compose ps

if ($psOutput -match "Up") {
    Write-Host "✅ Services started successfully" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Installation Complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access your platform:" -ForegroundColor Cyan
    Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor Yellow
    Write-Host "  API:       http://localhost:5000/api/v1" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Open http://localhost:3000 in your browser" -ForegroundColor Yellow
    Write-Host "  2. Create a new account" -ForegroundColor Yellow
    Write-Host "  3. Upload your historical customer data" -ForegroundColor Yellow
    Write-Host "  4. Let the AI agents generate leads for you!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "View logs:" -ForegroundColor Cyan
    Write-Host "  docker-compose logs -f" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "❌ Services failed to start. Check logs:" -ForegroundColor Red
    docker-compose logs
    exit 1
}
