const { nanoid } = require("nanoid");

module.exports = {
  dependencies: { modules: ["users-web", "data", "grpc"] },
  client: { order: Infinity },

  init: async (app, users, data, grpc) => {
    const { server } = app.interfaces;

    const store = data.ensure(require("./datarc.examples"));
    const client = grpc.getClient('ric-echo');

    server.get("/examples/hello/:name?", users.get(async (ctx) => {
        const name = ctx.params.name || "world";
        if (name === "oleg") {
          throw new Error("unacceptable");
        }
        
        const resp = await client.SayHello({ name }).catch(err => null);
        return { 
          name, 
          text: resp && resp.message, 
          rand: nanoid(), 
          now: new Date()
        };
      })
    );

    store.exportApiTo(users);

    return { store };
  },
};
