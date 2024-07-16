import chalk from 'chalk';
import App from './app';

const main = async() => {
  // init db here

  const app = new App();
  app.start();
};

main().catch(error => {
  console.error(chalk.red('Error starting the app', error))
});
