# AI Learning Platform

פלטפורמת למידה חדשנית המשלבת בינה מלאכותית לחוויית למידה מותאמת אישית.

## 🚀 תכונות

- **ממשק משתמש אינטואיטיבי**: React עם TypeScript ו-Tailwind CSS
- **API חזק**: Node.js עם Express ו-Prisma ORM
- **אבטחה מתקדמת**: אימות משתמשים ואבטחת נתונים
- **מבנה מודולרי**: ארכיטקטורה נקייה וניתנת לתחזוקה

## 🛠️ טכנולוגיות

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL/SQLite

## 📦 התקנה

### דרישות מוקדמות
- Node.js (גרסה 16 או מעלה)
- npm או yarn
- Git

### שלבי התקנה

1. **שכפול הפרויקט:**
   ```bash
   git clone https://github.com/[YOUR-USERNAME]/ai-learning-platform.git
   cd ai-learning-platform
   ```

2. **התקנת תלויות Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **התקנת תלויות Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **הגדרת מסד הנתונים:**
   ```bash
   cd ../backend
   npx prisma migrate dev
   npx prisma generate
   ```

## 🚀 הפעלה

### פיתוח מקומי

1. **הפעלת Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   השרת יעלה על http://localhost:3001

2. **הפעלת Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   האפליקציה תיפתח על http://localhost:3000

## 📁 מבנה הפרויקט

```
ai-learning-platform/
├── backend/                 # שרת API
│   ├── src/
│   │   ├── modules/        # מודולים עסקיים
│   │   │   ├── users/      # ניהול משתמשים
│   │   │   ├── categories/ # קטגוריות
│   │   │   └── prompts/    # הנחיות AI
│   │   ├── config/         # הגדרות
│   │   └── utils/          # עזרים
│   ├── prisma/             # סכימת מסד נתונים
│   └── package.json
├── frontend/               # אפליקציית React
│   ├── src/
│   │   ├── components/     # רכיבי UI
│   │   ├── features/       # תכונות עסקיות
│   │   ├── pages/          # דפים
│   │   ├── store/          # ניהול מצב
│   │   └── hooks/          # Custom Hooks
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### משתמשים
- `POST /api/users/register` - רישום משתמש חדש
- `POST /api/users/login` - התחברות
- `GET /api/users` - קבלת כל המשתמשים
- `GET /api/users/:id` - קבלת משתמש לפי ID
- `PATCH /api/users/:id` - עדכון משתמש
- `DELETE /api/users/:id` - מחיקת משתמש

## 🤝 תרומה

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📝 רישיון

הפרויקט הזה מוגן תחת רישיון MIT. ראה את קובץ `LICENSE` לפרטים נוספים.

## 📞 יצירת קשר

לשאלות או הצעות, אנא פתח issue בפרויקט או צור קשר ישירות.

---

**הערה:** הפרויקט נמצא בפיתוח פעיל. תכונות נוספות יתווספו בקרוב!
