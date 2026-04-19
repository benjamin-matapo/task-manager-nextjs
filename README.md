# task-manager-nextjs

A full-stack task manager built with Next.js 14. React frontend, API routes for the backend, Tailwind CSS for styling.

## What it does

- Add tasks by typing and pressing Enter or by clicking Add
- Check off tasks to mark them as done
- Delete tasks with the × button
- All data is stored in memory on the server (resets on restart)

## Tech stack
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

## How it was made

Project was scaffolded with `create-next-app`. Backend was built using Next.js API routes inside the `app/api` directory - these are serverless functions that run on the same server as the frontend, so no separate backend process is needed. Tasks are stored in a module-level array in `lib/store.ts`, which persists across requests for the lifetime of the server process.

The frontend (`app/page.tsx`) is a client component that fetches data from the API routes using the browser's built-in `fetch()`. Because the UI & API share the same origin, there are no CORS issues. When the user adds, toggles, or deletes a task, the page re-fetches the full task list and React re-renderes it.

## Project setup

```bash
git clone https://github.com/benjamin-matapo/task-manager-nextjs.git
cd task-manager-nextjs
npm install
```

## Running the app

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## How the frontend connects to the backend

User action (click/keypress) > event handler in `page.tsx` > fetch("`/api/tasks`") or fetch("`/api/tasks/:id`") > Next.js routes request to app/api/tasks/route.ts > route calls `lib/store.ts` > returns JSON > React state updates > UI renders

All API calls use relative URLs (`/api/tasks`), so thay always point to the same server the page was loaded from.

## API reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Lists all tasks |
| POST | `/api/tasks` | Creates a task | 
| PUT | `/api/tasks/:id` | Updates a task | 
| DELETE | `/api/tasks/:id` | Deletes a task | 

## Folder structure

```markdown
task-manager-nextjs/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts        # GET + POST handlers
│   │       └── [id]/
│   │           └── route.ts    # PUT + DELETE handlers
│   ├── page.tsx                # the UI
│   └── layout.tsx
├── lib/
│   └── store.ts                # in-memory task storage
├── tailwind.config.ts
├── package.json
└── README.md
```