const env = process.env.NODE_ENV || 'development';
const defaults = {
    client: 'better-sqlite3',
    connection: {
        filename: process.env.SQLITE3_FILENAME || "data.sqlite3",
    },
};

module.exports = require('./knexfile')?.[env] ?? defaults;
