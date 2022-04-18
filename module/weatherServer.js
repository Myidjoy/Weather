export default class WeatherServer {
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

  getAverageTemperature(name, day) {
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
