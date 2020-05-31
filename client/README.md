# Tomáš Kudláč's portfolio

Repository hosting the codebase of the portfolio developed by Tomáš Kudláč available in English at: https://tomaskudlac.sk/en?ref=github and in Slovak at: https://tomaskudlac.sk
/?ref=github.

## About project

The project is built using the Vue framework, is written in TypeScript and uses the Vue Class Component package to structure the component logic. The project uses Vue Router, Vuex
, DayJS for date manipulation, fetch for HTTP requests and Numeric Range package made by myself. All images are formatted in both the modern WebP format and JPEG
 format for compatibility reasons
. The project is modularized, which means the code is structured into semi-independent modules which handle different parts of the application.

## Directory structure

    .
    ├── dist                        # The directory the project is built into.
    ├── node_modules                # External Node.js packages required to either run or build the application.
    ├── public                      # Files which are not modified by the building process.
    |   ├── ie                          # Version shown to the IE users.
    |   └── img                         # Images.
    |       └── icons                       # All sizes of the fav icon required to run on various devices.
    ├── src (module)                # Files which are the core of the application, they are altered during the building process. The code is structured via a module system
    . The /src directory being the main module itself. Subdirectories shown in the /src directory represent all possible subdirectories, even though, some of them are not
     directly in the directory. Each module is nestable, should be independent from the other modules on the same level, e.g. the alert module should not depend on other modules
     , but if there were multiple modules which depend on the same logic they should be wrapped into a parent module and be included in the modules subdirectory of the parent
      module. The nesting has a similar logic to the Vue Router routes.
    |   ├── assets                      # Images.
    |   ├── components                  # Vue components.
    |   ├── locales                     # Locales of each supported language in a JSON-like format.
    |   ├── modules                     # Children (nested) modules.
    |   ├── plugins                     # JS libraries.
    |   ├── router                      # Routes.
    |   ├── store                       # Data and logic related to the module and all children modules.
    |   ├── styles                      # CSS.
    |   ├── types                       # Types related to the module.
    |   ├── views                       # Route views.
    |   ├── App.vue                     # Root file of the Virtual DOM.
    |   ├── main.ts                     # Entry file of the application.
    |   ├── polyfiils.js                # Polyfills used for cross-browser compatibility.
    |   ├── registerServiceWorker.ts    # Registers a service worker.
    |   ├── shims-tsx.d.ts              # TS definition for JSX.
    |   └── shims-vue.d.ts              # TS definition for .vue files.
    ├── .editorconfig               # Config of an IDE.
    ├── .eslintrc.js                # Config of ESLint.
    ├── .gitignore                  # List of files to be ignored by Git.
    ├── babel.config.js             # Config of the Babel library.
    ├── package.json                # Project metadata.
    ├── package-lock.json           # Project metadata.
    ├── postcss.config.ts           # Config of the PostCSS library.
    ├── README.md                   # Project description.
    ├── tsconfig.json               # Config of the TypeScript compiler.
    ├── vue.config.ts               # Config of Vue.
    └── webp.ts                     # Converts JPEG to WEBP format.
    
    
## Project setup

The portfolio is build via Vue CLI and contains all default npm commands provided by the CLI.
```
npm install                     # Project setup.
npm run serve                   # Compiles and hot-reloads for development.
npm run build                   # Compiles and minifies for production.
npm run lint                    # Lints and fixes files.
```

## License
The Tomáš Kudláč's portfolio is licensed under an [MIT License](https://opensource.org/licenses/MIT).
