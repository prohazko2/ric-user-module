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

or with [docker](https://github.com/prohazko2/ric-build-root)

#### [10-main](./10-main/index.tsx)

- use 3rd-party [`react-grid-layout`](https://github.com/react-grid-layout/react-grid-layout) library as example
- use `module.save` API to persist layout changes (`PATCH /examples/:id`)
- listen module events (`select` and `staged`)

#### [20-top](./20-top/index.tsx)

- use bundled [`mobx`](https://github.com/mobxjs/mobx) library for state managment
- listen `WebSocket` events (`object-packet`)
- use `objects` base module for navigation and formatting

#### [30-api](./30-api/index.tsx)
- call custom API method `GET /examples/hello/:name?`

#### [40-inject](./40-inject/)
- inject custom [page](./40-inject/page.tsx) to `objects` module
- inject custom [view](./40-inject/view.js) to `objects` module (also no `react` or `ts`)

![server routes](./assets/paths.png)


- `GET /examples`
- `POST /examples` - create new item
- `PATCH /examples/:id` - update any item
- `DELETE /examples/:id` - delete any item
