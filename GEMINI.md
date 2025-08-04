# Proyecto: Migración de Contenido a Base de Datos con Prisma y Supabase

## Objetivo Principal (Etapa 1)

El objetivo de este proyecto es migrar el sistema de gestión de contenido del blog desde archivos Markdown (`.md`) locales a una solución autoadministrable utilizando una base de datos PostgreSQL hosteada en Supabase, con Prisma como ORM. Esto permitirá una gestión de contenido más robusta, escalable y centralizada, siguiendo las mejores prácticas de Next.js 15.4.

## Stack Tecnológico

- **Framework:** Next.js 15.4
- **ORM:** Prisma
- **Base de Datos:** PostgreSQL (Supabase)
- **Lenguaje:** TypeScript

---

## Etapa 1: Bases de Datos y Modelos de Datos

### Tareas Clave:

1.  **Configuración del Entorno:**

    - Instalar y configurar Prisma en el proyecto.
    - Establecer la conexión con la base de datos de Supabase, gestionando las credenciales de forma segura a través de variables de entorno (`.env`).

2.  **Diseño del Schema de Base de Datos (`schema.prisma`):**

    - Crear modelos de datos que reflejen la estructura de un portal de noticias moderno y cumplan con las directrices de Google News para una óptima indexación.
    - Los modelos principales a definir son: `Post`, `Author`, `Category`, y `Tag`.

3.  **Definición de Modelos (Propuesta Inicial):**

    - **`Post` (Noticia/Artículo):**

      - `id`: Identificador único (UUID).
      - `title`: Título del artículo (string, requerido).
      - `slug`: URL amigable (string, único, requerido).
      - `excerpt`: Resumen corto para vistas previas (string).
      - `content`: Contenido principal del artículo (string, formato Markdown o JSON para rich text).
      - `coverImage`: URL de la imagen de portada (string).
      - `status`: Estado de la publicación (enum: `DRAFT`, `PUBLISHED`, `ARCHIVED`).
      - `publishedAt`: Fecha de publicación (DateTime).
      - `updatedAt`: Fecha de última actualización (DateTime).
      - `author`: Relación con el modelo `Author`.
      - `categories`: Relación muchos a muchos con `Category`.
      - `tags`: Relación muchos a muchos con `Tag`.
      - **Campos SEO y Google News:**
        - `seoTitle`: Título para motores de búsqueda.
        - `seoDescription`: Meta descripción.
        - `keywords`: Palabras clave (array de strings).
        - `newsKeywords`: Palabras clave específicas para Google News.

    - **`Author` (Autor):**

      - `id`: Identificador único (UUID).
      - `name`: Nombre del autor (string, requerido).
      - `picture`: URL de la foto del autor (string).
      - `posts`: Relación uno a muchos con `Post`.

    - **`Category` (Categoría):**

      - `id`: Identificador único (UUID).
      - `name`: Nombre de la categoría (string, único, requerido).
      - `slug`: URL amigable (string, único, requerido).
      - `posts`: Relación muchos a muchos con `Post`.

    - **`Tag` (Etiqueta):**
      - `id`: Identificador único (UUID).
      - `name`: Nombre de la etiqueta (string, único, requerido).
      - `slug`: URL amigable (string, único, requerido).
      - `posts`: Relación muchos a muchos con `Post`.

4.  **Migración de Datos:**

    - Crear un script para leer los archivos `.md` existentes en la carpeta `_posts`.
    - Parsear el `frontmatter` y el contenido de cada archivo.
    - Insertar los datos parseados en la nueva estructura de la base de datos utilizando Prisma Client.

5.  **Refactorización del Código:**
    - Modificar las funciones de acceso a datos (actualmente en `src/lib/api.ts`) para que utilicen Prisma Client en lugar de leer el sistema de archivos.
    - Asegurar que todas las páginas y componentes que consumen datos de los posts (`page.tsx`, `[slug]/page.tsx`, etc.) funcionen correctamente con los nuevos métodos de acceso a datos.

---

## Etapa 2: Dashboard de Administración (Visión a Futuro)

Una vez completada la Etapa 1, se procederá al diseño y construcción de un dashboard de administración. Este permitirá a los usuarios crear, editar, eliminar y gestionar las noticias, autores, categorías y etiquetas directamente desde una interfaz web, eliminando por completo la necesidad de manejar archivos `.md` manualmente.

### Requisitos y Directrices:

- **Diseño de Interfaz (UI):**

  - **Estética:** Mantener la estética minimalista, sencilla y práctica de la página principal.
  - **Consistencia de Marca:** Conservar la paleta de colores y la tipografía del sitio público.
  - **Componentes:** Utilizar componentes reutilizables y, solo si es estrictamente necesario, instalar librerías como `shadcn` para agilizar el desarrollo sin sacrificar la personalización.

- **Experiencia de Usuario (UX):**
  - **Responsividad:** El diseño debe ser completamente adaptable a dispositivos móviles y de escritorio.
  - **Carga de Datos:** Implementar `skeletons` para indicar la carga de datos y mejorar la percepción de velocidad.
  - **Actualización de Datos:** Al crear, editar o eliminar registros, la vista se actualizará automáticamente para reflejar los cambios de forma instantánea (se evaluará el uso de `revalidatePath` o `revalidateTag` de Next.js).
  - **Tablas de Datos:** Las tablas para mostrar posts, autores, etc., deben estar paginadas y optimizadas para manejar grandes volúmenes de datos de manera eficiente.
- **Tablas de Datos:** Migrar todos los componentes de /admin a la libreria de shadcn
- **Arquitectura y Código:**
  - **Renderizado:** Se analizará y decidirá la estrategia de renderizado más adecuada (SSR, SSG, o CSR con Server Components) para cada vista del dashboard, priorizando el rendimiento y la experiencia de usuario.
  - **Escalabilidad:** El código debe ser modular, componentizado y seguir las mejores prácticas de desarrollo en Next.js para garantizar su mantenibilidad y escalabilidad a futuro.
  - **Buenas Prácticas:** Se seguirán las convenciones de código y estructura del proyecto.
