const { nanoid } = require("nanoid");

module.exports = {
  dependencies: { modules: ["users-web", "data"] },
  client: { order: Infinity },

  init: async (app, users, data) => {
    const { server } = app.interfaces;

    const store = data.ensure(require("./datarc.examples"));

    server.get("/examples/hello/:name?", users.get(async (ctx) => {
        const name = ctx.params.name || "world";
        if (name === "oleg") {
          throw new Error("unacceptable");
        }
        return { name, r: nanoid(), now: new Date() };
      })
    );

    store.exportApiTo(users);

    return { store };
  },
};
