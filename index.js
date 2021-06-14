const nanoid = require("nanoid");
const yaml = require("yaml");

module.exports = {
  dependencies: { modules: ["users-web", "data", "grpc"] },
  client: { order: Infinity },

  init: async (app, users, data, grpc) => {
    const { server } = app.interfaces;

    const store = data.ensure(require("./datarc.examples"));
    const client = grpc.getClient("ric-echo");

    /* 01. store value hook */
    store.guard("yaml", async (value, operation) => {
      if (!value) {
        return;
      }
      if (value.length > 4000) {
        throw new Error("yaml field too large");
      }
      operation.data.props = yaml.parse(value)
    });

    /* 02. store event hook */
    store.listen("before-remove").local(async ({ item }) => {
      if (item.name === "oleg") {
        throw new Error("unacceptable");
      }
    });

    /* 03. custom route */
    server.get("/examples/hello/:name?", users.get(async (ctx) => {
      const name = ctx.params.name || "world";
      if (name === "oleg") {
        throw new Error("unacceptable");
      }
      const count = {
        objects: (await data.objects.find(ctx, {})).length,
        models: (await data.models.find(ctx, {})).length,
      };
      const resp = await client.SayHello({ name }).catch(err => err);

      return { 
        name, 
        count,
        text: resp && resp.message, 
        rand: nanoid(),
        now: new Date()
      };
    }));

    /* 04. static page route */
    server.get("/examples/page/:name?", users.get(async (ctx) => {
      const tpl = `${__dirname}/templates/server-page.jade`;
      const name = ctx.params.name || "world";
      ctx.renderTo(tpl, { name });
    }));

    store.exportApiTo(users);

    return { store };
  },
};
