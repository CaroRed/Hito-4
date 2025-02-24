# Hito 6 - Patrones de Integración Empresarial

## Descripción
Este hito consiste en la implementación de un sistema de mensajería en tiempo real utilizando **Socket.io** y **WebSocket**, asegurando la autenticación mediante **JWT**.

## Requerimientos Implementados

1. **Instalación de dependencias**
   - Se instalaron las librerías necesarias para **Socket.io** y **WebSocket**.

2. **Configuración de Middleware**
   - Se implementó **morgan** para el registro de solicitudes.
   - Se omitió **cookie-parser** ya que se utiliza autenticación con **Bearer Token**.
   - Se configuró **express.static** para servir un archivo HTML opcional.

3. **Estructura y Login Personalizado**
   - Se implementó un mecanismo de autenticación con **JWT**.
   - Se validan los tokens al establecer la conexión con **Socket.io**.

4. **Configuración de Socket.io**
   - Se creó un namespace para la gestión de chat.
   - Se implementó el manejo de eventos para la comunicación en tiempo real.

5. **Manejo de desconexiones y errores**
   - Se agregó la detección de desconexiones de usuarios.
   - Se implementó un sistema centralizado para el manejo de errores.

6. **Interfaz HTML Opcional**
   - Se creó una página web para interactuar con el sistema de mensajería.
   - Se configuró una ruta en el servidor para servir el archivo HTML.

## Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias con `npm install`.
3. Definir la variable de entorno `AUTH_SECRET`.
4. Iniciar el servidor con `npm run dev`.
5. Acceder a la interfaz en el navegador
6. Este proyecto utiliza Docker para la base de datos.
7. Crear en thunder client un usuario, para luego loguearse y obtener el token que pide el chat.

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
  "email": "demo@test.com",
  "password": "123123"
}
```

## Visualizar página html
La url de frontend es:
```
http://localhost:3000/
```



