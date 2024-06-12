IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Tabla_Departamento]') AND type in (N'U'))
CREATE TABLE Tabla_Departamento (
    idDepartamento INT PRIMARY KEY,
    nombreDepartamento NVARCHAR(255) NOT NULL
);

GO

-- Crear la tabla Usuario si no existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Tabla_Usuario]') AND type in (N'U'))
CREATE TABLE Tabla_Usuario (
    nombre NVARCHAR(255) NOT NULL,
    primerApellido NVARCHAR(255) NOT NULL,
    segundoApellido NVARCHAR(255),
    dni NVARCHAR(20) NOT NULL,
    login NVARCHAR(50) NOT NULL,
    contraseña NVARCHAR(255) NOT NULL,
    fotografía VARBINARY(MAX), -- Asumiendo que se guarda la fotografía en formato binario
    idDepartamento INT NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (dni),
    CONSTRAINT FK_Usuario_Departamento FOREIGN KEY (idDepartamento) REFERENCES Tabla_Departamento (idDepartamento)
);

GO

-- Insertar usuario admin
IF NOT EXISTS (SELECT * FROM Tabla_Departamento WHERE idDepartamento = 1)
INSERT INTO Tabla_Departamento (idDepartamento, nombreDepartamento)
VALUES (1, 'Administración');
INSERT INTO Tabla_Departamento (idDepartamento, nombreDepartamento)
VALUES (2, 'Marketing');


IF NOT EXISTS (SELECT * FROM Tabla_Usuario WHERE dni = '47595645C')
INSERT INTO Tabla_Usuario (nombre, primerApellido, segundoApellido, dni, login, contraseña, idDepartamento)
VALUES ('Admin', 'Admin', 'Admin', '47595645C', 'admin', 'admin123', 1);
