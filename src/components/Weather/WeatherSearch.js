import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchWeatherData } from '../../redux/weatherSlice';
import styles from './WeatherApp.module.css';

function WeatherSearch() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedSearchHistory = localStorage.getItem('searchHistory');
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, []);

  const handleQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      dispatch(fetchWeatherData(query));
      updateSearchHistory(query);
      setQuery('');
    }
  };

  const updateSearchHistory = query => {
    const updatedHistory = [query, ...searchHistory];
    const uniqueHistory = [...new Set(updatedHistory)];
    setSearchHistory(uniqueHistory.slice(0, 5));
    localStorage.setItem(
      'searchHistory',
      JSON.stringify(uniqueHistory.slice(0, 5))
    );
  };

  const handleOptionSelected = (event, value) => {
    if (value) {
      setQuery(value);
      dispatch(fetchWeatherData(value));
    }
  };

  const { t } = useTranslation();

  return (
    <div className={styles.form_search}>
      <Autocomplete
        options={searchHistory.slice(0, 3)}
        renderInput={params => (
          <TextField
            {...params}
            label="City"
            value={query}
            onChange={handleQueryChange}
            variant="outlined"
            style={{ width: '570px' }}
          />
        )}
        onInputChange={(_, value) => setQuery(value)}
        onOptionSelected={handleOptionSelected}
        freeSolo
        autoSelect
      />
      <Button
        onClick={handleSearch}
        style={{ backgroundColor: '#459de9' }}
        variant="contained"
      >
        {t('add')}
      </Button>
    </div>
  );
}

export default WeatherSearch;
