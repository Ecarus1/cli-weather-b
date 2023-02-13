import https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

/**
 * Функция для получения иконки по коду
 * @param {String} icon 
 */
const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
    default:
      return '';
	}
};

/**
 * Ассинхронная функция для полученя данных о погоде
 * @param {String} city 
 * @returns {Object}
 */
const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if(!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }

  const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  });

  return data;
}

export {getWeather, getIcon};