class WeatherServer {
  constructor() {
    this.countries = {
      Уганда: {
        Кампала: 0,
      },
      Таиланд: {
        Пхукет: 8,
      },
      Доминикана: {
        'Санто-Доминго': 18,
      },
      ОАЭ: {
        Дубай: 25,
      },
      Китай: {
        Шанхай: 31,
      },
      США: {
        'Лос-Анжелес': 34,
      },
      Испания: {
        Мадрид: 40,
      },
      Франция: {
        Париж: 49,
      },
      Британия: {
        Лондон: 52,
      },
      Россия: {
        Москва: 56,
        Мурманск: 69,
      },
      Норвегия: {
        Осло: 60,
      },
    };
    this.serverStatus = true;
  }

  getReject(string) {
    const stringInfo = string || 'Cервер не доступен';
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(stringInfo), this.time);
    });
  }

  getResolve(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), this.time);
    });
  }

  setRandomTime() {
    const random = Math.round((Math.random() * 2));
    const time = (random || random + 0.5) * 1000;

    this.time = time;
  }

  getListOfСities() {
    if (this.serverStatus) {
      this.setRandomTime();

      const arrayOfCities = Object.values(this.countries);
      const listOfCities = arrayOfCities.map((item) => Object.keys(item)).flat();

      if (this.time > 1500) {
        return this.getReject('Время ответа больше 1.5 сек.');
      }

      return this.getResolve(listOfCities);
    }

    return this.getReject();
  }

  getAveregeTemperature(name, day) {
    if (this.serverStatus) {
      this.setRandomTime();

      const arrayOfCities = Object.values(this.countries);
      const containName = arrayOfCities.some((item) => name in item);
      let latitude = 0;

      if (this.time > 1500) {
        return this.getReject('Время ответа больше 1.5 сек.');
      }

      if (!containName) {
        return this.getReject('Название города не корректно');
      }

      if (day > 365 || day < 1 || !day) {
        return this.getReject('Вы можете использовать день от 1 до 365');
      }

      arrayOfCities.forEach((city) => {
        if (name in city) {
          latitude = city[name];
        }
      });

      const t = Math.floor((30 + latitude * ((182 - (202 - day)) / 210 - 1)) * 10) / 10;

      return this.getResolve(t);
    }

    return this.getReject();
  }
}

const weatherServer = new WeatherServer();

class ClientApp {
  days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  async getWeather(name, day) {
    try {
      this.weather = await weatherServer.getAveregeTemperature(name, day);

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

const clientApp = new ClientApp();

clientApp.getFullData('Москва', 360);
clientApp.getCityList();
clientApp.getWeather('Москва', 360);
