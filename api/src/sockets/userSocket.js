const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../config/db');

// Función para generar un token JWT
function generateToken(user) {
    const payload = {
        dni: user.dni,
        nombre: user.nombre,
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido,
        login: user.login,
        idDepartamento: user.idDepartamento
    };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
}

const userSocket = (socket) => {
    socket.on('login', async (data) => {
        const { login, contrasenya } = data;
        console.log('Login recibido:', login, contrasenya); // Asegúrate de que los datos se reciben correctamente
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('login', sql.NVarChar, login)
                .input('contrasenya', sql.NVarChar, contrasenya)
                .query(`
                    SELECT 
                        dni, nombre, primerApellido, segundoApellido, login, idDepartamento 
                    FROM 
                        Tabla_Usuario 
                    WHERE 
                        login = @login AND contrasenya = @contrasenya
                `);

            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                const token = generateToken(user);
                socket.emit('loginResponse', { message: 'Login exitoso', token: token });
            } else {
                socket.emit('loginResponse', { message: 'Credenciales inválidas' });
            }
        } catch (err) {
            socket.emit('loginResponse', { message: 'Error al iniciar sesión', error: err });
        }
    });

    socket.on('getProfile', async (data) => {
        const { token } = data;
        try {
            const decoded = jwt.verify(token, 'secretKey');
            const pool = await poolPromise;
            const result = await pool.request()
                .input('dni', sql.NVarChar, decoded.dni)
                .query(`
                    SELECT 
                        u.dni,
                        u.nombre,
                        u.primerApellido,
                        u.segundoApellido,
                        u.login,
                        u.fotografia,
                        d.nombreDepartamento AS departamento
                    FROM 
                        Tabla_Usuario u
                    LEFT JOIN 
                        Tabla_Departamento d ON u.idDepartamento = d.idDepartamento
                    WHERE 
                        u.dni = @dni
                `);
            if (result.recordset.length > 0) {
                socket.emit('profileResponse', { profile: result.recordset[0] });
            } else {
                socket.emit('profileResponse', { message: 'Usuario no encontrado' });
            }
        } catch (err) {
            socket.emit('profileResponse', { message: 'Error al obtener el perfil', error: err });
        }
    });
};

module.exports = { userSocket };
