async function cargarFotos() {
  const galleryContainer = document.getElementById('gallery-container');
  const loadingElement = document.querySelector('.loading');
  
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
    const fotos = await respuesta.json();
    const solo10 = fotos.slice(0, 10);
    
    // Limpiar mensaje de carga
    loadingElement.style.display = 'none';
    
    // Crear tarjetas para cada foto
    solo10.forEach(foto => {
      const photoCard = document.createElement('div');
      photoCard.className = 'photo-card';
      
      photoCard.innerHTML = `
        <img src="${foto.thumbnailUrl}" alt="${foto.title}" class="photo-image">
        <div class="photo-info">
          <div class="photo-id">ID: ${foto.id}</div>
          <p class="photo-title">${foto.title}</p>
          <a href="${foto.url}" target="_blank" class="photo-url">Ver imagen completa</a>
        </div>
      `;
      
      galleryContainer.appendChild(photoCard);
    });
    
  } catch (error) {
    loadingElement.innerHTML = 'Error al cargar las fotos. Por favor, intente recargar la página.';
    console.error('Error al cargar fotos:', error);
  }
}

// Iniciar la carga de fotos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarFotos);