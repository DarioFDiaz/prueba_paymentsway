Prueba Técnica – Rapid Adapter / Paymentsway

Proyecto: Mobile API Explorer Challenge (OpenWeatherMap)
Desarrollado por Dario Díaz

---

# Descripción general

Esta aplicación móvil (React Native + Expo) permite consultar el **clima actual por ciudad**, consumiendo datos de la API pública **OpenWeatherMap**.  
El backend se implementó en **Elysia (Bun)** dentro de un entorno **monorepo (Turborepo)** con comunicación tipada mediante **Eden**, cumpliendo con el stack técnico solicitado.

**Objetivo:**  
Demostrar la capacidad para construir una app modular, tipada y escalable bajo principios de clean architecture y mobile-first design.

# Arquitectura general

El proyecto sigue una estructura **monorepo** organizada por dominios:

```
prueba_paymentsway/
 ├─ apps/
 │   ├─ api/        → Backend Elysia + Bun + Eden
 │   └─ mobile/     → Frontend React Native (Expo) + NativeWind
 ├─ packages/       → (espacio opcional para módulos compartidos)
 ├─ turbo.json      → Configuración de tareas
 ├─ pnpm-workspace.yaml → Definición del workspace
 └─ README.md
```

**Comunicación:**  
- El frontend se comunica con el backend mediante **Eden** (`@elysiajs/eden`).  
- El backend utiliza **ofetch** con interceptores globales para comunicarse con OpenWeatherMap.  
- Todo el proyecto está escrito en **TypeScript**, garantizando tipado fuerte extremo a extremo.

**Arquitectura de UI:**  
- Feature-based structure (`features/search`, `features/detail`).  
- Navegación con `@react-navigation/native-stack`.  
- Estilos con **NativeWind** (Tailwind adaptado a React Native).

---

# Stack tecnológico

| Componente | Tecnología |
|-------------|-------------|
| **Frontend** | Expo (React Native, TypeScript) |
| **Estilos** | NativeWind (TailwindCSS adaptado) |
| **Backend** | Elysia.js (Bun) + Eden |
| **API pública** | OpenWeatherMap (https://openweathermap.org/api) |
| **HTTP Client** | ofetch (con interceptores) |
| **Gestor de paquetes** | pnpm |
| **Monorepo** | Turborepo |
| **Pruebas** | Vitest (API) + Testing Library (UI) |
| **Despliegue** | Railway |
| **Calidad de código** | TypeScript strict (sin Biome/ESLint, formato manual documentado) |

---

# Instalación y ejecución local

# Requisitos previos
- Node.js ≥ 20.x  
- Bun ≥ 1.1.x  
- pnpm ≥ 9.x  
- Expo CLI ≥ 6.x  
- Git ≥ 2.40

# Clonar el repositorio

```bash
git clone https://github.com/dariodiaz/prueba_paymentsway.git
cd prueba_paymentsway
pnpm install
```

# Configurar variables de entorno

# apps/api/.env
```bash
OPENWEATHERMAP_KEY=tu_api_key
PORT=3000
```

# apps/mobile/.env
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

# Ejecutar backend (Elysia)
```bash
cd apps/api
bun run src/index.ts
```

# Ejecutar frontend (Expo)
```bash
cd apps/mobile
pnpm expo start
```

Abre la app en **Expo Go** o en el navegador (`w`).

---

# API seleccionada y motivación

**API:** [OpenWeatherMap](https://openweathermap.org/api)

**Motivo:**  
- Documentación clara y endpoints simples.  
- Permite demostrar consumo de datos externos con validación tipada.  
- Ejemplo clásico de integración frontend-backend con parámetros dinámicos.  
- Ideal para mostrar control de errores y estados (`loading`, `error`, `empty`).

---

# Variables de entorno (.env.example)

📄 apps/api/.env.example
```bash
OPENWEATHERMAP_KEY=your_api_key_here
PORT=3000
```

📄 apps/mobile/.env.example
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

# Testing

# Backend
Framework: **Vitest**

```bash
cd apps/api
pnpm run test
```

- Prueba conexión a la API de OpenWeatherMap.  
- Valida propiedades del objeto de respuesta (`name`, `main.temp`, etc.).  

# Frontend
Framework: **Jest + Testing Library**

```bash
cd apps/mobile
pnpm run test
```

- Verifica funcionamiento de componentes (`SearchInput`, hooks).  
- Simula interacción del usuario.

---

# Despliegue

El backend está desplegado en **Railway**.  
Se accede desde la app móvil mediante la variable pública `EXPO_PUBLIC_API_URL`.

Ejemplo de endpoint:

```
GET https://prueba-paymentsway.up.railway.app/weather?city=Madrid
```

Ejemplo de respuesta:

```json
{
  "ciudad": "Madrid",
  "temperatura": 19.2,
  "descripcion": "nubes dispersas",
  "icono": "03d",
  "humedad": 62,
  "viento": 3.1
}
```

---

# Decisiones técnicas y trade-offs

- **Sin Biome/ESLint:**  
  Se mantuvo la calidad de código mediante `TypeScript strict`, revisiones manuales y formato automático con VS Code (Prettier).  
  Documentado explícitamente en esta sección por criterio técnico.

- **Uso de Eden en lugar de oRPC:**  
  Eden es el reemplazo moderno y oficial de oRPC en Elysia, con mejor compatibilidad y tipado end-to-end.

- **Arquitectura feature-based:**  
  Mejora mantenibilidad y escalabilidad, permitiendo aislar lógica por dominio.

- **Interceptors en ofetch:**  
  Facilitan logging, control de errores y configuración global de headers.

- **Sin persistencia local (ORM):**  
  No se requiere cache ni base de datos para esta prueba, pero se deja abierta la opción de agregar Drizzle + SQLite.

---

# Posibles mejoras futuras

- Implementar cache local (SQLite o AsyncStorage).  
- Añadir modo offline-first.  
- Mejorar diseño visual con íconos dinámicos del clima.  
- Ampliar test coverage (UI y errores).  
- Documentar API con Swagger/Scalar (`/docs`).  
- Automatizar CI/CD con GitHub Actions.

---

# Licencia

Este proyecto se desarrolló con fines de evaluación técnica (Rapid Adapter – Paymentsway).  
© 2025 Dario Díaz. Todos los derechos reservados.

---

# Checklist final de entrega

| Requisito | Cumplido |
|------------|-----------|
| Monorepo con Turborepo |  |
| Backend Elysia + Eden + ofetch |  |
| API pública tipada (OpenWeatherMap) |  |
| Frontend Expo + NativeWind |  |
| Búsqueda y detalle funcional |  |
| Variables seguras (.env) |  |
| Pruebas (Vitest / Jest) |  |
| Deploy en Railway |  |
| Documentación técnica completa |  |