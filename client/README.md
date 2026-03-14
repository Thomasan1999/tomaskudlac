# Frontend of Tomáš Kudláč's Portfolio

Frontend application for Tomáš Kudláč's personal portfolio site.

Live site:

- [Slovak](https://tomaskudlac.sk/?ref=github)
- [English](https://tomaskudlac.sk/en?ref=github)
- [Czech](https://tomaskudlac.sk/cz?ref=github)

## Project Structure

This directory contains the public frontend built with Vue 3, Vite, TypeScript, Pinia, Vue Router, Tailwind CSS, and Vitest.

The production build output is written to `../server/public`.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Install Dependencies

From this directory:

```bash
npm install
```

## Available Scripts

Run these commands from `client/`:

- `npm run build` - builds the frontend for production
- `npm run format` - formats files with Prettier
- `npm run format:check` - checks formatting without writing changes
- `npm run lint` - runs ESLint checks
- `npm run lint:fix` - runs ESLint checks and applies safe fixes
- `npm run serve` - starts the Vite development server
- `npm run test:coverage` - runs tests with coverage
- `npm run test:run` - runs tests once
- `npm run test:ui` - opens the Vitest UI
- `npm run test:watch` - runs the tests in watch mode
- `npm run type-check` - checks types

For repository-level scripts and setup, see [README.md](https://github.com/Thomasan1999/tomaskudlac/blob/master/README.md).

## Frontend Notes

- Framework: Vue 3 with the Composition API
- Tooling: Vite 7, TypeScript, ESLint, Prettier
- State management: Pinia
- Routing: Vue Router
- Styling: Tailwind CSS 4
- Testing: Vitest, Vue Test Utils, jsdom
- Icons: Font Awesome
- PWA support: `vite-plugin-pwa`

## Directory Layout

```text
.
|-- public/            # Static assets copied as-is
|-- src/               # Application source code
|   |-- components/    # Reusable Vue components and page sections
|   |-- locales/       # Localized site content
|   |-- mocks/         # Test helpers and mocked browser behavior
|   |-- router/        # Vue Router setup and route definitions
|   |-- store/         # Pinia store and related domain models
|   |-- tests/         # End-to-end test files
|   |-- types/         # Shared TypeScript declarations
|   |-- utils/         # Small utility functions and their tests
|   |-- app.css        # Global application styles
|   |-- app.ts         # Main application file
|   |-- main.ts        # Entry point that starts the app
|   `-- register-service-worker.ts
|-- eslint.config.mjs  # ESLint configuration
|-- index.html         # HTML entry file
|-- package.json       # Frontend scripts and dependencies
|-- tsconfig.json      # TypeScript configuration
|-- vite.config.mts    # Vite configuration
`-- vitest.config.mts  # Vitest configuration
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
