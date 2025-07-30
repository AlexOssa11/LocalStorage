// Configuración
const API_KEY = '3da4c045ccb32fcf1b06c3663a2908a6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Elementos del DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// Función para obtener el clima
async function getWeather(city) {
    try {
        // Mostrar mensaje de carga
        showLoading();
        
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
    }
}

// Función para mostrar el clima
function displayWeather(data) {
    // Ocultar mensajes de error
    errorMessage.style.display = 'none';
    
    // Crear HTML para mostrar la información
    const weatherHTML = `
        <div class="weather-card">
            <div class="location">${data.name}, ${data.sys.country}</div>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <div class="weather-icon">
                <i class="fas ${getWeatherIcon(data.weather[0].main)}"></i>
            </div>
            <div class="description">${data.weather[0].description}</div>
            <div class="details">
                <div class="detail-item">
                    <span class="detail-label">Sensación</span>
                    <span class="detail-value">${Math.round(data.main.feels_like)}°C</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Humedad</span>
                    <span class="detail-value">${data.main.humidity}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Viento</span>
                    <span class="detail-value">${data.wind.speed} km/h</span>
                </div>
            </div>
        </div>
    `;
    
    weatherInfo.innerHTML = weatherHTML;
}

// Función para obtener el icono según el clima
function getWeatherIcon(weatherMain) {
    const icons = {
        Thunderstorm: 'fa-bolt',
        Drizzle: 'fa-cloud-rain',
        Rain: 'fa-cloud-showers-heavy',
        Snow: 'fa-snowflake',
        Clear: 'fa-sun',
        Clouds: 'fa-cloud'
    };
    
    return icons[weatherMain] || 'fa-cloud';
}

// Función para mostrar error
function showError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Función para mostrar carga
function showLoading() {
    weatherInfo.innerHTML = '<div class="loading">Cargando datos del clima...</div>';
    errorMessage.style.display = 'none';
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('Por favor ingresa una ciudad');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            showError('Por favor ingresa una ciudad');
        }
    }
});

// Inicializar con una ciudad por defecto
window.addEventListener('load', () => {
    getWeather('Lima');
});