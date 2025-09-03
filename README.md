# ImpugnaIne

Sistema de autenticación con LDAP desarrollado en Angular 20 para el Instituto Nacional Electoral.

## Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (`npm install -g @angular/cli`)
- Servidor LDAP en localhost:4000 (para ambientes QA/Producción)

## Dependencias

- **Angular 20.2.x** - Framework principal
- **Bootstrap 5.3.x** - Componentes UI y estilos
- **RxJS 7.8.x** - Programación reactiva
- **TypeS## Troubleshooting

### **Problemas Comunes**

**Error: "Http failure response for http://localhost:4200/api/auth/login: 404"**
- **Solución:** Verifica que el backend esté corriendo en puerto 4000
- **Comando:** `curl http://localhost:4000/api/auth/login`

**Error: "Backend no disponible"**
- **Solución:** Usar modo DEV con mock data: `npm run start:dev`

**Error: "Credenciales incorrectas"**
- **Modo DEV:** Usar `admin/admin` o `test/test`
- **Modo QA:** Usar credenciales LDAP válidas

**Error: "CORS" o problemas de proxy**
- **Solución:** Verificar `proxy.conf.json` y que Angular use `--proxy-config`ipado estático

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── login.guard.ts
│   │   └── services/
│   ├── features/
│   │   ├── login/
│   │   │   ├── login.html
│   │   │   ├── login.scss
│   │   │   ├── login.spec.ts
│   │   │   └── login.ts
│   │   ├── inicio/
│   │   │   ├── inicio.html
│   │   │   ├── inicio.scss
│   │   │   ├── inicio.spec.ts
│   │   │   └── inicio.ts
│   │   ├── login.routes.ts
│   │   └── inicio.routes.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── encabezado/
│   │   │   └── pie-pagina/
│   │   ├── ui/
│   │   │   ├── botones/
│   │   │   │   ├── btn-primario/
│   │   │   │   ├── btn-secundario/
│   │   │   │   └── btn-usuario/
│   │   │   ├── campos-texto/
│   │   │   │   └── textarea-primario/
│   │   │   ├── enlaces/
│   │   │   │   └── enlace-principal/
│   │   │   └── ui.module.ts
│   │   └── shared.module.ts
│   ├── app.config.ts
│   ├── app.html
│   ├── app.css
│   ├── app.routes.ts
│   └── app.ts
├── assets/
│   ├── estilos/
│   │   ├── colores.scss
│   │   ├── espaciado.scss
│   │   ├── tipografia.scss
│   │   └── variables.scss
│   ├── imgs/
│   │   └── logos/
│   └── docs/
├── environments/
│   ├── environment.ts
│   ├── environment.dev.ts
│   ├── environment.qa.ts
│   └── environment.prod.ts
├── index.html
├── main.ts
└── styles.scss
```

## Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Elegir ambiente de desarrollo:**

   **Para desarrollo con datos mock (recomendado):**
   ```bash
   npm run start:dev
   ```

   **Para desarrollo con LDAP real (requiere backend):**
   ```bash
   npm run start:qa
   ```

3. **Abrir navegador:** Navegar a `http://localhost:4200/`

## Scripts Disponibles por Ambiente

### **Scripts de Desarrollo**
- **`npm run start:dev`** - Servidor con datos mock (sin backend)
- **`npm run start:qa`** - Servidor con LDAP real + proxy
- **`npm run start:prod`** - Servidor en modo producción
- **`npm start`** - Modo por defecto con proxy al backend

### **Scripts de Construcción**
- **`npm run build:dev`** - Build para desarrollo
- **`npm run build:qa`** - Build para QA
- **`npm run build:prod`** - Build para producción
- **`npm run build`** - Build por defecto

### **Scripts Generales**
- **`npm test`** - Ejecutar pruebas unitarias
- **`npm run watch`** - Construir en modo observación

## Generación de Código

```bash
# Generar componente
ng generate component features/mi-funcionalidad

# Generar servicio
ng generate service core/services/mi-servicio

# Generar guard
ng generate guard core/guards/auth

# Generar interceptor
ng generate interceptor core/interceptors/http

# Listar todos los esquemas disponibles
ng generate --help
```

## Configuración de Ambientes

El proyecto está configurado para trabajar con **3 ambientes diferentes** que se adaptan a las necesidades de desarrollo y despliegue:

### **DEV - Desarrollo con Mock Data**
```bash
npm run start:dev
```
- **Propósito:** Desarrollo rápido sin dependencias externas
- **Archivo:** `environment.dev.ts`
- **Características:**
  - Usa datos simulados (`useMockData: true`)
  - No requiere servidor LDAP
  - Ideal para desarrollo frontend
  - Incluye usuarios de prueba predefinidos

### **QA - Testing con LDAP Real**
```bash
npm run start:qa
```
- **Propósito:** Testing con autenticación real
- **Archivo:** `environment.qa.ts`
- **Características:**
  - Conecta al servidor LDAP real (`useMockData: false`)
  - Usa proxy para backend local
  - Perfecto para pruebas de integración
  - Validación completa del flujo de autenticación

### **PROD - Producción**
```bash
npm run start:prod
```
- **Propósito:** Ambiente de producción
- **Archivo:** `environment.prod.ts`
- **Características:**
  - LDAP real en servidores de producción
  - Optimizado para rendimiento
  - Sin proxy (conexión directa)
  - Configuración segura

### Estructura de Configuración
```typescript
// environment.dev.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  environment: 'dev',
  useMockData: true,  // Datos simulados
  mockDataPath: '/assets/mock-data/'
};

// environment.qa.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  environment: 'qa',
  useMockData: false,  // LDAP real
  mockDataPath: ''
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.impugna-ine.com',
  environment: 'production',
  useMockData: false,  // LDAP real
  mockDataPath: ''
};
```

## Construcción y Despliegue

### **Builds por Ambiente**

```bash
# Build de desarrollo (con source maps)
npm run build:dev

# Build de QA (optimizado pero con debugging)
npm run build:qa

# Build de producción (completamente optimizado)
npm run build:prod
```

**Características de cada build:**

| Build | Optimización | Source Maps | Minificación | Tamaño |
|-------|-------------|-------------|-------------|---------|
| DEV | Básica | Si | No | Grande |
| QA | Media | Si | Parcial | Medio |
| PROD | Máxima | No | Total | Pequeño |

Los artefactos se generan en `dist/` y están listos para despliegue.

## Testing y Desarrollo

### **Flujo de Trabajo Recomendado**

1. **Desarrollo inicial:** `npm run start:dev` (mock data)
2. **Testing de integración:** `npm run start:qa` (LDAP real)
3. **Validación final:** `npm run build:prod` + testing

### **Pruebas Unitarias**
```bash
npm test
# Ejecuta Jasmine + Karma
```

### **Debugging**

- **DEV:** Console logs completos + source maps
- **QA:** Logs de integración + validación LDAP
- **PROD:** Logs mínimos optimizados

## Configuración Avanzada

### **Personalización de Ambientes**

Para añadir un nuevo ambiente:

1. **Crear archivo de ambiente:**
   ```typescript
   // src/environments/environment.staging.ts
   export const environment = {
     production: false,
     apiUrl: 'https://staging-api.impugna-ine.com',
     environment: 'staging',
     useMockData: false,
     mockDataPath: ''
   };
   ```

2. **Actualizar angular.json:**
   ```json
   "configurations": {
     "staging": {
       "fileReplacements": [{
         "replace": "src/environments/environment.ts",
         "with": "src/environments/environment.staging.ts"
       }]
     }
   }
   ```

3. **Añadir script en package.json:**
   ```json
   "start:staging": "ng serve --configuration=staging"
   ```

## Ejecutar Pruebas Unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Pruebas

### Pruebas Unitarias
```bash
npm test
# o
ng test
```

### Pruebas E2E
```bash
ng e2e
```
*Nota: El framework E2E necesita ser configurado por separado.*

## Estilos

Este proyecto usa:
- **Bootstrap 5.3.x** para componentes UI
- **SCSS** para estilos personalizados
- Estilos globales en `src/styles.scss`

## Arquitectura del Proyecto

- **Core:** Guards, interceptors y servicios singleton
- **Features:** Módulos de funcionalidades con lazy loading
- **Shared:** Componentes reutilizables y utilidades

## Modo de Desarrollo con Mock Data

### **¿Cuándo usar cada ambiente?**

| Ambiente | Cuándo usar | Ventajas |
|----------|-------------|----------|
| **DEV** | Desarrollo de frontend, sin backend disponible | Rápido, sin dependencias |
| **QA** | Testing, validación de integración | Datos reales, flujo completo |
| **PROD** | Despliegue final | Optimizado, configuración real |

### **Usuarios de Prueba (Modo DEV)**

Cuando uses `npm run start:dev`, puedes autenticarte con:

**Usuario Principal:**
- **Usuario:** `admin`
- **Contraseña:** `admin`
- **Datos:** Carga perfil completo de orlando.gutierrez desde mock data

**Usuario de Testing:**
- **Usuario:** `test`
- **Contraseña:** `test`
- **Datos:** Usuario de prueba con permisos básicos

**Error de Testing:**
- **Cualquier otra combinación** mostrará error de credenciales

### **Credenciales LDAP Reales (Modo QA/PROD)**

Para ambientes QA y Producción, usa credenciales válidas del LDAP:
- **Usuario:** `claudia.olguin`
- **Contraseña:** `password`
- *(O cualquier usuario válido en el servidor LDAP)*

### **Configuración del Backend**

Para ambientes QA necesitas el servidor Express corriendo:

```bash
# En otra terminal, ejecutar el backend LDAP
node server.js  # (puerto 4000)
```

**Configuración del proxy** (`proxy.conf.json`):
```json
{
  "/api": {
    "target": "http://localhost:4000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

### **Estructura Técnica del Proyecto**

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth.guard.ts           # Guard de autenticación
│   │   │   └── login.guard.ts          # Guard anti-login
│   │   ├── services/
│   │   │   ├── auth.service.ts         # Servicio principal de auth
│   │   │   └── mock-data.service.ts    # Servicio de datos mock
│   │   └── interceptors/
│   │       └── token.interceptor.ts    # Interceptor JWT
│   ├── features/
│   │   ├── auth/
│   │   │   └── login/                  # Componente de login
│   │   ├── home/                       # Página principal
│   │   ├── inicio/                     # Página de inicio
│   │   └── *.routes.ts                 # Rutas lazy-loaded
│   ├── shared/
│   │   ├── components/                 # Componentes reutilizables
│   │   └── ui/                         # Sistema de design components
│   └── assets/
│       ├── mock-data/
│       │   └── login-response.json     # Datos LDAP simulados
│       ├── estilos/                    # Variables SCSS
│       └── imgs/                       # Logos e imágenes
├── environments/
│   ├── environment.ts                  # Default
│   ├── environment.dev.ts              # Mock data
│   ├── environment.qa.ts               # LDAP + proxy
│   └── environment.prod.ts             # LDAP producción
└── proxy.conf.json                     # Configuración del proxy
```

## Sistema de Autenticación

### **Flujo de Autenticación**

1. **Usuario ingresa credenciales** en el formulario de login
2. **AuthService detecta el ambiente:**
   - `useMockData: true` → Usa MockDataService
   - `useMockData: false` → Conecta al servidor LDAP
3. **Respuesta exitosa:**
   - Token JWT guardado en localStorage
   - Datos de usuario almacenados
   - Redirección a página principal
4. **Guards protegen rutas** basado en token válido

### **Componentes Clave**

- **AuthService:** Manejo central de autenticación
- **MockDataService:** Simulación de respuestas LDAP
- **AuthGuard:** Protección de rutas autenticadas
- **LoginGuard:** Previene acceso al login si ya está logueado
- **TokenInterceptor:** Añade JWT a requests HTTP

## Gestión de Versiones y Dependencias

### **Versionado de Dependencias**
Las dependencias usan versionado `~` para permitir actualizaciones de parches manteniendo compatibilidad:
- `~20.2.0` permite `20.2.x` pero no `20.3.0`

### **Actualización del Proyecto**
```bash
# Verificar versiones outdated
npm outdated

# Actualizar dependencias menores
npm update

# Para actualizaciones mayores, revisar CHANGELOG
```

## � Troubleshooting

### **Problemas Comunes**

**Error: "Http failure response for http://localhost:4200/api/auth/login: 404"**
- **Solución:** Verifica que el backend esté corriendo en puerto 4000
- **Comando:** `curl http://localhost:4000/api/auth/login`

**Error: "Backend no disponible"**
- **Solución:** Usar modo DEV con mock data: `npm run start:dev`

**Error: "Credenciales incorrectas"**
- **Modo DEV:** Usar `admin/admin` o `test/test`
- **Modo QA:** Usar credenciales LDAP válidas

**Error: "CORS" o problemas de proxy**
- **Solución:** Verificar `proxy.conf.json` y que Angular use `--proxy-config`

### **Logs de Debug**

Todos los servicios incluyen logs detallados con formato:
```
[NombreServicio] Acción realizada: {datos}
```

**Ejemplos:**
- `[AuthService] Enviando solicitud de login LDAP`
- `[MockDataService] Simulando login con datos mock`
- `[LoginComponent] Login exitoso, guardando token`

## Recursos y Documentación

### **Enlaces Útiles**
- [Documentación Angular 20](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Bootstrap 5.3 Documentation](https://getbootstrap.com/docs/5.3/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Arquitectura y Patrones**
- [Angular Style Guide](https://angular.dev/style-guide)
- [Lazy Loading Best Practices](https://angular.dev/guide/lazy-loading-ngmodules)
- [Authentication Patterns](https://angular.dev/guide/security)

## Contribución

### **Flujo de Git**
1. Crear feature branch desde `dev`
2. Desarrollar usando `npm run start:dev`
3. Testing con `npm run start:qa`
4. Pull request hacia `dev`
5. Deploy desde `main`

### **Convenciones de Código**
- **Componentes:** PascalCase (`LoginComponent`)
- **Servicios:** PascalCase + Service (`AuthService`)
- **Archivos:** kebab-case (`auth.service.ts`)
- **Variables:** camelCase (`userName`)
- **Constantes:** UPPER_SNAKE_CASE (`API_URL`)

---

**Desarrollado por:** INE (Instituto Nacional Electoral)
**Versión:** 1.0.0
**Angular:** 20.2.x
**Última actualización:** Septiembre 2025
