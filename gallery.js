// Ruta del archivo JSON
const jsonFile = "images.json";

// Contenedor de la galería
const galleryContainer = document.querySelector(".gallery");

// Número de fotos a mostrar (6 para 2 filas de 3 fotos, 8 para 2 filas de 4 fotos)
const photosToShow = 6; // Cambia a 8 si quieres 4 fotos por fila

// Intervalo de tiempo para rotar las imágenes (en milisegundos)
const rotationInterval = 5000; // 5 segundos

// Función para cargar las imágenes desde el JSON
async function loadGallery() {
    try {
        // Obtener el archivo JSON
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        // Leer los nombres de las imágenes
        const images = await response.json();

        // Función para mostrar un subconjunto aleatorio de fotos
        const showRandomImages = () => {
            // Seleccionar un subconjunto aleatorio de fotos
            const randomImages = getRandomSubset(images, photosToShow);

            // Limpiar la galería antes de cargar nuevas imágenes
            galleryContainer.innerHTML = "";

            // Cargar las imágenes en la galería
            randomImages.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = `images/${image}`; // Ruta de la imagen
                imgElement.alt = "Recuerdo de la institución";
                galleryContainer.appendChild(imgElement);
            });
        };

        // Mostrar las imágenes iniciales
        showRandomImages();

        // Rotar las imágenes cada cierto tiempo
        setInterval(showRandomImages, rotationInterval);
    } catch (error) {
        console.error("Error al cargar la galería:", error);
    }
}

// Función para obtener un subconjunto aleatorio de un array
function getRandomSubset(array, size) {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Mezclar el array
    return shuffled.slice(0, size); // Tomar los primeros "size" elementos
}

// Cargar la galería al iniciar la página
loadGallery();