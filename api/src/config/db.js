const sql = require('mssql');

const config = {
    user: 'admin',
    password: 'admin1234',
    server: 'localhost', // Ajusta esto al nombre de tu servidor
    port: 1434,
    database: 'Aqua',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a MSSQL');
        return pool;
    })
    .catch(err => {
        console.log('Error de conexión a la base de datos:', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};
