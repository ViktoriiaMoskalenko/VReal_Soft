import { createSlice } from '@reduxjs/toolkit';
import {
  getWeatherData,
  getWeatherForecast,
} from '../components/api/weatherAPI';

const initialState = {
  cards: JSON.parse(localStorage.getItem('weatherCards')) || [],
  currentWeather: null,
  weatherForecast: null,
  averageTemperatures:
    JSON.parse(localStorage.getItem('averageTemperatures')) || {},
  locationPermission: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherCard: (state, action) => {
      const newCard = action.payload;
      const isCityAlreadyAdded = state.cards.some(
        card => card.data.name === newCard.data.name
      );

      if (!isCityAlreadyAdded) {
        state.cards.push(newCard);
      }
    },

    removeWeatherCard: (state, action) => {
      const id = action.payload;
      state.cards = state.cards.filter(card => card.id !== id);
      delete state.averageTemperatures[id];

      localStorage.setItem('weatherCards', JSON.stringify(state.cards));
      localStorage.setItem(
        'averageTemperatures',
        JSON.stringify(state.averageTemperatures)
      );
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setWeatherForecast: (state, action) => {
      state.weatherForecast = action.payload;
    },
    setAverageTemperature: (state, action) => {
      const { id, temperature, data } = action.payload;

      state.averageTemperatures = {
        ...state.averageTemperatures,
        [id]: {
          ...state.averageTemperatures[id],
          [id]: temperature,
        },
        data,
      };
    },
    setLocationPermission: (state, action) => {
      state.locationPermission = action.payload;
    },
  },
});

export const fetchWeatherData = query => async (dispatch, getState) => {
  try {
    const currentWeather = await getWeatherData(query);
    const weatherForecast = await getWeatherForecast(query);
    const card = { id: generateUniqueId(), data: currentWeather };
    dispatch(addWeatherCard(card));
    dispatch(setCurrentWeather(currentWeather));
    dispatch(setWeatherForecast(weatherForecast));

    const averageTemperatures = calculateAverageTemperature(weatherForecast);
    dispatch(
      setAverageTemperature({
        id: card.id,
        date: card.data,
        temperature: averageTemperatures,
      })
    );

    const state = getState();

    localStorage.setItem('weatherCards', JSON.stringify(state.weather.cards));
    localStorage.setItem(
      'averageTemperatures',
      JSON.stringify(state.weather.averageTemperatures)
    );
  } catch (error) {
    console.log(error.message);
  }
};

const calculateAverageTemperature = forecast => {
  const dailyTemperatures = {};

  forecast.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    const temperature = item.main.temp;

    if (!dailyTemperatures[date]) {
      dailyTemperatures[date] = [];
    }

    dailyTemperatures[date].push(temperature);
  });

  const averageTemperatures = {};

  Object.entries(dailyTemperatures).forEach(([date, temperatures]) => {
    const totalTemperature = temperatures.reduce((a, b) => a + b, 0);
    const averageTemperature = totalTemperature / temperatures.length;

    averageTemperatures[date] = averageTemperature.toFixed(2);
  });
  return averageTemperatures;
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const {
  addWeatherCard,
  removeWeatherCard,
  setCurrentWeather,
  setWeatherForecast,
  setAverageTemperature,
  setLocationPermission,
} = weatherSlice.actions;

export default weatherSlice.reducer;
