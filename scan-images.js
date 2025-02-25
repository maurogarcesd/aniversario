const fs = require("fs");
const path = require("path");

// Ruta de la carpeta de imágenes
const imagesFolder = path.join(__dirname, "images");

// Leer los archivos de la carpeta
fs.readdir(imagesFolder, (err, files) => {
    if (err) {
        console.error("No se pudo leer la carpeta de imágenes:", err);
        return;
    }

    // Filtrar solo archivos de imagen (puedes agregar más extensiones si es necesario)
    const imageFiles = files.filter(file => {
        return [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file).toLowerCase());
    });

    // Guardar los nombres de las imágenes en un archivo JSON
    const outputPath = path.join(__dirname, "images.json");
    fs.writeFile(outputPath, JSON.stringify(imageFiles, null, 2), (err) => {
        if (err) {
            console.error("No se pudo guardar el archivo JSON:", err);
            return;
        }
        console.log(`Archivo JSON generado con éxito: ${outputPath}`);
        console.log(`Imágenes encontradas: ${imageFiles.length}`);
    });
});