#!/bin/bash

# AI Learning Platform Development Scripts
# Run from project root directory

echo "🚀 AI Learning Platform Development Helper"
echo "=========================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    if ! command_exists node; then
        echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    if ! command_exists npm; then
        echo "❌ npm is not installed."
        exit 1
    fi
    
    if ! command_exists psql; then
        echo "⚠️  PostgreSQL client not found. Database operations may not work."
    fi
    
    echo "✅ Prerequisites check completed"
}

# Setup function
setup() {
    echo "🔧 Setting up AI Learning Platform..."
    
    # Backend setup
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    
    # Check if .env exists
    if [ ! -f .env ]; then
        echo "📝 Creating .env file from template..."
        cp .env.example .env
        echo "⚠️  Please edit backend/.env with your database and OpenAI credentials"
    fi
    
    # Database setup
    echo "🗃️  Setting up database..."
    npx prisma generate
    npx prisma migrate dev --name init
    
    # Seed data
    echo "🌱 Seeding database..."
    npm run seed
    npm run create-admin
    
    cd ..
    
    # Frontend setup
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    echo "✅ Setup completed!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Edit backend/.env with your credentials"
    echo "2. Run 'npm run dev' to start development servers"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo "👨‍💼 Admin credentials:"
    echo "Name: Admin User"
    echo "Phone: 0500000000"
}

# Development function
dev() {
    echo "🚀 Starting development servers..."
    
    # Check if backend dependencies are installed
    if [ ! -d "backend/node_modules" ]; then
        echo "📦 Installing backend dependencies..."
        cd backend && npm install && cd ..
    fi
    
    # Check if frontend dependencies are installed
    if [ ! -d "frontend/node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        cd frontend && npm install && cd ..
    fi
    
    # Start backend in background
    echo "🔧 Starting backend server..."
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Wait a bit for backend to start
    sleep 3
    
    # Start frontend
    echo "🎨 Starting frontend server..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    echo "✅ Development servers started!"
    echo "📍 Backend: http://localhost:5000"
    echo "📍 Frontend: http://localhost:3000"
    echo "📍 API Docs: http://localhost:5000/api-docs"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    
    # Wait for user interrupt
    trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
    wait
}

# Test function
test() {
    echo "🧪 Running tests..."
    
    # Backend tests
    echo "🔧 Running backend tests..."
    cd backend
    npm test
    cd ..
    
    # Frontend tests
    echo "🎨 Running frontend tests..."
    cd frontend
    npm test -- --coverage --watchAll=false
    cd ..
    
    echo "✅ All tests completed!"
}

# Build function
build() {
    echo "🏗️  Building production version..."
    
    # Build backend
    echo "🔧 Building backend..."
    cd backend
    npm run build
    cd ..
    
    # Build frontend
    echo "🎨 Building frontend..."
    cd frontend
    npm run build
    cd ..
    
    echo "✅ Build completed!"
    echo "📦 Backend build: backend/dist/"
    echo "📦 Frontend build: frontend/build/"
}

# Clean function
clean() {
    echo "🧹 Cleaning project..."
    
    echo "🗑️  Removing node_modules..."
    rm -rf backend/node_modules
    rm -rf frontend/node_modules
    
    echo "🗑️  Removing build files..."
    rm -rf backend/dist
    rm -rf frontend/build
    
    echo "✅ Project cleaned!"
}

# Reset database function
reset_db() {
    echo "🔄 Resetting database..."
    cd backend
    npx prisma migrate reset --force
    npm run seed
    npm run create-admin
    cd ..
    echo "✅ Database reset completed!"
}

# Help function
help() {
    echo "Available commands:"
    echo ""
    echo "🔧 setup        - Initial project setup"
    echo "🚀 dev          - Start development servers"
    echo "🧪 test         - Run all tests"
    echo "🏗️  build        - Build production version"
    echo "🧹 clean        - Clean node_modules and build files"
    echo "🔄 reset-db     - Reset and reseed database"
    echo "❓ help         - Show this help"
    echo ""
    echo "Usage: ./dev.sh <command>"
}

# Main script logic
case "$1" in
    "setup")
        check_prerequisites
        setup
        ;;
    "dev")
        dev
        ;;
    "test")
        test
        ;;
    "build")
        build
        ;;
    "clean")
        clean
        ;;
    "reset-db")
        reset_db
        ;;
    "help"|"")
        help
        ;;
    *)
        echo "❌ Unknown command: $1"
        help
        exit 1
        ;;
esac
