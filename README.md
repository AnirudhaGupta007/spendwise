# SpendWise

SpendWise is a full-stack personal finance and expense tracking web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It provides users with a clean, responsive interface to track daily income and expenses, monitor cash flow, and maintain financial visibility.

The application incorporates token-based authentication to ensure each user's financial records remain private and secure. All transactions are stored in MongoDB and associated directly with the authenticated user account.

SpendWise delivers a centralized dashboard summarizing overall financial health through dynamic metrics, paired with intuitive forms for logging and managing individual transactions.

---

## Features

- **User Authentication**: Secure user registration and login powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Protected Routing**: Client-side route guards redirect unauthenticated traffic to the login portal.
- **Financial Dashboard**: Overview cards displaying real-time metrics for Total Income, Total Expenses, and Current Balance.
- **Transaction Management**:
  - Add income and expense transactions with amount, category, description, and date.
  - View all personal transactions in a structured, paginated data table.
  - Delete individual transactions with confirmation prompts.
- **Category Classification**: Predefined categories for standard income sources (Salary, Freelance, Investment, Gift, Other) and expenses (Food, Rent, Transport, Shopping, Bills, Entertainment, Health, Education, Other).
- **Error Handling & Resilience**: Client-level React Error Boundary protection and Express centralized error middleware.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Ant Design (AntD), Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| **Styling** | Ant Design Component System, Custom CSS |
| **Tooling & Dev** | Nodemon, Concurrently, Morgan (HTTP logging), CORS, Dotenv |
| **Deployment** | Vercel |

---

## Project Architecture

```
spendwise/
├── client/                     # React Frontend
│   ├── public/                 # Static assets & index.html
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── Dashboard/      # Summary cards, transaction tables
│       │   ├── Layout/         # Header, Footer, Layout wrapper
│       │   └── ErrorBoundary.js# Top-level React error boundary
│       ├── pages/              # Routed pages (HomePage, Login, Register, AddTransaction)
│       ├── styles/             # Modular CSS stylesheets
│       ├── utils/              # Axios instance, helpers, and constants
│       ├── App.js              # Route configurations
│       └── index.js            # React root entry point
├── config/                     # Backend configurations (DB connection, categories)
├── controllers/                # Request handling logic (auth & transactions)
├── middleware/                 # Auth verification & error handling middleware
├── models/                     # Mongoose schemas (User, Transaction)
├── routes/                     # Express REST API routes
├── server.js                   # Express server entry point
├── vercel.json                 # Vercel deployment & routing configuration
└── package.json                # Root package configuration & dev scripts
```

---

## Application Flow

```
[ React Client (Port 3000) ]
            │
            │  HTTP / Axios (with Bearer Token)
            ▼
[ Express REST API (Port 5000) ]
   ├── Middleware (CORS, Morgan, Auth JWT verification)
   ├── Routes (/api/users, /api/transactions)
   └── Controllers (Business logic & hashing)
            │
            │  Mongoose ODM
            ▼
[ MongoDB Database ]
```

1. **Authentication Flow**: The user submits credentials via the React form $\rightarrow$ Express validates and verifies hashed passwords with `bcrypt` $\rightarrow$ Express signs a JWT $\rightarrow$ The client stores the token in `localStorage` and attaches it to subsequent requests via an Axios request interceptor.
2. **Data Flow**: Authenticated requests pass through the `auth` middleware, which decodes the token and attaches `req.userId` $\rightarrow$ The controller executes queries scoped exclusively to that `userId` in MongoDB $\rightarrow$ Results return as structured JSON.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (Node Package Manager)
- **MongoDB** (Local MongoDB instance or a MongoDB Atlas cluster URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnirudhaGupta007/spendwise.git
   cd spendwise
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

### Running Locally

- **Run both backend and frontend concurrently (recommended):**
  ```bash
  npm run dev:full
  ```

- **Or run services separately:**
  - **Backend** (Runs on `http://localhost:5000`):
    ```bash
    npm run dev
    ```
  - **Frontend** (Runs on `http://localhost:3000`):
    ```bash
    npm run client
    ```

---

## Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> **Note:** Never commit the `.env` file to version control. The `.gitignore` is configured to prevent sensitive files from being tracked.

---

## API Documentation

### Authentication Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/users/register` | Register a new user account | No |
| `POST` | `/api/users/login` | Authenticate user and return JWT | No |

### Transaction Routes (`/api/transactions`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/transactions` | Retrieve all transactions for the authenticated user | Yes |
| `GET` | `/api/transactions/summary` | Get financial totals (income, expense, balance) | Yes |
| `POST` | `/api/transactions` | Create a new transaction | Yes |
| `PUT` | `/api/transactions/:id` | Update an existing transaction | Yes |
| `DELETE` | `/api/transactions/:id` | Delete a transaction | Yes |

### System Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Health check endpoint returning system status | No |

---

## Future Improvements

- [ ] Visual analytics dashboard with interactive spending charts (Pie & Bar graphs).
- [ ] In-place transaction editing modal from the transaction list.
- [ ] Export transaction records to CSV and PDF formats.
- [ ] Date range filtering and keyword search in the transaction table.
- [ ] Monthly budget targets and spending alert notifications.
- [ ] Multi-currency selection and preference persistence.

---

## Author

**Anirudha Gupta**
- GitHub: [@AnirudhaGupta007](https://github.com/AnirudhaGupta007)

