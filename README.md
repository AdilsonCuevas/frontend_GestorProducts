This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Frontend

Aplicación frontend para una plataforma de comercio electrónico desarrollada con **Next.js**, **React**, **TypeScript** y **Tailwind CSS**.

El proyecto consume una API REST para la gestión de autenticación, productos y categorías.

---

## 📋 Requisitos

Antes de ejecutar el proyecto debes tener instalado:

* Node.js 24 o superior
* npm 11 o superior
* Git
* Una API REST backend disponible

Puedes verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/AdilsonCuevas/frontend_GestorProducts.git
```

Ingresar al proyecto:

```bash
cd frontend_GestorProducts
```

---

### 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

---

### 3. Configurar variables de entorno

Crear un archivo:

```text
.env.local
```

en la raíz del proyecto.

Ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

La variable `NEXT_PUBLIC_API_URL` corresponde a la URL base de la API REST.

Ejemplo de configuración:

```text
Frontend:
http://localhost:4000

Backend:
http://localhost:3000
```

> No subir `.env.local` al repositorio. Debe estar incluido en `.gitignore`, actualiza y renombra el archivo `.env.local.example`

---

## ▶️ Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El aplicativo estará disponible en:

```text
http://localhost:4000
```

El proyecto está configurado para utilizar el puerto **4000**.

---

## 🏗️ Construcción para producción

Crear la versión optimizada:

```bash
npm run build
```

Ejecutar la aplicación:

```bash
npm run start
```

La aplicación estará disponible en:

```text
http://localhost:4000
```

---

# 🧰 Tecnologías utilizadas

## Next.js

Framework basado en React utilizado para construir la aplicación web.

Características utilizadas:

* App Router.
* Server Components.
* Client Components cuando son necesarios.
* Route Groups.
* Layouts.
* Middleware/Proxy para protección de rutas.
* Routing dinámico.

---

## React

Librería utilizada para construir la interfaz de usuario mediante componentes reutilizables.

Se utilizan principalmente:

* `useState`
* `useEffect`
* Componentes funcionales
* Props
* Manejo de formularios
* Renderizado condicional

---

## TypeScript

Utilizado para agregar tipado estático al proyecto.

Permite definir interfaces para las entidades manejadas por la aplicación.

Ejemplo:

```typescript
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  category_id: number;
}
```

---

## Tailwind CSS

Framework CSS utilizado para construir la interfaz visual.

Se utiliza para:

* Layout.
* Responsive design.
* Formularios.
* Tablas.
* Botones.
* Cards.
* Estados hover.
* Estados disabled.
* Colores.
* Espaciado.
* Tipografía.

La aplicación utiliza un enfoque **mobile-first**.

---

## js-cookie

Librería utilizada para gestionar cookies desde el navegador.

El proyecto utiliza una cookie denominada:

```text
auth_token
---

# 🔐 Autenticación

El frontend utiliza autenticación mediante token.

El flujo general es:

```text
Usuario
   │
   ▼
Login
   │
   ▼
API REST
   │
   ▼
Token
   │
   ▼
auth_token
   │
   ▼
Cookie
   │
   ▼
Acceso a rutas protegidas
```

Las peticiones autenticadas utilizan:

```http
Authorization: Bearer <TOKEN>
```

---

# 🛡️ Rutas protegidas

El proyecto cuenta con protección de rutas para evitar que usuarios no autenticados accedan a módulos privados.

Entre las rutas protegidas se encuentran:

```text
/dashboard
/products
/products/create
/products/:id/edit
```

Las rutas públicas incluyen:

```text
/login
/register
```

Cuando un usuario intenta acceder a una ruta protegida sin autenticación, es redireccionado a: (esta accion es ejecutada por el middleware)

```text
/login
```

---

# 📦 Módulo de productos

El módulo de productos permite:

* Listar productos.
* Crear productos.
* Editar productos.
* Eliminar productos.
* Consultar categorías.
* Asociar una categoría a un producto.
* Mostrar estados de carga.
* Mostrar errores.
* Confirmar eliminación.

### Rutas

Listado:

```text
/products
```

Crear:

```text
/products/create
```

Editar:

```text
/products/{id}/edit
```

---

# 📁 Estructura del proyecto

La estructura principal es:

```text
src/
├── app/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   └── admin/
│       ├── layout.tsx
│       │
│       ├── dashboard/
│       │   └── page.tsx
│       │
│       └── products/
│           ├── page.tsx
│           ├── create/
│           │   └── page.tsx
│           └── [id]/
│               └── edit/
│                   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── ProtectedLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── LogoutButton.tsx
│   │
│   └── products/
│       ├── ProductForm.tsx
│       ├── ProductTable.tsx
│       └── DeleteProductButton.tsx
│
├── services/
│   ├── auth.service.ts
│   ├── product.service.ts
│   └── category.service.ts
│
├── lib/
│   ├── api.ts
│   └── auth.ts
│
└── types/
    ├── product.ts
    └── category.ts
```

---

# 🧩 Arquitectura

El proyecto separa las responsabilidades de la aplicación en diferentes capas:

```text
Pages
  │
  ▼
Components
  │
  ▼
Services
  │
  ▼
API REST
```

# 📄 Licencia

Este proyecto es de uso privado y/o académico. La licencia puede modificarse según las condiciones establecidas para el proyecto.
