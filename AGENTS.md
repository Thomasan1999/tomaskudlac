# AGENTS.md

## Purpose

This repository contains Tomáš Kudláč's portfolio site.

- `client/`: public frontend built with Vue 3, Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, and Vitest
- `server/`: backend-related directory, intentionally not published in full

The repository is an npm workspace: install once from the root, and there is one lockfile.

The primary active codebase is the frontend in `client/`.

## Working Agreement

- Prefer making changes inside `client/` unless the task is clearly repository-wide.
- Keep edits small and aligned with the existing structure and naming.
- Do not expose or recreate hidden backend implementation details.
- Preserve existing formatting and linting conventions.

## Common Commands

Run from the repository root:

- `npm run format` - formats repository files with Prettier
- `npm run lint` - runs frontend ESLint checks from `client/`
- `npm run lint:fix` - runs frontend ESLint checks with automatic fixes from `client/`
- `npm run serve` - starts the Vite dev server on port 8082
- `npm run test:run` - runs the unit tests once
- `npm run test:watch` - runs the unit tests in watch mode
- `npm run test:e2e` - runs the Puppeteer end-to-end tests, starting the dev server itself
- `npm run test:all` - runs both test projects
- `npm run type-check` - runs Vue TypeScript checks without emitting output
- `npm run build` - builds the production frontend bundle from `client/`

## Frontend Notes

- Framework: Vue 3 with TypeScript
- Bundler/dev server: Vite
- Testing: Vitest, split into a `unit` project (jsdom) and an `e2e` project (node + Puppeteer)
- State: Pinia
- Routing: Vue Router
- Styling: Tailwind CSS 4
- Icons: Font Awesome

## Validation Checklist

After code changes in `client/`, prefer this order:

1. `npm run format`
2. `npm run lint`
3. `npm run type-check`
4. `npm run test:run` (and `npm run test:e2e` when routing or navigation changed)

For documentation-only or workflow-only changes, run only the relevant checks.

## Git Notes

- The default branch in this repository is `master`.
- Commit messages are not checked locally. Commitlint runs in CI against the pull request title, so that is what has to be a valid conventional commit.
- When updating dependencies, use `deps` as the commit scope.
- When a change is AI-related, use `ai` as the commit scope.
