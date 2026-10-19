# 📷 DIGICAM — Pro Cameras & Accessories Store

A fullstack e-commerce web platform for professional cinematography cameras, mirrorless systems, cine prime lenses, gimbal stabilizers, audio transmitters, and field production accessories.

---

## 📁 Repository Structure

```text
digitalCam/
├── .gitignore              # Root gitignore (protects secrets & node_modules)
├── package.json            # Root monorepo scripts for dev & build
├── vercel.json             # Vercel fallback configuration
├── README.md               # Deployment and setup guide
│
├── Frontend/               # React 19 + Vite Frontend SPA
│   ├── public/             # Static assets (images, icons)
│   │   └── images/         # Camera & gear photography
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Footer, Modals, Cart)
│   │   ├── pages/          # Pages (Home, Deals, Dashboard, Admin)
│   │   ├── config/
│   │   │   └── api.js      # Dynamic API base URL & image resolver
│   │   ├── App.jsx         # Routes & Application shell
│   │   └── main.jsx        # Entry point
│   ├── .env.example        # Frontend environment variable template
│   ├── .gitignore          # Frontend-specific gitignore
│   ├── vercel.json         # SPA rewrites to prevent 404s on reload
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite build configuration
│
└── Backend/                # Express.js + Mongoose REST API
    ├── controller/         # API controllers & business logic
    ├── model/              # MongoDB schemas
    ├── public/images/      # Uploaded media storage
    ├── .env.example        # Backend environment template
    ├── .gitignore          # Backend-specific gitignore (hides .env)
    ├── app.js              # Express application entry
    └── package.json        # Backend dependencies
```

---

## 🚀 Step 1: Push to GitHub

Open your terminal in the **root** folder (`digitalCam/`):

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Check status (verify that node_modules and .env are NOT listed)
git status

# 3. Stage all properly configured files
git add .

# 4. Create your first commit
git commit -m "feat: setup clean camera store fullstack structure with vercel config"

# 5. Rename branch to main
git branch -M main

# 6. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# 7. Push to GitHub
git push -u origin main
```

> **Security Note:** Your `Backend/.env` (containing your MongoDB credentials) is automatically ignored by `.gitignore` so your secrets will never be exposed on GitHub.

---

## ⚡ Step 2: Deploy Frontend on Vercel

### Method A: Connect through Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository (`YOUR_REPOSITORY_NAME`).
4. In the **Configure Project** screen:
   - **Project Name:** `digitalcam-store` (or any name you choose)
   - **Framework Preset:** `Vite` (Vercel will auto-detect this)
   - **Root Directory:** Click **Edit** and select `Frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. *(Optional)* In **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-api.onrender.com` (your live backend URL when ready)
6. Click **Deploy**.

Your frontend will be live in seconds at a URL like `https://digitalcam-store.vercel.app`! Deep links and page reloads (`/Login`, `/Signup`, `/Listproducts`) will work seamlessly thanks to [Frontend/vercel.json](./Frontend/vercel.json).

---

## 🔌 Step 3: Deploy Backend (Render, Railway, or VPS)

Since Vercel is designed for serverless frontends and static sites, long-running Node/Express backends (`app.listen` with MongoDB and file uploads) are best hosted on **Render**, **Railway**, or **Fly.io**:

### Deploying to Render (Free Tier Available):
1. Go to [render.com](https://render.com) and connect your GitHub repo.
2. Choose **Web Service**.
3. Set **Root Directory** to `Backend`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `npm start`.
6. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `DB_URL`: `your_mongodb_atlas_connection_string`
7. Once deployed, copy your Render URL (e.g., `https://digitalcam-backend.onrender.com`).
8. Paste that URL into your Vercel Project Settings → **Environment Variables** as `VITE_API_URL`.

---

## 💻 Local Development

Run the frontend and backend locally with standard commands:

### Run Frontend:
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

### Run Backend:
```bash
cd Backend
npm install
# Ensure Backend/.env exists with PORT=5000 and DB_URL=...
npm run dev
```
Backend runs at `http://localhost:5000`.
