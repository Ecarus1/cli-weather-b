#!/usr/bin/env node
import {getArgs} from "./helpers/args.js"
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

/**
 * Функция сохранения токена
 * @param {String} token 
 * @returns 
 */
const saveToken = async (token) => {
  if (!token.trim().length) {
    printError('Не передан token');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён')
  } catch (e) {
    printError(e.message)
  }
}

/**
 * Функция сохранения города
 * @param {String} city 
 */
const saveCity = async (city) => {
  if (!city.trim().length) {
    printError('Не задан город');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранён')
  } catch (e) {
    printError(e.message);
  }
}

/**
 * Функция для получения данных с сервиса и обработка ошибок
 */
const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const dataWeather = await getWeather(city);
    printWeather(dataWeather, getIcon(dataWeather.weather[0].icon))
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно задан город");
    } else if (e?.response?.status == 401) {
      printError("Неверно задан токен");
    } else {
      printError(e.message);
    }
  }
}

/**
 * Функция инициализации CLI приложения
 * @returns 
 */
const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t)
  }
  return getForcast();
}

initCLI();