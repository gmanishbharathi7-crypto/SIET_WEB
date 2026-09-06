# SIET MERN Website

A MERN application for Sri Shakthi Institute of Engineering & Technology.

## Project structure

```text
SIET_WEB/
├── client/                 # React + Vite frontend
│   ├── public/             # Brand, media and template assets
│   └── src/
│       ├── App.jsx         # React application shell
│       ├── main.jsx        # React entry point
│       ├── styles.css      # Site styles
│       └── legacy/site.js  # Existing routes and page renderer
├── server/                 # Node.js + Express API
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Request handlers
│   ├── middleware/         # API middleware
│   ├── models/             # Mongoose models
│   └── routes/             # Express routes
├── legacy/template-pages/  # Archived source template pages
└── package.json            # Root development orchestration
```

## Run locally

Requires Node.js 18 or newer. The dependencies are pinned to versions compatible with Node.js 18.

```bash
npm install
npm run install:all
cp .env.example .env
npm run dev
```

The React/Vite client runs on `http://127.0.0.1:5173` and proxies `/api` to the Express API on port `5050`. Port 5050 avoids common macOS system-service conflicts on port 5000. Add `MONGODB_URI` to persist admission enquiries. Without MongoDB, the UI remains fully usable and the API clearly returns demo-mode status.

If MongoDB is not installed locally, leave `MONGODB_URI` blank in `.env`. The site will still run; only enquiry persistence will remain in demo mode.

## Production

```bash
npm run build
NODE_ENV=production npm start
```

## Vercel

The repository is configured as an npm workspace. Vercel installs the React,
Vite, Express and Mongoose workspace dependencies from the root lockfile, builds
the client, publishes `client/dist`, and exposes the Express app through the
`api/` serverless entry points. Add `MONGODB_URI` and `CLIENT_URL` in the Vercel
project environment settings when persistent enquiry submissions are required.

Current institutional facts and outbound links were checked against the official website at https://www.siet.ac.in/ in August 2026. The brand mark is implemented as a replaceable text/SVG lockup because the live origin blocks direct asset retrieval.
# SIET_WEB
