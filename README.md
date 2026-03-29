# Nodepop - Plataforma de Compraventa

## Descripción

Nodepop es una aplicación web moderna desarrollada con Node.js que permite la gestión y visualización de anuncios de compraventa. La aplicación proporciona tanto una interfaz web como una API RESTful para la gestión de productos. La aplicación tiene persistencia en una base de datos NOSQL desplegada en MongoDB.

## Requisitos Previos

- Node.js
- MongoDB

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/AlexAlgarate/Nodepop-KeepCoding.git
   cd Nodepop-KeepCoding
   ```

1. Instalar dependencias:

   ```bash
   npm install
   ```

1. Configurar variables de entorno:

   ```bash
   cp .env.example .env
    MONGO_URI= url de tu mongodb
    PORT= puerto de tu elección
    NODE_ENV= production/development
    SESSION_SECRET= secret_key del middleware de la session
   ```

1. Inicializar la base de datos (opcional):

   ```bash
   npm run initDB
   ```

## Estructura del Proyecto

```bash
├── app.js                  # Archivo principal de la aplicación
├── bin                     # Configuración del servidor
│   └── www
├── controllers             # Controladores de la aplicación
│   ├── healthController.js
│   ├── loginController.js
│   └── productWEBController.js
├── initDB.js               # Script para inicializar la base de datos
├── lib                     # Librerías y middlewares
│   ├── connectMongoose.js
│   └── middleware
│       ├── authMiddleware.js
│       └── errorMiddleware.js
├── models                  # Modelos de datos
│   ├── Product.js
│   └── User.js
├── package.json            # Archivo de configuración de npm
├── Practica KCWB19.pdf     # Enunciado de la práctica
├── README.md
├── routes                  # Rutas de la aplicación
│   ├── apiRoutes.js
│   └── webRoutes.js
├── utils                   # Utilidades varias
│   ├── cliUtils.js
│   └── dateUtils.js
└── views                   # Vistas para la interfaz web
│    ├── createProduct.html
│    ├── _environment.html
│    ├── error.html
│    ├── _header.html
│    ├── home.html
│    ├── login.html
│    └── products.html
└── public                  # Archivos estáticos (CSS, JS, imágenes)

```

## Características Principales

### API REST

- Gestión completa de productos (CRUD)
- Filtrado por varios campos (nombre, precio, tags)
- Paginación de resultados flexible (campos de skip y limit)
- Ordenamiento según nombre o precio

## Documentación de API

### Endpoints Principales

#### Productos

- `GET /api/products`: Obtener lista de productos
  - Parámetros de filtrado:
    - `name`: Filtrar por nombre
    - `tag`: Filtrar por etiqueta
    - `priceMin`: Precio mínimo
    - `priceMax`: Precio máximo
    - `skip`: Número de resultados a saltar
    - `limit`: Límite de resultados
    - `sort`: Campo por el cual ordenar

- `POST /api/products`: Crear nuevo producto
- `DELETE /api/products/:id`: Eliminar producto proporcionando el ObjetId de MongoDB

## Configuración de Desarrollo

### Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start

# Inicializar base de datos
npm run initDB
```

### Dependencias Principales

- Express.js
- Mongoose
- Express-validator

## Despliegue en servidor web (resolución práctica despliegue servidores web)

La aplicación está desplegada en AWS como parte de la solución a la práctica del módulo de despliegue en servidores web. Se puede visitar el despliegue en producción de la app [aquí](https://nodepop.kcpractica.duckdns.org)
Como parte de la solución, también está disponible el ejercicio dos, cuyo objetivo era desplegar una aplicación de React/Next.js en un servidor web. El proyecto se llama [Bicipop](https://bicipop.kcpractica.duckdns.org) y es un marketplace de compraventa de bicicletas de segunda mano.

Para el despliegue de ambos proyectos se ha empleado el servicio de instancias EC2 de AWS, con un dominio de duckdns.org. No se ha empleado ni PM2 ni Supervisor para mantener la app viva, si no que se han dockerizado ambas soluciones. Nginx es usado como proxy inverso para recibir las peticiones HTTP.
Además, los archivos estáticos de este proyecto, Nodepop, tienen la cabecera personaliza X-Owner github/AlexAlgarate para demostrar que son servidos por nginx.
