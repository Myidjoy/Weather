import WeatherServer from './weatherServer.js';
import ClientApp from './clientApp.js';

const weatherServer = new WeatherServer();
const clientApp = new ClientApp();

console.log(weatherServer.serverStatus);
clientApp.getFullData('Москва', 360);
clientApp.getCityList();
clientApp.getWeather('Москва', 360);
