const API_KEY = '159654e543638ad0a446d4f7e2ecffaa'; 

    async function getWeatherData() {
      const city = document.getElementById('cityInput').value || 'Noida';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

      try {
      
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        document.getElementById('datetime').innerHTML = new Date().toLocaleString();
        document.getElementById('Temperature').innerHTML = `${weatherData.main.temp}°C`;
        document.getElementById('Weather').innerHTML = weatherData.weather[0].description;
        document.getElementById('wind').innerHTML = `${weatherData.wind.speed} km/h`;
        document.getElementById('humidity').innerHTML = `${weatherData.main.humidity}%`;
        document.getElementById('pressure').innerHTML = `${weatherData.main.pressure} hPa`;
        document.getElementById('city').innerText = weatherData.name;

        
        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();

        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = ''; 

        for (let i = 0; i < 3; i++) {
          const entry = forecastData.list[i];
          const time = new Date(entry.dt * 1000).getHours();
          const temp = entry.main.temp;
          const icon = entry.weather[0].icon;
          const block = `
            <div class="time-block">
              <div class="time-label">${time}:00</div>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="40" />
              <div class="time-temp">${temp}°C</div>
            </div>
          `;
          forecastContainer.innerHTML += block;
        }

      } catch (error) {
        alert('City not found or API limit exceeded.');
        console.error(error);
      }
    }

   
    window.onload = getWeatherData;