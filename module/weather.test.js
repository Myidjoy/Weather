import WeatherServer from './weatherServer.js';

const weatherServer = new WeatherServer();
const getMistake = (string) => {
  let result = null;

  switch (string) {
    case 'Время ответа больше 1.5 сек.':
      result = 'Время ответа больше 1.5 сек.';
      break;
    case 'Название города не корректно':
      result = 'Название города не корректно';
      break;
    case 'Вы можете использовать день от 1 до 365':
      result = 'Вы можете использовать день от 1 до 365';
      break;
    default:
      result = 'Cервер не доступен';
  }

  return result;
};

describe('full test weatherServer.getAverageTemperature', () => {
  test(
    'should return average temperature Москва день 300 = 48.6 or correct answer about mistake',
    async () => {
      try {
        const t = await weatherServer.getAverageTemperature('Москва', 300);

        expect(t).toBe(48.6);
      } catch (error) {
        const mistake = getMistake(error);
        expect(error).toBe(mistake);
      }
    },
  );

  describe('full test getCitiesList', () => {
    test('should return correct array or correct mistake', async () => {
      try {
        const citiesList = await weatherServer.getListOfСities();

        expect(Array.isArray(citiesList)).toBe(true);
      } catch (error) {
        const mistake = getMistake(error);

        expect(error).toBe(mistake);
      }
    });
  });
});

describe('test other methods', () => {
  test('return random time from 0.5 to 2', () => {
    weatherServer.setRandomTime();
    expect(weatherServer.time).not.toBe(0);
  });

  test('resolve is not undefined', async () => {
    weatherServer.setRandomTime();

    await expect(weatherServer.getResolve([])).resolves.toEqual([]);
  });

  test('reject is Сервер не доступен', async () => {
    weatherServer.setRandomTime();
    try {
      await weatherServer.getReject();
    } catch (error) {
      expect(error).toBe('Cервер не доступен');
    }
  });
});
