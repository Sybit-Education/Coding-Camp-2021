# Mülli-App (Sybit Coding Camp 2021: 2.11. - 5.11.2021)

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The webbased application supports the citizens of "Landkreis Konstanz" in Germany to dispose the waste properly and to find the nearest recycling station: https://muelli.app

- Staging Build: [![Netlify Status](https://api.netlify.com/api/v1/badges/7ee1ed26-e7a2-403a-8e20-332a7216475e/deploy-status)](https://app.netlify.com/sites/d1-coding-camp/deploys)
- Production Build: [![Netlify Status](https://api.netlify.com/api/v1/badges/25d8012e-6d1a-40c6-b43b-5ed17c1204e6/deploy-status)](https://app.netlify.com/sites/muelli/deploys)

## Sybit Coding Camp 2021: 2.11. - 5.11.2021

Within the one week Sybit Coding-Camp ten teenagers were guided by
the apprentices of Sybit building the web application: "Mülli".

## Partner of the Project

The project is supported by several municipalities:
<https://airtable.com/embed/shrJyBkwkIxzvZfLh?backgroundColor=green>

![municipalities](/public/img/municipalities.png)

---

## Development

### Project setup

Please ask the existing team for the .env file. Without it no connection to Airtable can be established.

```sh
npm install
```

#### Compiles and hot-reloads for development

```sh
npm run serve
```

#### Compiles and minifies for production

```sh
npm run build
```

#### Lints and fixes files

```sh
npm run lint
```

---

#### ESLint Configuration in IntelliJ IDEA

Go to Settings and search for _ESLint_

Activate the following:

- _Automatic ESLint configuration_
- Run eslint --fix on save

## Import Locations

How to import ESRI shape files into the application?

- Useful video: <https://youtu.be/U7BPHZhCbP4>
- Tool to reorder and enhance exported CVS file: <https://www.editcsvonline.com/>
- Import CVS file into Airtable by creating new table. Then copy&paste rows to ```Location``` table.

## Contributors

<a href="https://github.com/Sybit-Education/Coding-Camp-2021/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Sybit-Education/Coding-Camp-2021" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## License

[License](LICENSE)
