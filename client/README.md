# Front-end of the Tomáš Kudláč's portfolio

Front-end of the portfolio developed by Tomáš Kudláč available in English at: [https://tomaskudlac.sk/en](https://tomaskudlac.sk/en?ref=github) and in Slovak at: [https://tomaskudlac.sk](https://tomaskudlac.sk/?ref=github).

## About project

The project is built in Vue 3, is written in TypeScript and uses the new Composition API to structure the component logic. The project uses Vue Router, global store using the new reactive system, DayJS for date manipulation, fetch for HTTP requests. All images are formatted in both the modern WebP format and less optimized JPEG
 format for compatibility reasons. The project is modularized, which means the code is structured into semi-independent modules which handle different parts of the application.

## Directory structure

    .
    ├── public                      # Files which are not modified by the building process.
    |   ├── ie                          # Version shown to the IE users.
    |   ├── images                      # Images.
    |   ├── icons                       # All sizes of the fav icon required to run on various devices.
    |   ├── manifest_en.webmanifest     # Web app manifest for the English version. 
    |   └── manifest_sk.webmanifest     # Web app manifest for the Slovak version. 
    ├── src                         # Part of the application which has to be built before using in the browser, it contains all of the application logic and most of the application code.
    |   ├── components                  # Vue components.
    |   ├── locales                     # Locales of each supported language in a JSON-like format.
    |   ├── store                       # Data and logic related to the module and all children modules.
    |   ├── utils                       # Helper functions.
    |   ├── views                       # Route views.
    |   ├── App.vue                     # Root file of the Virtual DOM.
    |   ├── main.ts                     # Entry file of the application.
    |   ├── register-service-worker.ts  # Registers a service worker.
    |   ├── router.ts                   # Routes. 
    |   └── shims-vue.d.ts              # TS definition for .vue files.
    |   └── vite-env.d.ts               # TS definition for custom env variables.
    ├── .editorconfig               # Config of an IDE.
    ├── .gitignore                  # List of files to be ignored by Git.
    ├── index.html                  # The entry HTML file.
    ├── package.json                # Project metadata.
    ├── package-lock.json           # Project metadata.
    ├── README.md                   # Project description.
    ├── tsconfig.json               # Config of the TypeScript compiler.
    └── vite.config.mts             # Config of Vite.
    └── vitest.config.mts           # Config of Vitest.
    
    
## Project setup

The portfolio is built via Vite and uses ECMAScript modules.
```
npm install                     # Project setup.
npm run serve                   # Compiles and hot-reloads for development.
npm run build                   # Compiles and minifies for production.
```

## License
The Tomáš Kudláč's portfolio is licensed under the [MIT License](https://opensource.org/licenses/MIT).
