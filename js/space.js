document.getElementById("btnBuscar").addEventListener("click", searchImages);
async function searchImages() {
    const query = document.getElementById("inputBuscar").value;
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ''; 
    if (!query) {
        alert('Por favor ingresa un término de búsqueda.');
        return;
    }
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.collection.items.length) {
            contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }
        const items = data.collection.items;
        items.forEach(item => {
            const imageData = item.data[0];
            const imageUrl = item.links ? item.links[0].href : '';

            const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="${imageData.title}">
                    <div class="card-body">
                        <h5 class="card-title">${imageData.title}</h5>
                        <p class="card-text">${imageData.description || "Descripción no disponible."}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${imageData.date_created}</small></p>
                    </div>
                </div>
            </div>`;

            contenedor.innerHTML += card;
        });
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        contenedor.innerHTML = "<p>Hubo un error al realizar la búsqueda. Intenta nuevamente.</p>";
    }
}
