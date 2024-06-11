class User {
    constructor(nombre, primerApellido, segundoApellido, dni, login, contrasenya, fotografia, departamento) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.dni = dni;
        this.login = login;
        this.contrasenya = contrasenya;
        this.fotografia = fotografia;
        this.departamento = departamento;
    }
}

module.exports = User;
