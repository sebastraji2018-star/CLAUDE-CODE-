@echo off
REM Lead Generation SaaS - Windows Installation Script
REM Simply double-click this file to install

setlocal enabledelayedexpansion

echo.
echo ================================================
echo 🚀 Lead Generation SaaS - Installation
echo ================================================
echo.

REM Check if Docker is installed
echo Checking Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Docker is not installed!
    echo.
    echo Please download and install Docker Desktop:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker found
echo.

REM Copy .env file
echo Setting up .env file...
if not exist ".env" (
    copy ".env.example" ".env" >nul
    echo ✅ Created .env file
) else (
    echo ✅ .env file already exists
)

echo.
echo Building Docker images...
echo This may take a few minutes...
echo.

docker-compose build

if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo Starting services...
docker-compose up -d

if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to start services!
    pause
    exit /b 1
)

echo.
echo ✅ Waiting for services to start...
timeout /t 10 /nobreak

echo.
echo Checking status...
docker-compose ps

echo.
echo ================================================
echo ✅ INSTALLATION COMPLETE!
echo ================================================
echo.
echo 🌐 Open your browser and go to:
echo    http://localhost:3000
echo.
echo 📊 API endpoint:
echo    http://localhost:5000/api/v1
echo.
echo 💡 Next steps:
echo    1. Open http://localhost:3000
echo    2. Create an account
echo    3. Upload your customer data
echo    4. Let AI agents generate leads!
echo.
echo 📋 To view logs, run:
echo    docker-compose logs -f
echo.
pause
