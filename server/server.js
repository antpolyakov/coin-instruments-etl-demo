const DEFAULT_PORT = 3000;

require('dotenv').config()

const fastify = require('fastify')({
    logger: true
});

const routes = require('./routes');

// TODO auth, access checks

fastify.after(routes(fastify));

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
