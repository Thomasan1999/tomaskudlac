# Front-end of Tomáš Kudláč's Portfolio

Front-end of the portfolio developed by Tomáš Kudláč. You can view the portfolio in:

- [English version](https://tomaskudlac.sk/en?ref=github)
- [Slovak version](https://tomaskudlac.sk/?ref=github)

## Project Setup


### Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/package-manager).
2. Run `npm install`.

### Utility Scripts
- `npm run build` - Builds the code for production.
- `npm run format` - Formats the code using Prettier.
- `npm run format:check` - Checks the code format using Prettier without modifying it.
- `npm run lint` - Lints the code using ESLint.
- `npm run serve` - Compiles and hot-reloads for development.
- `npm run test:run` - Runs the tests once.
- `npm run test:watch` - Runs the tests and re-runs them on any test file changes.
- `npm run type-check` - Checks the code for type validity.

## Technologies Used

- Vue 3 - SPA framework
    - Composition API
    - `<script setup>`
- Vite - bundles files for development and production
- Typescript - ensures more safe and readable code
- Tailwind - scalable and more readable CSS
- Vue Router - navigation
- fetch - HTTP requests
- DayJS - date manipulation
- Vitest - unit/component tests
- Puppeteer - E2E tests
- ESLint - ensures code consistency and prevents bugs
- Prettier - ensures consistent code formatting
- vue-tsc - type checking

## Directory Structure

```
.
├── public                          # Files not modified by the build process
│   ├── ie                          # Version for Internet Explorer users
│   ├── images                      # Image assets
│   ├── icons                       # Favicon in various sizes for different devices
│   ├── manifest_en.webmanifest     # Web app manifest for English
│   └── manifest_sk.webmanifest     # Web app manifest for Slovak
├── src                             # Application logic (needs to be built for browser use)
│   ├── components                  # Vue components
│   ├── locales                     # JSON-like locales for each supported language
│   ├── store                       # Global store and module-related logic
│   ├── utils                       # Helper functions
│   ├── views                       # Route views
│   ├── App.vue                     # Root file for the Virtual DOM
│   ├── main.ts                     # Application entry point
│   ├── register-service-worker.ts  # Service worker registration
│   ├── router.ts                   # Routes configuration
│   ├── shims-vue.d.ts              # TypeScript definition for Vue files
│   └── vite-env.d.ts               # TS definition for custom environment variables
├── .editorconfig                   # IDE configuration
├── .gitignore                      # Files ignored by Git
├── eslint.config.mjs               # ESLint configuration file
├── index.html                      # Entry HTML file
├── package.json                    # Project metadata
├── package-lock.json               # Project metadata
├── README.md                       # Project description
├── postcss.config.ts               # PostCSS configuration file
├── tailwind.config.ts              # Tailwind configuration file
├── tsconfig.json                   # TypeScript compiler configuration
├── vite.config.mts                 # Vite configuration
└── vitest.config.mts               # Vitest configuration
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
