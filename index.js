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
  }

  getListOfСities() {
    const arrayOfCities = Object.values(this.countries);
    const listOfCities = arrayOfCities.map((item) => Object.keys(item)).flat();

    return listOfCities;
  }

  getAveregeTemperature(name, day) {
    if (day > 365 || day < 1 || !day) {
      return 'You can use from 1 to 365';
    }

    const arrayOfCities = Object.values(this.countries);
    const containName = arrayOfCities.some((item) => name in item);
    let latitude = 0;

    if (!containName) {
      return 'Name is not correct';
    }

    arrayOfCities.forEach((city) => {
      if (name in city) {
        latitude = city[name];
      }
    });

    const t = Math.floor((30 + latitude * ((182 - (202 - day)) / 210 - 1)) * 10) / 10;

    return t;
  }
}

const weatherServer = new WeatherServer();

class ClientApp {
  days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  getWeather(name, day) {
    return new Promise((resolve, reject) => {
      const weather = weatherServer.getAveregeTemperature(name, day);
      const listOfCities = weatherServer.getListOfСities();
      const correctName = listOfCities.includes(name) || false;

      this.setRandomTime();

      if (
        correctName
        && typeof weather === 'number'
      ) {
        setTimeout(() => {
          resolve(weather);
        }, this.time);
      } else {
        const string = 'City is not found or the day is not correct';
        setTimeout(() => {
          reject(string);
        }, this.time);
      }
    });
  }

  setRandomTime() {
    const random = Math.round((Math.random() * 2));
    const time = (random || random + 0.5) * 1000;

    this.time = time;
  }

  getCityList() {
    const response = new Promise((resolve) => {
      const list = weatherServer.getListOfСities();

      this.setRandomTime();

      setTimeout(() => {
        resolve(list);
      }, this.time);
    });

    response.then((data) => console.log(...data));
  }

  getYearInfo(day, year = 2021) {
    const myDate = new Date(year, 0, day);

    return new Promise((resolve, reject) => {
      if (day > 365 || day < 1 || !day) {
        const string = 'You can use from 1 to 365';

        this.setRandomTime();

        setTimeout(() => {
          reject(string);
        }, this.time);
      }

      this.setRandomTime();

      setTimeout(() => {
        const dayOfMonth = myDate.getDate();
        const month = this.months[myDate.getMonth()];
        const dayOfweek = this.days[myDate.getDay()];
        const info = {
          dayOfMonth,
          month,
          dayOfweek,
        };

        resolve(info);
      }, this.time);
    });
  }

  getFullData(name, day, year = 2021) {
    Promise.all([this.getYearInfo(day, year), this.getWeather(name, day)])
      .then((data) => {
        const [info, weather] = data;
        const { month, dayOfMonth, dayOfweek } = info;
        console.log(`Город ${name}, ${dayOfweek} ${dayOfMonth} ${month}, средняя температура: ${weather}`);
      })
      .catch((data) => console.log(data));
  }
}

const client = new ClientApp();

client.getFullData('Москва', 365);
client.getCityList();
