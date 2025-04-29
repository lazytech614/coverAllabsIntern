This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Custom Note Service

## Setup & Run
- `npm install`
- `npm run dev`

## Why?
- **Storage Strategy**: localStorage for zero-backend simplicity; key naming (`my-notes-app:notes`) isolates data.
- **Component Design**: separate pages under `src/app/`; shared layout for consistency.
- **State Management**: `useState` for form/state; `useEffect` for initial load sync.
- **Styling**: Tailwind CSS + shadcn/ui for rapid, consistent design.
- **Navigation**: Simple client-side `<Link>` tabs—minimal code, instant nav.
