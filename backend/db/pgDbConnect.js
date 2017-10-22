function dbConnectionHandler() {
    const { Pool } = require('pg'),
        config = require('../config/postgresql');

    this.pool = new Pool({ connectionString: `${config.path}${config.dbname}` });

    this.pool.connect()
    .then(() => {
        console.log('\n============================\n=== PostgreSQL connected ===\n============================\n')
    })
    .catch((err) => {
        console.log('\n!!!!PostgreSQL CONNECTION ERROR!!!!\n', err)
    });
}

module.exports = new dbConnectionHandler();
