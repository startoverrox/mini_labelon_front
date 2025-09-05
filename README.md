# MiniLabelon Frontend

This is a frontend project for MiniLabelon.

## Feature

1. Signup, Signin, Signout
2. Main page (/)
3. job page (job/:role/)

## Tech stack

1. React Vite TypeScript
2. Tailwind CSS v4
3. React Router v7
4. Zustand
5. Axios

## Current structure

```
├── src
│   ├── assets/            # images, icons
│   ├── components/        # shared components
│   ├── routes/            # react-router
│   ├── services/          # axios requests
│   ├── store/             # zustand store
│   ├── types/             # typescript types
│   ├── utils/             # utility functions
│   ├── App.tsx            # main app component
│   ├── global.css         # global styles
│   ├── vite.config.ts     # vite config
│   ├── ...
```

## Env spec

```bash
node -v # 22.12.0
npm -v # 10.9.0
```

## 1. Project Install

```bash
npm install
```

## 2. Project Run

```bash
npm run dev
# open http://localhost:3000 in the browser
```

## 3. Project Deploy

```bash
# run this command to stop the container
docker compose down

# after db, backend are deployed, run this command to start the container
docker compose up --build -d

# if you are running locally, open http://localhost:3000 in the browser
# if you are running on the server, open http://hostIP(domain):3000 in the browser
```
