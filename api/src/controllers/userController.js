const { poolPromise, sql } = require('../config/db');
const jwt = require('jsonwebtoken');


function isValidDNI(dni) {
    /*
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dni)) {
        return false;
    }
    const number = dni.slice(0, 8);
    const letter = dni.slice(8, 9);
    const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const calculatedLetter = validLetters[number % 23];
    return letter === calculatedLetter;
    */ 
    return dni.length === 9
}
function lengthDNI(dni){
    if (dni.length !== 9) { // Asumiendo que la longitud correcta del DNI es 9
        return res.status(400).json({ message: 'La longitud del DNI es incorrecta' });
    }
}

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

// Login de usuario
exports.login = async (req, res) => {
    const { login, contrasenya } = req.body;
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
            res.json({ message: 'Login exitoso', token: token });
        } else {
            res.status(401).send({ message: 'Credenciales inválidas' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al iniciar sesión', error: err });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                u.dni,
                u.nombre,
                u.primerApellido,
                u.segundoApellido,
                u.login,
                u.contrasenya,
                u.fotografia,
                d.nombreDepartamento AS departamento
            FROM 
                Tabla_Usuario u
            LEFT JOIN 
                Tabla_Departamento d ON u.idDepartamento = d.idDepartamento
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener usuarios', error: err });
    }
};

// Obtener un usuario por DNI
exports.getUserByDni = async (req, res) => {
    const { dni } = req.params;
    if (!isValidDNI(dni)) {
        return res.status(400).send({ message: 'DNI inválido' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('dni', sql.NVarChar, dni)
            .query(`
                SELECT 
                    u.dni,
                    u.nombre,
                    u.primerApellido,
                    u.segundoApellido,
                    u.login,
                    u.contrasenya,
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
            res.json(result.recordset[0]);
        } else {
            res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener usuario', error: err });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { nombre, primerApellido, segundoApellido, dni, login, contrasenya, fotografia, idDepartamento } = req.body;
    if (!isValidDNI(dni)) {
        return res.status(400).send({ message: 'DNI inválido' });
    }
    try {
        const pool = await poolPromise;
        
        // Verificar si el usuario ya existe
        const checkUser = await pool.request()
            .input('dni', sql.NVarChar, dni)
            .query(`
                SELECT dni FROM Tabla_Usuario WHERE dni = @dni
            `);
        
        if (checkUser.recordset.length > 0) {
            return res.status(400).send({ message: 'Usuario ya existe' });
        }
        
        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('primerApellido', sql.NVarChar, primerApellido)
            .input('segundoApellido', sql.NVarChar, segundoApellido)
            .input('dni', sql.NVarChar, dni)
            .input('login', sql.NVarChar, login)
            .input('contrasenya', sql.NVarChar, contrasenya)
            .input('fotografia', sql.NVarChar, fotografia)
            .input('idDepartamento', sql.Int, idDepartamento)
            .query(`
                INSERT INTO Tabla_Usuario (nombre, primerApellido, segundoApellido, dni, login, contrasenya, fotografia, idDepartamento)
                VALUES (@nombre, @primerApellido, @segundoApellido, @dni, @login, @contrasenya, @fotografia, @idDepartamento)
            `);
        res.status(201).send({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al crear usuario', error: err });
    }
};

// Actualizar la contrasenya del usuario
exports.updatePassword = async (req, res) => {
    const { dni, contrasenya } = req.body;
    if (!isValidDNI(dni)) {
        return res.status(400).send({ message: 'DNI inválido' });
    }
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('dni', sql.NVarChar, dni)
            .input('contrasenya', sql.NVarChar, contrasenya)
            .query(`
                UPDATE Tabla_Usuario
                SET contrasenya = @contrasenya
                WHERE dni = @dni
            `);
        res.send({ message: 'Contraseña actualizada exitosamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar contrasenya', error: err });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { dni, userDni } = req.body;
    if (!isValidDNI(dni) || !isValidDNI(userDni)) {
        return res.status(400).send({ message: 'DNI inválido' });
    }
    try {
        const pool = await poolPromise;

        // Verificar si el usuario que intenta borrar pertenece al departamento de Administración
        const adminCheck = await pool.request()
            .input('userDni', sql.NVarChar, userDni)
            .query(`
                SELECT idDepartamento FROM Tabla_Usuario WHERE dni = @userDni
            `);
        
        if (adminCheck.recordset.length === 0 || adminCheck.recordset[0].idDepartamento !== 1) {
            return res.status(403).send({ message: 'No tiene permisos para eliminar usuarios' });
        }

        // Verificar si el usuario a eliminar existe
        const userCheck = await pool.request()
            .input('dni', sql.NVarChar, dni)
            .query(`
                SELECT dni FROM Tabla_Usuario WHERE dni = @dni
            `);
        
        if (userCheck.recordset.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        await pool.request()
            .input('dni', sql.NVarChar, dni)
            .query(`
                DELETE FROM Tabla_Usuario
                WHERE dni = @dni
            `);
        res.send({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar usuario', error: err });
    }
};
