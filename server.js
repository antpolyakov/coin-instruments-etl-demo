const DEFAULT_PORT = 3000;

require('dotenv').config()

const fastify = require('fastify')({
    logger: true
});

// Models
const { Instrument } = require('./models');

// TODO: Plugins / mw

fastify.get('/', async (_request, _reply) => {
    return { ok: true, message: "Welcome!" };
});

fastify.get('/instruments', async (request, reply) => {
    const instruments = await Instrument.query();
    return reply.send(instruments);
});

fastify.get('/instruments/:symbol', async (request, reply) => {
    const { symbol } = request.params;
    const instrument = symbol && await Instrument.query().findOne({'instrument_symbol': symbol.toLowerCase()});

    if (instrument) {
        return reply.send(instrument);
    } else {
        return reply
            .code(404)
            .send({statusCode: 404, error: "Not Found", message: "Instrument not found"});
    }
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
