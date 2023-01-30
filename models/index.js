const config = require('../db-config');
const knex = require('knex')(config);
const { Model, snakeCaseMappers } = require('objection');

Model.knex(knex);

class BaseModel extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

class Instrument extends BaseModel {
    static get tableName() {
        return 'instruments';
    }

    // TODO static get jsonSchema() { ... }
}

class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    $beforeInsert(_queryContext) {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate(_opt, _queryContext) {
        this.updated_at = new Date().toISOString();
    }

    // TODO static get jsonSchema() { ... }
}

module.exports = {
    Instrument, User,
};
