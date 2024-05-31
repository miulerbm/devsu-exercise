# Ejercicio Práctico - Frontend (React Native)

autor: [Miuler Blas](https://miulerbm.vercel.app)

repo: [miulerbm/devsu-exercise](https://github.com/miulerbm/devsu-exercise)

## INSTRUCCIONES PARA EJECUTAR EL PROYECTO

### Introducción:

Este proyecto fue desarrollado en una PC con Windows de 64 bits utilizando el IDE VS Code. Se recomienda no utilizar WSL debido a posibles problemas de conectividad entre los puertos que utiliza el emulador y los puertos de la aplicación del servidor (`repo-interview-main`).

### Requerimientos previos:

Asegúrate de tener instaladas las siguientes herramientas:

- Node >=18.20.3
- Yarn\* >=1.22.22 / npm >=10.7.0
- Expo >=51.0.9

\*Es preferibe optar por yarn para evitar conflictos con dependencias.

### Instrucciones generales:

1. Hacer un fork o clona el repositorio desde [este enlace](https://github.com/miulerbm/devsu-exercise) (rama principal).
2. Ejecutar el comando `yarn` en la consola de comandos para instalar las dependencias necesarias especificadas en el `package.json`.

3. Antes de iniciar el servidor local con `npm run start:dev`, se debe editar el archivo `apiService.ts`, ubicado en:

   ```
   ├───src
   │   └───Data
   │       └───api
   │           └───apiService.ts
   ```

   Reemplaza el valor `BASE_URL` con tu dirección IP. Puedes obtener esta dirección ejecutando el comando "ipconfig" desde la línea de comandos (cmd en Windows).

   **Ejemplo:**

   ```
   Adaptor de LAN inalámbrica Wi-Fi:
      Dirección IPv4. . . . . . . . . . . . . : 192.168.1.7
   ```

4. En el dispositivo móvil, descargar e instalar Expo Go y asegurarse de que esté conectado a la misma red que el ordenador (en este caso, la red WiFi).

5. Finalmente, ejecutar `npm run start:dev` desde la línea de comandos en el directorio raíz del proyecto backend. Una vez que se haya levantado el servidor local, se puede ejecutar `npx expo start` o `yarn start` desde el directorio raíz del proyecto frontend.

### EJECUCIÓN DE PRUEBAS

Para correr las pruebas, simplemente ejecuta el comando `yarn test`.

Se recomienda correr `yarn test` dos veces, pues la primera, dado que el entorno de pruebas se construirá por primera vez, y hay pruebas que dependen de funciones asíncronas, al no resolverse ciertas requests, se interpretará como error. La segunda vez funcionarán de mejor manera.

#### Descripción de las pruebas:

Las pruebas están organizadas según los archivos de prueba proporcionados:

- `apiService.test.ts`
- `ProductDetail.test.tsx`
- `ProductForm.test.tsx`
- `ProductList.test.tsx`

Estas pruebas básicas validan el funcionamiento de los servicios de la API (manejo de errores, requests) y las interfaces de usuario de las pantallas de detalle de producto, formulario de producto y lista de productos, respectivamente.

---

Nota: El ProductForm.test.tsx, al igual que las demás pruebas de vistas, requiere el contexto de los productos, sin embargo al ejecutar este test el Provider no es reconocido generándose un error. Debido a que los tests están sujetos a la compatibilidad entre dependencias, se opta por no alterar los archivos de configuración, dado que esto podría dañar el proyecto.
