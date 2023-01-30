const instruments = require('./instruments');
const users = require('./users');

module.exports = (fastify) => {
    fastify.get('/', async (_request, _reply) => {
        return { ok: true, message: "Welcome!" };
    });

    instruments(fastify);
    users(fastify);

    return fastify;
};
