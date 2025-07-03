# 🚀 Armstrong Number Verification Backend

A **TypeScript + Prisma + Express** backend for **Armstrong Number Verification and User Management**, designed with **clean architecture and JWT authentication**.


---

## 📂 **Project Structure**

```

📦 Backend
├── 📁 node_modules
├── 📁 prisma
│   ├── 📁 migrations              # Prisma migration folders
│   └── 📝 schema.prisma           # Prisma models: User, ArmstrongNumber
│
├── 📁 src
│   ├── 📁 controllers
│   │   ├── 📝 armstrongController.ts   # Verify Armstrong, fetch user's numbers
│   │   ├── 📝 authController.ts        # User signup & login controllers
│   │   └── 📝 userDataController.ts    # Global fetch: all users with Armstrong numbers (pagination)
│   │
│   ├── 📁 middlewares
│   │   └── 📝 authMiddleware.ts        # JWT authentication middleware to protect routes
│   │
│   ├── 📁 routes
│   │   ├── 📝 authRoutes.ts            # Routes for signup/login
│   │   ├── 📝 userDataRoutes.ts        # Route for global user data fetch
│   │   └── 📝 verificationRoutes.ts    # Routes for Armstrong verification & user numbers (protected)
│   │
│   ├── 📁 utils
│   │   └── 📝 Config.ts                # Loads environment variables (JWT_SECRET)
│   │
│   └── 📝 index.ts                     # Express app entry point, sets up middleware & routes, runs server
│
├── 📝 .env                             # Environment variables (DATABASE_URL, JWT_SECRET)
├── 📝 .env.example                     # Example env file for contributors
├── 📝 .gitignore                       # Node & environment ignores
├── 📝 package.json                     # Project dependencies & scripts
├── 📝 package-lock.json                # Exact lock versions of installed dependencies
└── 📝 README.md                        # Project documentation
```

---


## 🛠️ **Features**

✅ **User Registration & Login** (JWT-based)

✅ **Verify Armstrong Numbers**, save if true

✅ **Fetch a user's Armstrong numbers**

✅ **Global dashboard**: Fetch all users with their Armstrong numbers (with pagination)

✅ **Protected routes** with JWT middleware

✅ **PostgreSQL** database via Prisma ORM

✅ **TypeScript for type safety**

✅ **Prettier + ESLint for code consistency**


---

## ⚙️ **Tech Stack**

- **Node.js + Express**
- **TypeScript**
- **Prisma (PostgreSQL)**
- **JWT (jsonwebtoken)**
- **bcrypt (password hashing)**
- **dotenv**
- **Prettier + ESLint**

---

## 🚀 **Setup & Installation**

1️⃣ **Clone the repository**:

```bash
git clone git@github.com:Dev-kaif/ArmstrongNumber.git
cd ArmstrongNumber
```

2️⃣ **Install dependencies**:

```bash
npm install
```

3️⃣ **Setup environment variables**:

- Create a `.env` file:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_jwt_secret_key"
```

4️⃣ **Prisma setup**:

- Generate the Prisma client:

```bash
npx prisma generate
```

- Apply migrations:

```bash
npx prisma migrate dev --name init
```

- (Optional) View your DB:

```bash
npx prisma studio
```

5️⃣ **Run the server**:

```bash
npm run dev
```

Server will start on **`http://localhost:3000`**.


---


## 🛡️ **API Endpoints**

### **Auth Routes** (`/api/auth`)

- `POST /signup` – User registration
- `POST /login` – User login, returns JWT

### **Armstrong Verification** (`/api/armStrong`)

- `POST /verify` – Verify number (protected)
- `GET /number` – Get user’s Armstrong numbers (protected)

### **Global User Data** (`/api/global`)


* `POST /allUserData` – Fetch all users with their Armstrong numbers, supports pagination.


#### **Query Parameters:**

* `page` : Page number for pagination.
* `limit` : Number of users per page.


#### **Example:**

```
POST http://localhost:3000/api/global/allUserData?page=1&limit=10
```

---

## 🧩 **Prisma Models**

**User:**

- `id`: UUID
- `email`: String (unique)
- `name`: String
- `password`:String
- `createdAt`:DateTime
- `armstrongs`: Relation to ArmstrongNumber

**ArmstrongNumber:**

- `id`: UUID
- `number`: Integer
- `userId`: FK to User
- `user`: Relation to User
- `createdAt`:DateTime

---

## 🔐 **Authentication**

- JWT tokens are returned on successful login and signup.
- Protected routes require:

```
Authorization: Bearer <token>
```

header for access.

---

## 🧹 **Scripts**

- `npm run dev` – Run in development with nodemon
- `npm run build` – Compile TypeScript
- `npm run start` – Run compiled JS
- `npx prisma migrate dev` – Apply migrations
- `npx prisma generate` – Generate Prisma client
- `npx prisma studio` – Prisma DB viewer
- `npm run lint` – Run ESLint
- `npm run format` – Format with Prettier

---