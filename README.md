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
