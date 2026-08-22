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

The repository is an npm workspace, so a single `npm install` at the root covers both, and there is one lockfile.

`server/` runs PHP. `client/index.html` is a PHP template rather than plain HTML - it carries `<?= $lang ?>` and
`<?= $locales[...] ?>` tags that the server fills in per language - and the frontend builds straight into
`server/public`. A build opened as a static file will therefore show those tags unrendered. The client also expects
one endpoint, `POST /contact-form/send-mail`, which takes the form as `FormData`; its English error strings are used
directly as locale keys, so changing them on the server changes what the site displays.

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

This installs the `client/` workspace as well.

## Available Scripts

Run these commands from the repository root:

- `npm run build` - builds the frontend for production into `server/public`
- `npm run format` - formats repository files with Prettier
- `npm run format:check` - checks formatting without writing changes
- `npm run lint` - runs frontend ESLint checks
- `npm run lint:fix` - runs frontend ESLint checks and applies safe fixes
- `npm run serve` - starts the Vite dev server on http://localhost:8082
- `npm run test:coverage` - runs the unit tests with coverage
- `npm run test:run` - runs the unit tests once
- `npm run test:watch` - runs the unit tests in watch mode
- `npm run test:e2e` - runs the Puppeteer end-to-end tests, which start the dev server themselves
- `npm run test:all` - runs both test projects
- `npm run type-check` - checks types

For frontend-only details, see [client/README.md](https://github.com/Thomasan1999/tomaskudlac/blob/master/client/README.md).

## Repository Layout

```text
.
|-- .github/            # GitHub workflows and related automation
|-- .nvmrc              # Node version used locally and in CI
|-- client/             # Public frontend application
|-- server/             # Backend-related code (not fully published)
|-- commitlint.config.ts
|-- package.json        # Workspace definition, shared tooling and proxy scripts
`-- README.md
```

## License

The source code is licensed under the [MIT License](LICENSE).

The site content - the biographical texts in `client/src/locales/`, the photographs in `client/public/images/` and
the name - is not covered by it and remains All Rights Reserved. Fork the code freely; please put your own content
in it.
