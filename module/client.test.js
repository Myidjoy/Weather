import ClientApp from './clientApp.js';

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

const clientApp = new ClientApp();

describe('test getYearInfo', () => {
  test(
    'should return object { dayOfMonth: 1, month: Январь, dayOfweek: Пятница } if call with 1',
    () => {
      expect(clientApp.getYearInfo(1)).toEqual({ dayOfMonth: 1, month: 'Январь', dayOfweek: 'Пятница' });
    },
  );
});

describe('test getWeather', () => {
  test('return 3.2 if Dubai 5 or mistake', async () => {
    const t = await clientApp.getWeather('Дубай', 5);
    if (typeof t === 'string') {
      const mistake = getMistake(t);
      expect(t).toBe(mistake);
    } else {
      expect(t).toBe(3.2);
    }
  });
});

describe('test getCitiesList', () => {
  test('return array or mistake if server is not aviable', async () => {
    const listCities = await clientApp.getCityList();
    if (typeof listCities === 'object') {
      expect(Array.isArray(listCities)).toBe(true);
    } else {
      const mistake = getMistake(listCities);

      expect(listCities).toBe(mistake);
    }
  });
});

describe('test getFullData', () => {
  test('return correct data Дубай 5 or mistake', async () => {
    const data = await clientApp.getFullData('Дубай', 5);
    if (data === 'Город Дубай, Вторник 5 Январь, средняя температура: 3.2') {
      expect(data).toBe('Город Дубай, Вторник 5 Январь, средняя температура: 3.2');
    } else {
      const mistake = getMistake(data);

      expect(data).toBe(mistake);
    }
  });
});
