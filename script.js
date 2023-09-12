// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const apiKey = '8e158c3515ac4a769b6123742231209';
    const getWeatherButton = document.getElementById('getWeatherButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    // Agregar un evento de clic al botón "Obtener Pronóstico"
    getWeatherButton.addEventListener('click', function () {
        // Obtener la ubicación ingresada por el usuario
        const location = locationInput.value;

        // Verificar si la ubicación es válida
        if (!location) {
            displayError('Por favor, ingresa una ubicación válida.');
            return;
        }

        // Construir la URL de la solicitud a la API de WeatherAPI.com
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=es`;

        // Realizar la solicitud a la API
        fetch(apiUrl)
            .then(response => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('No se pudo acceder a la API de WeatherAPI.com.');
                }
                // Convertir la respuesta a JSON
                return response.json();
            })
            .then(data => {
                // Mostrar la información del pronóstico del tiempo en la interfaz
                displayWeatherInfo(data);
            })
            .catch(error => {
                // Manejar errores y mostrar un mensaje de error en la interfaz
                console.error('Error al obtener el pronóstico del tiempo:', error);
                displayError('Ocurrió un error al obtener el pronóstico del tiempo. Verifica la ubicación e intenta nuevamente.');
            });
    });

    // Función para mostrar la información del pronóstico del tiempo
    function displayWeatherInfo (data) {
        // Crear un fragmento de documento para mejorar el rendimiento de manipulación del DOM
        const fragment = document.createDocumentFragment();

        // Crear elementos para mostrar la información
        const heading = document.createElement('h2');
        heading.textContent = `Información del Tiempo para ${data.location.name}, ${data.location.country}`;
        fragment.appendChild(heading);

        const temperature = document.createElement('p');
        temperature.textContent = `Temperatura: ${data.current.temp_c}°C`;
        fragment.appendChild(temperature);

        const description = document.createElement('p');
        description.textContent = `Descripción: ${data.current.condition.text}`;
        fragment.appendChild(description);

        const humidity = document.createElement('p');
        humidity.textContent = `Humedad: ${data.current.humidity}%`;
        fragment.appendChild(humidity);

        const windSpeed = document.createElement('p');
        windSpeed.textContent = `Velocidad del Viento: ${data.current.wind_kph} km/h`;
        fragment.appendChild(windSpeed);

        // Limpiar la información previa
        weatherInfo.innerHTML = '';

        // Agregar el fragmento al contenedor de información del tiempo
        weatherInfo.appendChild(fragment);
    }

    // Función para mostrar un mensaje de error
    function displayError (message) {
        weatherInfo.innerHTML = `<p class="text-danger">${message}</p>`;
    }
});
