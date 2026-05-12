# AI Resume Analyzer

Frontend-only React TypeScript app for uploading a resume, requesting AI analysis, reviewing scoring and highlighted feedback, rewriting bullet points, and exporting an analysis preview.

## Stack

- React 18 + TypeScript + Vite
- React Router
- TanStack React Query
- Tailwind CSS
- Jest + React Testing Library

## API Contracts

The app calls these backend endpoints through `src/lib/apiClient.ts`:

- `POST /api/upload` with multipart `file`, returns `{ uploadId, fileName, pageCount? }`
- `POST /api/analyze` with `{ uploadId, targetRole, consentAccepted }`, returns an `Analysis`
- `GET /api/analysis/:id`, returns an `Analysis`
- `POST /api/export/:analysisId` with `{ format, includeHighlights, includeRewrite }`, returns an `ExportResult`

Resume files and extracted resume text are kept in component/query memory only. The client does not write PII to localStorage/sessionStorage, analytics, URLs, or logs.

## Getting Started

```bash
npm install
npm run dev
```

## Quality Gates

```bash
npm run test
npm run build
```

## CI

GitHub Actions runs install, tests, and build on pushes and pull requests via `.github/workflows/ci.yml`.
