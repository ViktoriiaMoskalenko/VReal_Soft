import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WeatherSearch from './WeatherSearch';
import WeatherCard from './WeatherCard';
import {
  removeWeatherCard,
  fetchWeatherData,
  setLocationPermission,
} from '../../redux/weatherSlice';
import { getСurrentLocation } from '../api/weatherAPI';

function Weather() {
  const dispatch = useDispatch();
  const {
    cards: weatherCards,
    weatherForecast,
    locationPermission,
  } = useSelector(state => state.weather);

  const handleRemoveCard = cardId => {
    dispatch(removeWeatherCard(cardId));
  };

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        dispatch(setLocationPermission(true));
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeatherData(latitude, longitude));
      });
    } else {
      dispatch(setLocationPermission(false));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const locationData = await getСurrentLocation();
        console.log(locationData.name);
        dispatch(fetchWeatherData(locationData.name));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <div>
      <WeatherSearch />
      {locationPermission ? (
        <Button onClick={handleLocationPermission}>{t('permission')}</Button>
      ) : null}
      <Grid container spacing={2} style={{ marginTop: '50px' }}>
        {weatherCards.map(weatherCard => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={weatherCard.id}>
            <WeatherCard
              weatherCard={weatherCard}
              weatherForecast={weatherForecast}
              onRemove={() => handleRemoveCard(weatherCard.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Weather;
