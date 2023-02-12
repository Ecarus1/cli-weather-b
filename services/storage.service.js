import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';


/**
 * homedir - возвращает строку домашней дирректирии
 * Библиотека path
 * join - конкатинирует строки для создания правильного пути под разные ОС
 * basename - воложение последней папки (файла)
 * dirname - это то, где находится указанный в строке путь
 * extname - расширение файла
 * relative(arg1, arg2) - это относительные пути между одним и вторым путём
 * isAbsolute - проверка на абсолютный путь
 * resolve - позволяет посмотреть, что будет если от текущего пути, где исполняется файл мы сделаем шаги
 * sep - какой сепаратор находится в текущей ОС
 */
const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city"
}

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data))
}

/**
 * 
 * @param {string} key - параметр который хотим получить
 * @returns 
 */
const getKeyValue = async (key) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
    return data[key];
  }

  return undefined;
}

const isExist = async (path) => {
  try {
    await promises.stat(path); // Возвращает статистику файла, а в случае если файла нет - падает
    return true;
  } catch (error) {
    return false;
  }
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};