const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = (fastify) => {
    const createJwt = (user) => {
        const { id, email } = user;
        const payload = {
            sub: id,
            name: email,
            iat: Math.round(Date.now() / 1000),
        };
        return fastify.jwt.sign(payload);
    };

    fastify.post('/users/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string', minLength: 5, maxLength: 72 }
                },
                required: ['email', 'password']
            }
        },
    }, async (request, reply) => {
        const { email, password } = request.body;
        const existentUser = await User.query().findOne({ email });
        if (existentUser) {
            return reply.code(400).send({ statusCode: 400, error: "User Exists", message: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.query().insertAndFetch({
            email,
            password: hashedPassword,
        });

        const token = createJwt(newUser);
        return reply.code(201).send({ token });
    });

    fastify.post('/users/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: {type: 'string'},
                    password: {type: 'string', minLength: 5, maxLength: 72}
                },
                required: ['email', 'password']
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body;

        const user = await User.query().findOne({ email });
        if (!user) {
            return reply.code(400).send({ statusCode: 400, error: "Access Denies", message: "Invalid email or password"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return reply.code(400).send({ statusCode: 400, error: "Access Denies", message: "Invalid email or password"});
        }

        const token = createJwt(user);
        return reply.code(201).send({ token });
    });

    fastify.get('/users/verify_session', {
        onRequest: [ fastify.validateJwtAccess ]
    }, async (request, reply) => {
        return reply.code(200).send({ ok: true });
    });

    return fastify;
};
