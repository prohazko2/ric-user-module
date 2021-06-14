# Rightech IoT user module example

Basic user module for [Rightech IoT](https://rightech.io/) platform.


```
.
├── datarc.examples.js   # Example data store manifest
├── index.js             # Server module entrypoint (js only)
├── js/index.ts          # Client module entrypoint (ts, tsx, js, jsx)
├── assets               # Client resources - icons, styles, files, etc
└── templates            # Static pug templates (client or server)
```

### Install

```sh
> cd ric-web
> git clone https://github.com/prohazko2/ric-user-module user_modules/examples

> npm run build:user
> npm start
```
