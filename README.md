# Proyecto Integrado: Aplicaciones en Angular, Android y .NET Framework V1.0

Este proyecto integra tres tecnologías diferentes (Angular, Android y .NET Framework) para desarrollar aplicaciones que interactúan con una API RESTful y una conexión de sockets TCP/IP.

## Estructura del Proyecto

El proyecto está dividido en cuatro carpetas principales:

1. **api**: Servidor Node.js que implementa una API RESTful y una conexión de sockets TCP/IP. (Se debe ejecutar primero)
2. **angular-app**: Aplicación web desarrollada con Angular. (Actualmente implementa todas las funcionalidades de la API)
3. **android-app**: Aplicación móvil desarrollada con Android en Java. (Actualmente implementa las funcionalidades de login y visualización de perfil de usuario)
4. **net-app**: Aplicación de escritorio desarrollada con .NET Framework y Windows Forms. (Actualmente implementa las funcionalidades de login y visualización de perfil de usuario)

## Configuración del Servidor Node.js

### Instalación

1. Navega a la carpeta del servidor:

   ```sh
   cd api
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

### Configuración

 1. Cambiar datos de conexión a la base de datos en el archivo `db.js`:

```javascript
const config = {
      user: 'username',
      password: 'password',
      server: 'URL',
      port: int,
      database: 'dbname',
      options: {
            encrypt: false,
            enableArithAbort: true
      }
};
```

 2. En la base de datos SQL Server, ejecutar el script `startup.sql` para crear la base de datos y la tabla de usuarios. Con los primeros datos de puesta en marcha.

### Ejecución

1. Inicia el servidor:

   ```sh
   node app.js
   ```

### Rutas de la API

- **POST /api/login**: Endpoint para iniciar sesión.
- **GET /api/users/:dni**: Endpoint para obtener el perfil de usuario.
- **PUT /api/users/password**: Endpoint para actualizar la contraseña de un usuario.
- **DELETE /api/users**: Endpoint para borrar un usuario.
- **GET /api/users**: Endpoint para obtener todos los usuarios.
- **POST /api/users**: Endpoint para crear un usuario.

### Sockets

El servidor también admite conexiones de sockets para el login y la obtención del perfil de usuario.

## Aplicación Angular

### Configuración

1. Navega a la carpeta de Angular:

   ```sh
   cd angular-app
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

### Ejecución

1. Inicia la aplicación Angular:

   ```sh
   ng serve
   ```

### Funcionalidades

- **Login**
- **Visualización del perfil de usuario**
- **Visualización de usuarios**
- **Actualización de contraseña**
- **Borrado de usuario**

## Aplicación Android

### Configuración

1. Abre el proyecto en Android Studio.
2. Configura la URL de la API en `ApiService.java`:

   ```java
   private static final String BASE_URL = "http://localhost:3000/api/";
   ```

### Ejecución

1. Conecta tu dispositivo o inicia un emulador.
2. Ejecuta la aplicación desde Android Studio.

### Funcionalidades

- **Login**
- **Visualización del perfil de usuario**

## Aplicación .NET Framework

### Configuración

1. Abre el proyecto en Visual Studio.
2. Configura la URL de la API en `ApiService.cs`:

   ```csharp
   private readonly string _baseUrl = "http://localhost:3000/api";
   ```

### Ejecución

1. Ejecuta la aplicación desde Visual Studio.

### Funcionalidades

- **Login**
- **Visualización del perfil de usuario**

## Configuración del cliente

Asegúrate de que tu cliente pueda acceder al servidor utilizando la dirección correcta. En el caso de aplicaciones cliente que se ejecutan en un emulador o máquina virtual, utiliza `10.0.2.2` para acceder al `localhost` del host.

## Consideraciones Finales

Este proyecto es básico y, como tal, no se ha enfocado en la seguridad o la protección de los datos. La estética tampoco ha sido una prioridad en esta primera versión. En futuras iteraciones, tengo la intención de mejorar los siguientes aspectos:

- **Seguridad**: Implementar medidas de seguridad más robustas para proteger los datos del usuario.
- **Estética**: Mejorar la interfaz de usuario en todas las aplicaciones para una experiencia más agradable.
- **Funcionalidades**: Completar todas las funcionalidades planificadas e implementar todos los endpoints de la API.
- **Roadmap**: Crear un roadmap para futuras ampliaciones y mejoras, incluyendo nuevas características y optimizaciones.

---
