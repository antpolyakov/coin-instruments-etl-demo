const DEFAULT_PORT = 3000;

require('dotenv').config()

const fastify = require('fastify')({
    logger: true
});

// TODO: Models
// TODO: Plugins / mw

fastify.get('/', async (_request, _reply) => {
    return { ok: true, message: "Welcome!" };
});

// TODO: clean-up
fastify.get('/err', async (_request, _reply) => {
    throw { error: 'unknown', message: 'Just ERROR!'};
});

const start = async () => {
    try {
        const options = {
            port: process.env.NODE_PORT || DEFAULT_PORT,
        }
        if (process.env.NODE_HOST) {
            options.host = process.env.NODE_HOST;
        }
        await fastify.listen(options);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start().then(_ => {});
