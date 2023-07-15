import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WeatherChart = ({ temperatures, objectData, unit }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && temperatures) {
      const chartLabels = Object.keys(objectData).map(date => {
        return new Date(date)
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
          })
          .replace(/\//g, '.');
      });

      const chartData = Object.values(objectData).map(temperature => {
        const convertedTemperature =
          unit === 'C' ? temperature - 273.15 : (temperature * 9) / 5 - 459.67;
        return Math.round(convertedTemperature).toFixed(0);
      });

      const chartOptions = {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: value => (value > 0 ? `+${value}` : value),
            },
          },
        },
        elements: {
          line: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            tension: 0.4,
          },
        },
      };

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Temperature',
              data: chartData,
              fill: true,
              backgroundColor: 'rgba(255, 162, 91, 0.3)',
              tension: 0.5,
            },
          ],
        },
        options: chartOptions,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [temperatures, objectData, unit]);

  return <canvas ref={chartRef} />;
};

export default WeatherChart;
