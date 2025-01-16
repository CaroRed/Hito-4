# Hito-4
## API de Usuarios y Libros

Esta API permite gestionar usuarios y libros. Proporciona endpoints para la autenticación de usuarios, así como la creación, actualización, eliminación y obtención de información sobre usuarios y libros.

La API está desarrollada utilizando **Node.js** con **Express.js**, y usa **Sequelize** como ORM para interactuar con la base de datos. Además, se puede ejecutar fácilmente utilizando **Docker**.

## Tecnologías utilizadas
- **Node.js** con **Express.js**
- **Sequelize** como ORM
- **Postgres** (u otra base de datos compatible con Sequelize)
- **JWT** para autenticación
- **Docker** para facilitar la ejecución y despliegue
- **Swagger (OpenAPI 3.0)** para la documentación

## Instalación y ejecución

### Requisitos previos
- Tener instalado **Docker** y **Docker Compose**

## Endpoints principales
La url de API es:
```
http://localhost:3000/api/v1/
```

### Autenticación
#### Login
**POST** `/auth/login`
```json
{
  "email": "demo@test.com",
  "password": "123123"
}
```
Respuesta exitosa:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

#### Registro de usuario
**POST** `/auth/register`
```json
{
  "email": "nuevo@usuario.com",
  "password": "securepassword"
}
```

### Usuarios
#### Obtener todos los usuarios
**GET** `/users/` (Requiere Bearer Token)

#### Crear usuario
**POST** `/users/`
```json
{
  "email": "usuario@test.com",
  "password": "123456"
}
```

#### Obtener un usuario por ID
**GET** `/users/{id}` (Requiere Bearer Token)

#### Actualizar un usuario
**PUT** `/users/{id}` (Requiere Bearer Token)

#### Eliminar un usuario
**DELETE** `/users/{id}` (Requiere Bearer Token)

### Libros
#### Obtener todos los libros
**GET** `/books/` (Requiere Bearer Token)

#### Crear libro
**POST** `/books/`
```json
{
  "isbn": "978-3-16-148410-0",
  "name": "El Quijote",
  "pages": 500
}
```

#### Obtener un libro por ID
**GET** `/books/{id}` (Requiere Bearer Token)

#### Actualizar un libro
**PUT** `/books/{id}` (Requiere Bearer Token)

#### Eliminar un libro
**DELETE** `/books/{id}` (Requiere Bearer Token)

## Uso de Sequelize
Sequelize se utiliza como ORM para la interacción con la base de datos. Las migraciones y modelos están configurados en la carpeta `/models/`.

## Uso de Docker
El proyecto incluye un `docker-compose.yml` para facilitar su ejecución en contenedores.



## Autenticación
Todas las rutas protegidas requieren un **Bearer Token** en la cabecera de la solicitud:
```json
{
  "Authorization": "Bearer <tu_token_aquí>"
}
```

## Documentación con Swagger
La API está documentada con **Swagger**. Puedes acceder a la documentación en:
```
http://localhost:3000/api/v1/api-docs
```

---

Esta documentación proporciona un resumen detallado sobre la API y su uso. 🚀

