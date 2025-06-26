@echo off
REM AI Learning Platform Development Scripts
REM Run from project root directory

echo 🚀 AI Learning Platform Development Helper
echo ==========================================

if "%1"=="setup" goto setup
if "%1"=="dev" goto dev
if "%1"=="test" goto test
if "%1"=="build" goto build
if "%1"=="clean" goto clean
if "%1"=="reset-db" goto reset_db
if "%1"=="help" goto help
if "%1"=="" goto help
goto unknown

:setup
echo 🔧 Setting up AI Learning Platform...

REM Backend setup
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please edit backend/.env with your database and OpenAI credentials
)

REM Database setup
echo 🗃️  Setting up database...
call npx prisma generate
call npx prisma migrate dev --name init

REM Seed data
echo 🌱 Seeding database...
call npm run seed
call npm run create-admin

cd ..

REM Frontend setup
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ Setup completed!
echo.
echo 🎯 Next steps:
echo 1. Edit backend/.env with your credentials
echo 2. Run 'dev.bat dev' to start development servers
echo 3. Open http://localhost:3000 in your browser
echo.
echo 👨‍💼 Admin credentials:
echo Name: Admin User
echo Phone: 0500000000
goto end

:dev
echo 🚀 Starting development servers...

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo 🔧 Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo ✅ Development servers started!
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo 📍 API Docs: http://localhost:5000/api-docs
echo.
echo Press any key to return to menu...
pause > nul
goto end

:test
echo 🧪 Running tests...

REM Backend tests
echo 🔧 Running backend tests...
cd backend
call npm test
cd ..

REM Frontend tests
echo 🎨 Running frontend tests...
cd frontend
call npm test -- --coverage --watchAll=false
cd ..

echo ✅ All tests completed!
goto end

:build
echo 🏗️  Building production version...

REM Build backend
echo 🔧 Building backend...
cd backend
call npm run build
cd ..

REM Build frontend
echo 🎨 Building frontend...
cd frontend
call npm run build
cd ..

echo ✅ Build completed!
echo 📦 Backend build: backend\dist\
echo 📦 Frontend build: frontend\build\
goto end

:clean
echo 🧹 Cleaning project...

echo 🗑️  Removing node_modules...
if exist "backend\node_modules" rmdir /s /q "backend\node_modules"
if exist "frontend\node_modules" rmdir /s /q "frontend\node_modules"

echo 🗑️  Removing build files...
if exist "backend\dist" rmdir /s /q "backend\dist"
if exist "frontend\build" rmdir /s /q "frontend\build"

echo ✅ Project cleaned!
goto end

:reset_db
echo 🔄 Resetting database...
cd backend
call npx prisma migrate reset --force
call npm run seed
call npm run create-admin
cd ..
echo ✅ Database reset completed!
goto end

:help
echo Available commands:
echo.
echo 🔧 setup        - Initial project setup
echo 🚀 dev          - Start development servers
echo 🧪 test         - Run all tests
echo 🏗️  build        - Build production version
echo 🧹 clean        - Clean node_modules and build files
echo 🔄 reset-db     - Reset and reseed database
echo ❓ help         - Show this help
echo.
echo Usage: dev.bat ^<command^>
goto end

:unknown
echo ❌ Unknown command: %1
goto help

:end
