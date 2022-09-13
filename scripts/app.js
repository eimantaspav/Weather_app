

const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img'); 

const updateUI = (data) => {
    // const cityDetails = data.cityDetails; 
    // const weather = data.weather;

    // destructure properties
    const { cityDetails, weather} = data;

    // update details
    details.innerHTML = `
         <h5>City name: ${cityDetails.EnglishName}</h5>
         <div>Weather condition: ${weather.WeatherText}</div>
          <div>
            <span>temp: </span>
            <span>${weather.Temperature.Metric.Value}&deg;C</span>
          </div>`
    // update images
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

          let timeSrc = null;
          if (weather.IsDayTime){
            timeSrc = 'img/day.svg';
          } else {
            timeSrc = 'img/night.svg';
          }

          time.setAttribute('src', timeSrc);
}

const updateCity = async city => {
    console.log(city);

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails,weather};
}

form.addEventListener('submit', (e) => {
    // prevent default action
    e.preventDefault();
    // get user input and trim whitespace
    const city = form.city.value.trim();
    form.reset();
    // update city information in the UI
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
})
