# AI Learning Platform 🧠

A full-stack learning platform with AI-powered personalized lessons. Built with TypeScript, React, Node.js, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or Docker)
- OpenAI API key

### Setup
```bash
# 1. Clone and install
git clone [your-repo]
cd ai-learning-platform

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials

# 3. Database (Docker option)
docker-compose up -d

# 4. Database migrations
npx prisma migrate dev
npm run seed
npm run create-admin

# 5. Start backend
npm run dev

# 6. Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Admin Login
- Phone: `0500000000`
- Set password during `create-admin` script

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **AI-Powered Learning**: OpenAI integration for personalized lessons
- **Category Management**: Organized learning topics
- **Learning History**: Track and review past interactions
- **Admin Dashboard**: User and content management
- **TypeScript**: Full type safety throughout
- **Material-UI**: Professional, responsive design
- **Testing**: Comprehensive test coverage

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Redux Toolkit, Material-UI
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT API
- **Testing**: Jest, Supertest
- **Documentation**: Swagger/OpenAPI

## 📁 Project Structure

```
ai-learning-platform/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── config/               # Configuration files
│   │   ├── modules/              # Feature modules
│   │   │   ├── users/           # User management
│   │   │   ├── categories/      # Category management
│   │   │   ├── subcategories/   # Subcategory management
│   │   │   └── prompts/         # AI prompt handling
│   │   ├── utils/               # Utilities and middleware
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── features/            # Feature-based components
│   │   │   ├── auth/           # Authentication (Login/Register)
│   │   │   ├── user/           # User management & protection
│   │   │   ├── categories/     # Category management
│   │   │   ├── prompts/        # AI prompts
│   │   │   └── admin/          # Admin dashboard
│   │   ├── pages/              # Page components
│   │   ├── routes/             # React Router setup
│   │   ├── app/                # Redux store
│   │   ├── config/             # App configuration
│   │   ├── theme/              # MUI theme
│   │   └── shared/             # Shared utilities
│   │       ├── components/     # Reusable UI components
│   │       ├── hooks/          # Custom React hooks
│   │       ├── utils/          # Utility functions
│   │       ├── api/            # API client & helpers
│   │       └── types/          # TypeScript types
│   └── package.json
├── docker-compose.yml          # PostgreSQL database setup
└── README.md
```

## � Database Setup

### Option 1: Docker (Recommended)
```bash
# Start PostgreSQL with Docker
cd backend
docker-compose up -d

# Run migrations
npx prisma migrate dev
```

### Option 2: Local PostgreSQL
```bash
# Install PostgreSQL locally and configure .env
# DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"
```

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"
JWT_SECRET="your-super-secret-jwt-key"
OPENAI_API_KEY="sk-your-openai-api-key"
PORT=5000
```

### Frontend (.env.local - optional)
```env
REACT_APP_API_URL="http://localhost:5000"
```

## � Quick Development Scripts

For easier development workflow, use the provided scripts:

### Windows
```bash
# Initial setup
dev.bat setup

# Start development servers
dev.bat dev

# Run tests
dev.bat test

# Build for production
dev.bat build
```

### Linux/Mac
```bash
# Make script executable
chmod +x dev.sh

# Initial setup
./dev.sh setup

# Start development servers
./dev.sh dev

# Run tests
./dev.sh test

# Build for production
./dev.sh build
```

## �🔧 Development Workflow

### Code Quality & Testing
```bash
# Backend
cd backend
npm test                  # Run tests
npm run test:coverage     # Coverage report
npm run build            # TypeScript compilation

# Frontend  
cd frontend
npm test                 # Run tests
npm run build           # Production build
```

### API Documentation
- Development: `http://localhost:5000/api-docs`
- Interactive Swagger UI with request/response examples
- Complete endpoint documentation with schemas

### Monitoring & Health Checks
## 🧪 Testing

### Backend
```bash
cd backend
npm test                 # Run tests
npm run test:coverage    # Coverage report
```

### Frontend
```bash
cd frontend
npm test                # Run tests
npm test -- --coverage # Coverage report
```

## 🔧 Development

### API Documentation
- Swagger UI: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

### Build for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

---

**Built with modern web technologies for learning and portfolio purposes**
