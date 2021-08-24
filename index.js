const nanoid = require("nanoid");
const yaml = require("yaml");

module.exports = {
  dependencies: { modules: ["users-web", "data", "grpc"] },
  client: { order: Infinity },

  init: async (app, users, data, grpc) => {
    const { server } = app.interfaces;
    const echoer = grpc.getClient("ric-echo");

    const store = data.ensure(require("./datarc.examples"));
    store.exportApiTo(users);

    
    /* store value hook */
    store.guard("yaml", async (value, operation) => {
      if (!value) {
        return;
      }
      if (value.length > 4000) {
        throw new Error("yaml: field too large");
      }
      operation.data.props = yaml.parse(value);
    });

    /* store event hook */
    store.listen("before-remove").local(async ({ item }) => {
      if (item.name === "oleg") {
        throw new Error("unacceptable");
      }
    });

    /* custom api route */
    server.get("/examples/hello/:name?", users.get(async (ctx) => {
      const name = ctx.params.name || "world";

      const count = {
        objects: (await data.objects.find(ctx, {})).length,
        models: (await data.models.find(ctx, {})).length,
      };

      const resp = await echoer.SayHello({ name }).catch(err => err);

      return { 
        name, 
        count,
        query: ctx.query,
        text: resp && resp.message, 
        rand: nanoid(),
        now: new Date()
      };
    }));

    /* custom html page */
    server.get("/examples/page/:name?", users.get(async (ctx) => {
      const path = `${__dirname}/templates/server-page.jade`;
      const name = ctx.params.name || "world";
      ctx.renderTo(path, { name });
    }));

    return { store };
  },
};
