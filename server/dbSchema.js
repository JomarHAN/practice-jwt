const Pool = require('pg').Pool;

const pool = new Pool({
    user: "jomarnguyen",
    password: "jomar22",
    host: "localhost",
    port: 5432,
    database: "practice"
})

module.exports = pool;