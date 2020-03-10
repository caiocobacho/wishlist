import App from './app';

const port = process.env.PORT || 8080;

App.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running :D');
});
