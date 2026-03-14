# Tomáš Kudláč's Portfolio

Repository for Tomáš Kudláč's personal portfolio site.

Live site:

- [Slovak](https://tomaskudlac.sk/?ref=github)
- [English](https://tomaskudlac.sk/en?ref=github)
- [Czech](https://tomaskudlac.sk/cz?ref=github)

## Project Structure

This repository contains two parts:

- `client/` - the public frontend application built with Vue 3, Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, and Vitest
- `server/` - backend-related code; the full implementation is intentionally not published

The main active codebase in this repository is `client/`.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Install Dependencies

From the repository root:

```bash
npm install
```

The root `postinstall` script also installs frontend dependencies in `client/`.

## Available Scripts

Run these commands from the repository root:

- `npm run build` - builds the frontend for production into `server/public`
- `npm run format` - formats repository files with Prettier
- `npm run format:check` - checks formatting without writing changes
- `npm run lint` - runs frontend ESLint checks
- `npm run test:coverage` - runs frontend tests with coverage
- `npm run test:run` - runs frontend tests once
- `npm run test:watch` - runs frontend tests in watch mode
- `npm run type-check` - checks types

For frontend-only details, see [client/README.md](https://github.com/Thomasan1999/tomaskudlac/blob/master/client/README.md).

## Repository Layout

```text
.
|-- .github/            # GitHub workflows and related automation
|-- .husky/             # Git hooks
|-- client/             # Public frontend application
|-- server/             # Backend-related code (not fully published)
|-- commitlint.config.ts
|-- package.json        # Root workspace scripts and shared tooling
`-- README.md
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
