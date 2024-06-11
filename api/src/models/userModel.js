class User {
    constructor(nombre, primerApellido, segundoApellido, dni, login, password, fotografia, departamento) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.dni = dni;
        this.login = login;
        this.password = password;
        this.fotografia = fotografia;
        this.departamento = departamento;
    }
}

module.exports = User;
