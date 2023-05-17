# KarU Web

## Primeros pasos

Ubicados en la raiz del sitio, ejecutar el siguiente comando para instalar dependencias

### `npm i`

Luego, para iniciar la aplicación

### `npm start`

La aplicación correrá en modo desarrollo local.

Ir [http://localhost:3000](http://localhost:3000) para visualizar en un browser.

## Modo de uso

Cada grupo cuenta con un directorio ubicado en `src/components/grupos` que servirá de espacio de trabajo donde desarrollar sus páginas.
Se crearon los directorios `components`, `pages` y `services` dentro del espacio de trabajo de cada grupo a modo de guía para ubicar los distintos tipos de archivos.

Se espera que no se modifiquen los archivos por fuera del espacio de trabajo de cada equipo y que, de ser necesario, se comente el cambio con el resto de los equipos
para que se esté al tanto del motivo y el posible impacto.

### Configuración

Cada espacio de trabajo cuenta con un archivo `pagesConfig.jsx` en donde se define una constante `GROUP_#_PAGES_CONFIG` para cada grupo.
Esta constante es un array de objetos de configuración utilizados para crear los elementos del menú lateral y configurar las url que cada
grupo maneja.

A continuación se muestra un ejemplo de este objeto de configuración:

```js
const GROUP_2_PAGES_CONFIG = [
  {
    // Id del elemento requerida por el framework,
    // se compone por el identificador del grupo (g1, g2, g3 y g4)
    // seguido por un guión y el nombre del componente.
    id: 'g2-NombreDeComponente',
    
    // Nombre del elemento del menú correspondiente a esta página
    name: 'Nombre',
    
    // Ruta mediante la cual se accede a la página
    href: '/ruta-componente',
    
    // Ícono del menú correspondiente a esta página
    icon: <IconoComponente />,
    
    // Componente de la página que se debe cargar al hacer click
    // en el elemento del menú
    page: <Componente />,
  },
];
```

Esta configuración es únicamente para declarar las páginas a las cuales se pretende que el usuario acceda por medio del menú lateral.

### Estilo

El proyecto está configurado con [ESLint](https://eslint.org/) para seguir la guía de estilo de [Airbnb](https://github.com/airbnb/javascript/tree/master/react).

Se definió el script `lint` para validar que la guía se esté siguiendo. También se puede instalar el [plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) para VSCode.
Para correrlo se debe ejecutar `npm run lint` en la terminal.

Algunos errores del linter pueden corregirse automáticamente mediante el script `lint:fix`. Para correrlo se debe ejecutar `npm run lint:fix` en la terminal.

## Bases y condiciones

Al usar el repositorio acepta haber leído y aceptado lo indicado en el apartado **Modo de uso** del presente documento.
