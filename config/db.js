const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'distSystems',
    password: 'Sipal1128',
    port: 5432,
});

module.exports = pool;
