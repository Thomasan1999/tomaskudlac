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
- `npm run format` - formats files changed on the branch relative to `origin/master`, including local changes and untracked files
- `npm run format:all` - formats all repository files with Prettier
- `npm run format:check` - checks the same branch changes without writing changes; CI checks files changed in the pull request
- `npm run format:check:all` - checks all repository files without writing changes
- `npm run lint` - checks frontend files changed on the branch relative to `origin/master`, including local changes and untracked files; CI checks PR changes
- `npm run lint:all` - checks the full frontend
- `npm run lint:fix` - checks the same branch changes and applies safe fixes
- `npm run lint:fix:all` - checks the full frontend and applies safe fixes
- `npm run serve` - starts the Vite dev server on http://localhost:8082
- `npm run test:coverage` - runs the unit tests with coverage
- `npm run test:run` - runs unit tests affected by branch changes relative to `origin/master`, including transitive imports and local changes
- `npm run test:run:all` - runs all unit tests once
- `npm run test:watch` - runs the unit tests in watch mode
- `npm run test:e2e` - runs the Puppeteer end-to-end tests, which start the dev server themselves
- `npm run test:all` - runs both test projects
- `npm run type-check` - checks the full project using TypeScript's incremental cache

For frontend-only details, see [client/README.md](https://github.com/Thomasan1999/tomaskudlac/blob/master/client/README.md).

Lint checks individual files with the current ESLint rules; source imports do not require rerunning lint on their
dependents. Changes to lint configuration, dependencies, TypeScript configuration, or the shared selection scripts
run lint over the full frontend. Deleted files and non-code files are skipped.

Type checking always covers the full project, including source dependencies and global declarations. TypeScript
stores incremental information in `node_modules/.cache/type-check.tsbuildinfo`; CI restores this cache when the
dependency lockfile, TypeScript configuration, and Node version match. A missing cache triggers a fresh check.

Unit test selection follows Vitest's import graph, including indirect dependencies. Changes to dependencies,
TypeScript/Vite/Vitest configuration, declarations, shared tooling, or dynamically loaded locales run all unit tests. `test:run` exits successfully
when no tests are affected; `test:run:all`, `test:coverage`, and `test:all` always run their full suites.

CI keeps the full unit coverage run and its repository-wide thresholds. The e2e job selects tests from PR changes;
any application source, HTML, or public asset change runs all browser tests because their dependencies are loaded
through the dev server rather than imported into the test modules.

## Repository Layout

```text
.
|-- .github/            # GitHub workflows and related automation
|-- .nvmrc              # Node version used locally and in CI
|-- client/             # Public frontend application
|-- server/             # Backend-related code (not fully published)
|-- commitlint.config.ts
|-- package.json        # Workspace definition, shared tooling and proxy scripts
|-- tsconfig.json       # TypeScript configuration for the frontend and repository scripts
`-- README.md
```

## License

The source code is licensed under the [MIT License](LICENSE).

The site content - the biographical texts in `client/src/locales/`, the photographs in `client/public/images/` and
the name - is not covered by it and remains All Rights Reserved. Fork the code freely; please put your own content
in it.
