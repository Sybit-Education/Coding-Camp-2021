# Mülli-App

[![vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The webbased application supports the citizens of "Landkreis Konstanz" in Germany to dispose the waste properly and to find the nearest recycling station: https://muelli.app

- Testsystem: [![Netlify Status](https://api.netlify.com/api/v1/badges/7ee1ed26-e7a2-403a-8e20-332a7216475e/deploy-status)](https://app.netlify.com/sites/d1-coding-camp/deploys)
- Produktiv: [![Netlify Status](https://api.netlify.com/api/v1/badges/25d8012e-6d1a-40c6-b43b-5ed17c1204e6/deploy-status)](https://app.netlify.com/sites/muelli/deploys)

## Sybit Coding Camp 2021: 2.11. - 5.11.2021

Within the one week Sybit Coding-Camp ten teenagers were guided by
the apprentices of Sybit building the web application: "Mülli".

## Partner of the Project

The project is supported by several municipalities:
<https://airtable.com/embed/shrJyBkwkIxzvZfLh?backgroundColor=green>

![municipalities](/public/img/municipalities.png)

----

## Development

### Project setup

Please ask the existing team for the .env file. Without it no connection to Airtable can be established.

```sh
npm install
```

#### Compiles and hot-reloads for development

```sh
npm run dev
```

#### Compiles and minifies for production

```sh
npm run build
```

#### Lints and fixes files

```sh
npm run lint
```

----

# Vuetify

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- 💻 **Enhanced Development Experience**: Benefit from TypeScript's static type checking and the ESLint plugin suite for Vue, ensuring code quality and consistency. [TypeScript](https://www.typescriptlang.org/) | [ESLint Plugin Vue](https://eslint.vuejs.org/)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- 🛠️ **Strongly-Typed Vue**: Use vue-tsc for type-checking your Vue components, and enjoy a robust development experience. [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

### Building for Production

To build your project for production, use:

```bash
yarn build
```

#### Lints and fixes files

```sh
npm run lint
```

----

## Import Locations

How to import ESRI shape files into the application?

- Useful video: <https://youtu.be/U7BPHZhCbP4>
- Tool to reorder and enhance exported CVS file: <https://www.editcsvonline.com/>
- Import CVS file into Airtable by creating new table. Then copy&paste rows to ```Location``` table.
