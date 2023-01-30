const DEFAULT_PORT = 3000;
const DEFAULT_JWT_SECRET = 'bHFlfvWoGTivhNBZoHC1bymKBvVUJk36vbetW6cmXXN';

require('dotenv').config();

const fastify = require('fastify')({
    logger: true,
});

// Routes
const routes = require('./routes');

// Authentication / access control
fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
});
fastify.decorate('validateJwtAccess', async (request, reply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
});

// TODO user check, 'instrument_access' check
// fastify.decorate('validateUserAccess', async (request, reply) => {
//     console.log(request.user);
// });

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
