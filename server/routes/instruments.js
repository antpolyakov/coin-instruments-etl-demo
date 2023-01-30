const { Instrument } = require("../../models");

module.exports = (fastify) => {
    fastify.get('/instruments', {
        onRequest: [ fastify.validateJwtAccess ],
    }, async (request, reply) => {
        const instruments = await Instrument.query();
        return reply.send(instruments);
    });

    fastify.get('/instruments/:symbol', {
        onRequest: [ fastify.validateJwtAccess ],
    }, async (request, reply) => {
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

    return fastify;
};
