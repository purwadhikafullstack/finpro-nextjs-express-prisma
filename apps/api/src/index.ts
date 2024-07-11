import App from './app';

const main = async() => {
  // init db here

  const app = new App();
  app.start();
};

main().catch(error => {
  console.error('Error starting the app', error)
});
