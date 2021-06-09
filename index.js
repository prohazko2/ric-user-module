module.exports = {
  dependencies: { modules: ['users-web', 'data'] },
  client: { order: Infinity },

  init: (app, users, data) => {
    const { server } = app.interfaces;

    const store = data.ensure(require('./datarc.examples'));

    server.get('/examples/hello/:name?', users.get(async ctx => {
      return {
        now: new Date()
      };
    }));

    store.exportApiTo(users);
    
    return { store };
  }
};
