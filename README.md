# React + TypeScript + GraphQL Records UI

A typed frontend for your NestJS GraphQL + Elasticsearch + Redis backend.

## Features
- Toolbar with **Search (adaptive suggestions), Filter popup, Column customization, Sort dropdown**
- Server-side **pagination** and **filtering**
- **Type-safe** interfaces for all schema entities
- Built with **Vite**, **React**, **MUI**, **Apollo Client**

## Setup
```bash
cp .env.example .env    # set VITE_GRAPHQL_URL if needed
npm install
npm run dev
```
Open http://localhost:5173

## Notes
- Suggestions are derived from top search results for simplicity. If you expose a `suggestions` query, wire it in `getSuggestions` for better UX.
- Column visibility is persisted in memory (Zustand). You can persist to localStorage if desired.
- Date filters use `datetime-local` inputs and send ISO strings to GraphQL.
