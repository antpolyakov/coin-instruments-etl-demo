const instruments = require('./instruments');

module.exports = (fastify) => {

    fastify.get('/', async (_request, _reply) => {
        return { ok: true, message: "Welcome!" };
    });

    instruments(fastify);

    // TODO users(fastify);

    return fastify;
};