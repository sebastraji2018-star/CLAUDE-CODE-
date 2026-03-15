#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Lead Generation SaaS - Installation Script${NC}"
echo "=================================================="
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Copy .env file
echo -e "${YELLOW}Setting up environment variables...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env and add your ANTHROPIC_API_KEY${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi
echo ""

# Build and start containers
echo -e "${YELLOW}Building Docker images...${NC}"
docker-compose build

echo ""
echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

echo ""
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}Checking service health...${NC}"

if docker-compose ps | grep -q "healthy\|up"; then
    echo -e "${GREEN}✅ Services started successfully${NC}"
    echo ""
    echo -e "${GREEN}🎉 Installation Complete!${NC}"
    echo ""
    echo "Access your platform:"
    echo -e "${YELLOW}  Frontend:  http://localhost:3000${NC}"
    echo -e "${YELLOW}  API:       http://localhost:5000/api/v1${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Open http://localhost:3000 in your browser"
    echo "  2. Create a new account"
    echo "  3. Upload your historical customer data"
    echo "  4. Let the AI agents generate leads for you!"
    echo ""
    echo "View logs:"
    echo "  docker-compose logs -f"
    echo ""
else
    echo -e "${RED}❌ Services failed to start. Check logs:${NC}"
    docker-compose logs
    exit 1
fi
