# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Heroku + Vercel (Recommended)

#### Backend to Heroku
```bash
# 1. Create Heroku app
heroku create your-app-name-api

# 2. Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# 3. Set environment variables
heroku config:set JWT_SECRET="your-production-jwt-secret"
heroku config:set OPENAI_API_KEY="your-openai-api-key"
heroku config:set NODE_ENV="production"

# 4. Deploy
git subtree push --prefix backend heroku main

# 5. Run migrations
heroku run npx prisma migrate deploy
heroku run npm run seed
heroku run npm run create-admin
```

#### Frontend to Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy from frontend folder
cd frontend
vercel --prod

# 3. Set environment variable in Vercel dashboard:
# REACT_APP_API_URL = https://your-app-name-api.herokuapp.com
```

### Option 2: Railway (All-in-one)

#### Backend on Railway
1. Connect your GitHub repo to Railway
2. Deploy from `/backend` folder
3. Add PostgreSQL service
4. Set environment variables:
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `DATABASE_URL` (auto-generated)

#### Frontend on Railway/Vercel
Same as above, but point `REACT_APP_API_URL` to your Railway backend.

### Option 3: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build -d

# For production, update docker-compose.prod.yml with your settings
```

## Environment Variables Checklist

### Backend (.env)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Strong secret key (generate with: `openssl rand -base64 32`)
- [ ] `OPENAI_API_KEY` - Your OpenAI API key
- [ ] `PORT` - Server port (optional, defaults to 5000)
- [ ] `NODE_ENV` - Set to "production"

### Frontend
- [ ] `REACT_APP_API_URL` - Your backend API URL

## Post-Deployment Checklist

1. [ ] Backend health check: `https://your-api.com/health`
2. [ ] API documentation: `https://your-api.com/api-docs`
3. [ ] Frontend loads correctly
4. [ ] User registration works
5. [ ] AI prompts work
6. [ ] Admin dashboard accessible
7. [ ] Database migrations applied

## Troubleshooting

### Common Issues

**Backend not starting:**
- Check `DATABASE_URL` is correct
- Ensure all environment variables are set
- Check logs: `heroku logs --tail` (for Heroku)

**Frontend API calls failing:**
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is running and accessible

**Database issues:**
- Run migrations: `npx prisma migrate deploy`
- Check database connection
- Verify PostgreSQL service is running

## Production Optimizations

### Backend
- [ ] Enable compression
- [ ] Set up rate limiting
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Enable security headers

### Frontend
- [ ] Build optimization
- [ ] CDN setup (optional)
- [ ] Error tracking (Sentry)
- [ ] Analytics (optional)

## Monitoring

### Health Checks
- Backend: `/health`
- Database: `/health/ready`
- AI Service: Check OpenAI integration

### Metrics to Monitor
- Response times
- Error rates
- Database connections
- Memory usage
- User registrations
- AI request success rate
