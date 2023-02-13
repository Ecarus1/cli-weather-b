import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ' + ' ' + error));
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ' + ' ' + message));
}

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s ${chalk.bgMagenta('[CITY]')} для установки города
    -h для вывода помощи
    -t ${chalk.bgMagenta('[API_KEY]')} для сохранения токена
    `)
  );
}

const printWeather = (res, icon) => {
  console.log(
    dedent(`${chalk.bgYellow(' WEATHER ')}
    ${chalk.green(' ➜ ')}Погода в городе ${res.name}
    ${chalk.green(' ➜ ')}За окном ${icon}  ${res.weather[0].description}
    ${chalk.green(' ➜ ')}Температура: ${Math.round(res.main.temp)} (ощущается как ${Math.round(res.main.feels_like)})
    ${chalk.green(' ➜ ')}Влажность: ${res.main.humidity}%
    ${chalk.green(' ➜ ')}Скорость ветра: ${Math.round(res.wind.speed)} м/c
    ${chalk.green(' ➜ ')}Видимость: ${res.visibility / 1000} км
    `)
  );
}

export {printError, printSuccess, printHelp, printWeather}