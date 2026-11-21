# Editor de Metadatos de PDF

Edita el título, autor, asunto y palabras clave ocultos en tu PDF. Gratis, sin cuenta y sin que el archivo salga de tu equipo.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Cada PDF guarda datos invisibles además del contenido que se ve en pantalla: quién lo creó, cuándo, con qué título y con qué programa. Esos campos (título, autor, asunto y palabras clave) suelen quedar con nombres genéricos como Documento1 o con el usuario de Windows de quien lo generó, y aparecen tal cual cuando alguien abre el archivo o lo guarda en su computadora. Aquí subes el PDF, ves esos cuatro campos ya cargados con lo que trae el archivo, los editas como corresponda y descargas una copia con los metadatos actualizados. Todo ocurre en tu navegador: el PDF nunca sale de tu equipo.

**Cuándo te sirve:**

- Un freelance revisa la propuesta antes de enviarla al cliente y descubre que el autor dice Untitled-Final-v3-COPIA en vez de su nombre o el de su estudio.
- Alguien que organiza una biblioteca de PDFs en la empresa le pone títulos y palabras clave consistentes para que sean fáciles de buscar más adelante.
- Un estudiante entrega un trabajo y quiere que el autor del PDF sea su propio nombre y no el de la computadora del cibercafé donde lo armó.

## Cómo se usa

1. **Sube tu PDF.** Arrastra el archivo a la zona de carga o selecciónalo desde tu equipo. La herramienta lee automáticamente el título, el autor, el asunto y las palabras clave que ya tiene guardados, y los muestra en un formulario editable.
2. **Edita los campos que necesites.** Cambia el título por uno que describa realmente el documento, corrige el autor si quedó el nombre de un empleado que ya no trabaja contigo o el usuario de tu computadora, y agrega palabras clave para encontrar el archivo más fácil después.
3. **Descarga el PDF actualizado.** Presiona descargar y se genera una copia del PDF con los metadatos nuevos, lista para enviar. El contenido de las páginas queda exactamente igual; solo cambia la información oculta del archivo.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-metadatos-pdf.git
cd herramienta-metadatos-pdf
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/metadatos-pdf/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Qué metadatos puedo editar en un PDF con esta herramienta?**  
Puedes editar cuatro campos estándar: título, autor, asunto y palabras clave. Son los datos que muchos programas muestran como nombre de pestaña del navegador o en la vista previa del archivo, y a veces revelan quién lo creó o con qué software, sin que nadie se dé cuenta.

**¿Esto cambia el texto o el contenido visible de las páginas del PDF?**  
No. Solo modifica los metadatos invisibles del archivo, no lo que aparece impreso en las páginas. Si necesitas corregir un dato dentro del texto del documento, tienes que editarlo con otra herramienta antes de ajustar aquí los metadatos.

**¿Elimina también la ubicación GPS o el historial de ediciones del PDF?**  
No hace eso, y en general no hace falta: a diferencia de una foto, un PDF normalmente no guarda coordenadas GPS. Algunos editores sí incrustan un historial interno de revisiones, pero esta herramienta está pensada específicamente para los cuatro campos de metadatos estándar, no para ese tipo de datos adicionales.

**¿Mi PDF se sube a algún servidor para editar los metadatos?**  
No. El archivo se procesa por completo dentro de tu navegador, con la biblioteca pdf-lib corriendo en tu propio equipo. Nunca viaja a nuestros servidores ni a los de terceros, así que puedes usarlo con documentos con información sensible sin preocuparte por eso.

**¿Es gratis y necesito crear una cuenta?**  
Es gratis y no pide cuenta ni correo. Puedes editar los metadatos de un PDF o de veinte el mismo día, sin límites ni marca de agua, porque al no depender de un servidor no hay un costo que trasladarte.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.
