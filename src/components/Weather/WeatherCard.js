import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { removeWeatherCard } from '../../redux/weatherSlice';
import DateDisplay from '../../utils/dateUtils';
import styles from './WeatherApp.module.css';
import WeatherChart from '../Chart/Chart';

function WeatherCard({ weatherCard }) {
  const dispatch = useDispatch();

  const [unit, setUnit] = useState('C');

  const averageTemperatures = useSelector(
    state => state.weather.averageTemperatures
  );

  const temperatures = Object.values(averageTemperatures[weatherCard.id]);
  const objectData = temperatures[0];

  const handleRemove = () => {
    dispatch(removeWeatherCard(weatherCard.id));
  };

  const convertTemperature = temperature => {
    if (unit === 'F') {
      return (temperature * 9) / 5 + 32;
    }
    return temperature;
  };

  const temperatureColor =
    weatherCard.data.main.temp > 0 ? '#FFFAF1' : '#F1F2FF';

  const { t } = useTranslation();

  return (
    <Card
      style={{
        backgroundColor: temperatureColor,
        padding: '15px',
        position: 'relative',
      }}
    >
      <div className={styles.wrapper}>
        <IconButton
          className={styles.removeButton}
          style={{
            color: '#c5c5c5',
            position: 'absolute',
            top: '-3px',
            right: '-3px',
          }}
          onClick={handleRemove}
          aria-label="Remove"
        >
          <CloseIcon />
        </IconButton>
        <div className={styles.wrap_info_city}>
          <div>
            <Typography variant="body1" className={styles.city}>
              {weatherCard.data.name},{' '}
              <span>{weatherCard.data.sys.country}</span>
            </Typography>
            <Typography variant="body1" className={styles.date}>
              <DateDisplay />
            </Typography>
          </div>
          <div className={styles.icon_desk}>
            <img
              className={styles.weather_icon}
              src={`https://openweathermap.org/img/wn/${weatherCard.data.weather[0].icon}.png`}
              alt={weatherCard.data.weather[0].description}
            />
            <Typography variant="body1" className={styles.desk}>
              {weatherCard.data.weather.map(el => el.main).join(', ')}
            </Typography>
          </div>
        </div>
        {objectData && (
          <WeatherChart
            temperatures={temperatures.map(temperature =>
              Math.round(convertTemperature(temperature))
            )}
            objectData={objectData}
            unit={unit}
          />
        )}

        <div className={styles.indexes}>
          <div>
            <div className={styles.unit}>
              <Typography variant="body1" style={{ fontSize: '44px' }}>
                {Math.round(convertTemperature(weatherCard.data.main.temp))}
              </Typography>

              <ButtonGroup
                variant="text"
                aria-label="Temperature Unit"
                style={{ height: '30px' }}
              >
                <Button
                  className={styles.btn_unit}
                  onClick={() => setUnit('C')}
                  disabled={unit === 'C'}
                >
                  °C
                </Button>
                <Button
                  className={styles.btn_unit}
                  onClick={() => setUnit('F')}
                  disabled={unit === 'F'}
                >
                  °F
                </Button>
              </ButtonGroup>
            </div>

            <Typography
              variant="body1"
              style={{ fontSize: '13px' }}
              className={styles.feel_desk}
            >
              {t('weatherCard.feelsLike')}:{' '}
              {Math.round(convertTemperature(weatherCard.data.main.feels_like))}
              <span>{unit === 'C' ? '°C' : '°F'}</span>
            </Typography>
          </div>

          <div>
            <Typography
              variant="body1"
              style={{ fontSize: '12px' }}
              className={styles.index_desk}
            >
              {t('weatherCard.wind')}:{' '}
              <span>{weatherCard.data.wind.speed}m/s</span>
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: '12px' }}
              className={styles.index_desk}
            >
              {t('weatherCard.humidity')}:{' '}
              <span> {weatherCard.data.main.humidity}% </span>
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: '12px' }}
              className={styles.index_desk}
            >
              {t('weatherCard.pressure')}:{' '}
              <span>{weatherCard.data.main.pressure}Pa</span>
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WeatherCard;
