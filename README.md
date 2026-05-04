# Mini SaaS Template Store

A full-stack web application built as part of the Full Stack Web Developer Intern Technical Task. It allows users to register, login, view templates, and mark templates as favorites.

## Tech Stack

- **Frontend:** React.js (Vite), TailwindCSS, React Router, Axios, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Using Knex.js as Query Builder)
- **Authentication:** JWT (JSON Web Tokens) with bcryptjs for password hashing

## Features

- **Authentication:** Register and Login securely.
- **Templates List:** View a seeded list of pre-designed templates.
- **Filters & Search:** Search templates by keyword or filter them by category (Bonus Feature).
- **Favorites:** Mark templates as favorites, and view them in a dedicated protected route.
- **Responsive UI:** Clean, modern, and responsive user interface built with TailwindCSS.

## Setup Instructions

### 1. Backend Setup

Open a terminal and navigate to the `server` directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Run database migrations to set up the SQLite schema:

```bash
npx knex migrate:latest
```

Seed the database with sample templates:

```bash
npx knex seed:run
```

Start the backend server (runs on `http://localhost:5000` by default):

```bash
npm start
```
*Note: For development, you can use `npm run dev` to start with nodemon.*

### 2. Frontend Setup

Open a new terminal and navigate to the `client` directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will usually run on `http://localhost:5173`. Open this URL in your browser.

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate a user and receive a JWT

### Templates
- `GET /api/templates` - Fetch all templates (accepts `?search=` and `?category=` queries)
- `GET /api/templates/:id` - Fetch details of a single template

### Favorites (Requires Auth Token)
- `GET /api/favorites` - Fetch logged-in user's favorite templates
- `POST /api/favorites/:templateId` - Toggle a template as favorite/un-favorite

## Contact

- **Name:** [Your Name]
- **Contact:** [Your Email/Portfolio]
