<div align="center">

  # KarU Web · ![ci status](https://github.com/DerivadaDX/karu-web/actions/workflows/ci.yml/badge.svg)

</div>

## Primeros pasos

Ubicados en la raiz del sitio, ejecutar el siguiente comando para instalar dependencias

### `npm i`

Luego, para iniciar la aplicación

### `npm start`

La aplicación correrá en modo desarrollo local.

Ir [http://localhost:3000](http://localhost:3000) para visualizar en un browser.

## Modo de uso

### Directorios

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

    // Indica si esta configuración es solo de una ruta.
    // Si es true no se va a crear un elemento en el menú lateral.
    // Si es false o no está definido, se va a agregar un elemento en el menú lateral.
    soloUrl: true,

    // Listado de roles de usuario para los cuales será visible este elemento del menú.
    // Si esta propiedad no está definida, no aparecerá en el menú lateral.
    // En el ejemplo solo será visible para técnicos y supervisores de taller.
    roles: [Roles.TECNICO, Roles.SUPERVISOR_TECNICO]
  },
];
```

## Estilo

El proyecto está configurado con [ESLint](https://eslint.org/) para seguir la guía de estilo de [Airbnb](https://github.com/airbnb/javascript/tree/master/react).

Se definió el script `lint:check` para validar que la guía se esté siguiendo. También se puede instalar el [plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) para VSCode.
Para correrlo se debe ejecutar `npm run lint:check` en la terminal.

Algunos errores del linter pueden corregirse automáticamente mediante el script `lint:fix`. Para correrlo se debe ejecutar `npm run lint:fix` en la terminal.

## Branching

El repositorio cuenta con dos branch principales: `main` y `dev`. En `main` se encontrará la versión de producción, mientras que en `dev` la versión de desarrollo.

Al crear una rama debe hacerse a partir de `dev`. Al hacer pull request también debe hacerse hacia `dev`.

Para poder identificar rápidamente a qué grupo le pertenece cada branch, sugerimos seguir el siguiente formato de nombre:
`g#-nombreDeBranch`.

- `g#-`: corresponde al número de grupo (g1, g2, g3 o g4).
- `nombreDeBranch`: corresponde a un nombre que identifique el desarrollo escrito en *snakeCase*.

Por ejemplo, el nombre de una rama para implementar el inicio de sesión en el sitio, creada por el grupo 4, podría ser
`g4-implementacionLogin`.

## Integración continua

El repositorio cuenta con un workflow de integración continua que sirve para comprobar que el código subido pase unas validaciones.
Si el código no pasa las validaciones no permitirá completar el merge hacia `dev` o `main`.

Las validaciones que ejecuta son dos:

1. Que no hayan errores de linting por medio del script `lint:check`
2. Que el código se puede buildear por medio del script `build`

Estas validaciones se ejecutan cada vez que se hacen pull requests hacia `dev` o `main` y cuando se hace push hacia ellas.

## Bases y condiciones

Al usar el repositorio acepta haber leído y aceptado lo indicado en el apartado **Modo de uso** del presente documento.
