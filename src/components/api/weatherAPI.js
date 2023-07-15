import axios from 'axios';

export const API_KEY_GOOGLE = 'AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs';
export const API_KEY_WEATHER = 'f00c38e0279b7bc85480c3fe775d518c';

export const getWeatherData = async query => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY_WEATHER}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherForecast = async query => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY_WEATHER}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather forecast');
  }
};

export const getСurrentLocation = async () => {
  let data = await axios.post(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY_GOOGLE}`
  );

  data = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.data.location.lat}&lon=${data.data.location.lng}&appid=${API_KEY_WEATHER}`
    )
    .then(response => {
      return response.data;
    });
  return data;
};
