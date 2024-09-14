# Tomáš Kudláč's Portfolio

Repository hosting the codebase of the portfolio developed by Tomáš Kudláč. You can view the portfolio in:

- [English version](https://tomaskudlac.sk/en?ref=github)
- [Slovak version](https://tomaskudlac.sk/?ref=github)

## About the Project

This portfolio is structured into two semi-independent projects, located in the following subdirectories:

- **client**: Contains the front-end code of the application, built using the Vue.js framework. The current version is
  developed in Vue 3. To explore the previous version of the project built with Vue 2, visit
  the [vue-2](https://github.com/Thomasan1999/tomaskudlac/tree/vue-2) branch.

- **server**: Contains the back-end code, which is not published for security reasons. However, parts that do not
  compromise security might be available in future updates.

## Project Setup

### Utility Scripts

- `npm run format` - Formats the code using Prettier.
- `npm run format:check` - Checks the code formatting with Prettier without modifying it.
- `npm run lint` - Lints the code using ESLint.
- `npm run test:run` - Runs the tests once.
- `npm run test:watch` - Runs the tests and re-runs them when any test file changes.
- `npm run type-check` - Checks the code for type validity.

## Technologies Used

- Husky - used for extending Git hooks
- Prettier - ensures consistent code formatting

## Directory Structure

```
.
├── .github              # Contains code used by GitHub
│   ├── actions          # GitHub actions
│   └── workflows        # GitHub workflows
├── .husky               # Contains Husky scripts
│   ├── commit-msg       # Lints commit messages
│   └── pre-push         # Validates code to be pushed
├── client               # Front-end (Vue application)
├── server               # Back-end, not published for security reasons
├── .gitignore           # Files ignored by Git
├── .prettierrc.json     # Prettier configuration file
├── commitlint.config.ts # Commitlint configuration file
└── README.md            # Project description
```

More detailed structures are available within their respective subdirectories.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
