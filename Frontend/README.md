# 🚀 Armstrong Checker Frontend

A **clean, minimal SaaS-style frontend** for **Armstrong Number Checker**, built with:

* ⚡ **Vite** + **React** + **TypeScript**
* 🌿 **Tailwind CSS** + **shadcn/ui** for clean components
* 🔔 **Sonner** for beautiful toast notifications
* 📡 **Axios** for API requests
* ✅ Authentication with JWT & protected routes
* 📈 Dashboard to **check Armstrong numbers**
* 📜 Paginated history with **global/user views**

---

## ✨ Features

✅ **Minimal Landing Page** with CTA to Login
✅ **Signup & Login with password validation & visibility toggle**
✅ **Protected Dashboard** with logout functionality
✅ **Armstrong Number Checker** with success/error toasts
✅ **Paginated History Table** with:

* Toggle between **User History** and **Global History**
* Pagination for global and user histories
  ✅ **Axios instance** with JWT token header injection
  ✅ **Modern UI with gradients and micro-interactions**

---

## 🛠️ Tech Stack

* **Vite** – Fast bundler and dev environment
* **React + TypeScript** – Strongly typed component architecture
* **Tailwind CSS** – Utility-first styling
* **shadcn/ui** – Accessible, composable UI primitives
* **Sonner** – Fast toast notifications
* **Axios** – API requests with interceptors
* **Prisma Backend** (connected via REST API)
* **JWT Auth** for session management

---

## ⚙️ Setup Instructions

1️⃣ **Clone the repo**

```bash
git clone <repo_url>
cd <project_folder>
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Setup Environment Variables**

Create a `.env` file in the root:

```env
VITE_BACKEND_URL=http://localhost:3000
```

4️⃣ **Run the project**

```bash
npm run dev
```

Your frontend will be live at:

```
http://localhost:5173
```

---

## 🗂️ Project Structure

```
src/
 ├── components/
 │    ├── Auth/           # Login, Signup components
 │    ├── Dashboard/      # Dashboard, History, Checker components
 │    ├── MagicUi/        # MagicCard, DotPattern for aesthetic
 │    └── ui/             # Button, Card, Table, etc. (shadcn)
 │
 ├── lib/
 │    ├── axiosInstance.ts  # Axios with JWT token header
 │    └── utils.ts          # Utility helpers
 │
 ├── App.tsx              # Entry point with routes
 └── main.tsx             # Vite main entry
```

---

## 🚀 Deployment

You can deploy easily to:

* **Vercel**
* **Netlify**
* **Cloudflare Pages**

**✅ Vercel Example:**

* Push to GitHub
* Import to Vercel
* Add `VITE_BACKEND_URL` in Vercel environment variables
* Deploy

---

## 🧩 API Endpoints Expected

* `POST /api/auth/login` – Login
* `POST /api/auth/signup` – Signup
* `POST /api/armStrong/check` – Check Armstrong Number
* `GET /api/armStrong/number` – Get user's Armstrong numbers (paginated)
* `POST /api/global/allUserData?page=1&limit=10` – Get global Armstrong numbers with pagination

---

## 🎨 Customization

* Adjust primary/secondary colors in `tailwind.config.ts` or `globals.css`.
* Adjust gradient, shadows, and animations in `MagicCard` and `DotPattern` for brand alignment.
* Update logos/text for your product branding.

---