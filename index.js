module.exports = {
  dependencies: { modules: ['users-web', 'data'] },
  client: { order: Infinity },

  init: (app, users, data) => {
    const { server } = app.interfaces;

    const store = data.ensure(require('./datarc.examples'));

    server.get('/examples/hello/:name?', users.get(async ctx => {
      const name = ctx.params.name || 'world';
      if (name === 'oleg') {
        throw new Error('unacceptable');
      }
      return { name, now: new Date() };
    }));

    store.exportApiTo(users);
    
    return { store };
  }
};
