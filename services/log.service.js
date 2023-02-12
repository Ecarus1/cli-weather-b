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
    // bgCyan(' HELP ') + '\n' +
    // 'Без параметров - вывод погоды' + '\n' +
    // '-s [SITY] для установки города');
}

export {printError, printSuccess, printHelp}