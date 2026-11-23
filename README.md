# ColombiaInfo - Mini Portal de Colombia

## Descripción

ColombiaInfo es un sitio web informativo que permite conocer algunos presidentes de Colombia y diferentes platos típicos del país. La información se consulta desde la API pública API Colombia y se muestra dinámicamente en las páginas del proyecto.

## Opciones desarrolladas

- **Presidentes de Colombia:** muestra el nombre, periodo presidencial, partido político y fotografía. Los registros se ordenan por el año de inicio del periodo.
- **Sabores de Colombia:** muestra el nombre, descripción, departamento e imagen de los platos típicos. También presenta el total de registros recibidos.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- API Colombia: https://api-colombia.com/

## Estructura del proyecto

```text
Actividad-1-javaScript-main/
├── actividad_api_colombia_v3.pdf
├── data.json
├── index.html
├── opcion1.html
├── opcion2.html
├── script.js
├── style.css
└── README.md
```

## Instrucciones de uso

1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Ejecuta `index.html` con la extensión Live Server o desde un servidor local.
4. En la página principal, selecciona Presidentes o Sabores.
5. Mantén conexión a internet para consultar la API.

## Manejo de datos y errores

Las páginas utilizan `fetch` para solicitar los datos a la API. Mientras se realiza la consulta se muestra un mensaje de carga. Si la solicitud falla, se informa al usuario mediante un mensaje en la página y el error se registra en la consola.

Las imágenes que no estén disponibles en la API utilizan una imagen de respaldo.

## Autor

Andrés Lozano
