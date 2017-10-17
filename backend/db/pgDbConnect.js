function dbConnectionHandler() {
    const { Pool } = require('pg'),
        config = require('../config/postgresql');

    const pool = new Pool({ connectionString: `${config.path}${config.dbname}` });

    pool.connect()
    .then(() => {
        console.log('\n============================\n=== PostgreSQL connected ===\n============================\n')
    })
    .catch((err) => {
        console.err('!!!!PostgreSQL CONNECTION ERROR!!!!\n', err)
    });

    this.pool = pool;
}

module.exports = new dbConnectionHandler();
