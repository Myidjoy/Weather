import WeatherServer from './weatherServer.js';

const weatherServer = new WeatherServer();

export default class ClientApp {
  days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  async getWeather(name, day) {
    try {
      this.weather = await weatherServer.getAverageTemperature(name, day);

      console.log(this.weather);

      return this.weather;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async getCityList() {
    try {
      this.listCities = await weatherServer.getListOfСities();

      console.log(this.listCities);

      return this.listCities;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  getYearInfo(day, year = 2021) {
    if (day > 365 || day < 1 || !day) {
      return 'Вы можете использовать день от 1 до 365';
    }

    const myDate = new Date(year, 0, day);
    const dayOfMonth = myDate.getDate();
    const month = this.months[myDate.getMonth()];
    const dayOfweek = this.days[myDate.getDay()];
    const info = {
      dayOfMonth,
      month,
      dayOfweek,
    };

    return info;
  }

  async getFullData(name, day, year = 2021) {
    const yearInfo = this.getYearInfo(day, year);
    const temperature = await this.getWeather(name, day);

    if (typeof yearInfo === 'string' && typeof temperature === 'string') {
      if (yearInfo === temperature) {
        console.log(yearInfo);

        return yearInfo;
      }
      const error = `${yearInfo} и ${temperature}`;

      console.log(error);

      return error;
    }

    if (typeof yearInfo === 'string' || typeof temperature === 'string') {
      const error = typeof yearInfo === 'string' ? yearInfo : temperature;

      console.log(error);

      return error;
    }

    const { month, dayOfMonth, dayOfweek } = yearInfo;

    this.fullDataAboutWeather = `Город ${name}, ${dayOfweek} ${dayOfMonth} ${month}, средняя температура: ${temperature}`;

    console.log(`Город ${name}, ${dayOfweek} ${dayOfMonth} ${month}, средняя температура: ${temperature}`);

    return this.fullDataAboutWeather;
  }
}
