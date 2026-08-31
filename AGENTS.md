Crea un aplicativo web moderno de comercio electrónico para visualizar productos utilizando Next.js, TypeScript y Tailwind CSS, teniendo encuenta lo establecido actualmente

Objetivo

Construir el frontend de una tienda virtual que consuma información de productos desde una API REST y muestre los productos en una interfaz moderna, limpia, responsive y profesional.

Tecnologías
Next.js con App Router.
TypeScript.
Tailwind CSS.
React.
Fetch API para consumir el backend.
Componentes reutilizables.
Variables de entorno para configurar la URL de la API.
No utilizar Redux ni NgRx inicialmente.
Configuración del proyecto

Crear el proyecto utilizando una estructura organizada:

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   └── [uuid]/
│   │       └── page.tsx
│   └── globals.css
│
├── components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Loading.tsx
│   └── ErrorMessage.tsx
│
├── services/
│   └── product.service.ts
│
├── types/
│   └── product.ts
│
└── lib/
    └── api.ts


Variables de entorno

Crear un archivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:3000

La URL de la API debe utilizarse desde una variable de entorno y nunca quedar hardcodeada en los componentes.

Modelo de producto

Crear la siguiente interfaz TypeScript:

export interface Product {
  id: string;
  nombre: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  category_id: string | null;
}
API

Consumir los productos desde:

GET  /api/public/productos

La API puede devolver los productos en cualquiera de estos formatos:

{
  "message": []
}

o:

[]

El servicio debe manejar ambos formatos.

Crear un servicio:

src/services/product.service.ts

con funciones como:

getProducts()
Página principal

La ruta / debe mostrar:

Header.
Nombre de la tienda.
Título "Productos".
Cantidad de productos.
Grid responsive de productos.
Footer.

Los productos deben mostrarse mediante tarjetas.

Product Card

Cada tarjeta debe mostrar:

Nombre.
Descripción.
Precio.
Stock.
Estado del producto.
Botón "Ver producto".

No mostrar imágenes por ahora, aunque el modelo tenga el campo image_url.

La tarjeta debe tener un diseño moderno utilizando Tailwind CSS.

Ejemplo conceptual:

┌───────────────────────────┐
│ Disponible       Stock: 20│
│                           │
│ Producto electrónico      │
│                           │
│ Descripción del producto  │
│                           │
│ $25.000                   │
│                           │
│ [     Ver producto     ]  │
└───────────────────────────┘