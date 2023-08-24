import { Express } from 'express';
/* В качестве тестовой базы данных можно использовать обычный объект
 * для реального сервера, такое решение не пойдет, потому что такая "база" данных будет сбрасываться каждый раз при перезапуске сервера
 * Но для учебных целей - это простое и лаконичное решение
 *  */
const fakeDB = {
  users: [
    {
      id: '1',
      img: 'https://sun2-19.userapi.com/s/v1/ig2/Hq3CLd2VDtmKV7xsNCBjdQ4ZwqgWkeohusDRzHCvFy-Qmvb0KEU9VgNGyuE1wFQzUXESQ3TWTe5WdQ-xIrS9mzw8.jpg?size=100x100&quality=95&crop=333,13,951,951&ava=1',
      name: 'Валентина',
    },
    {
      id: '2',
      img: 'https://sun2-18.userapi.com/s/v1/ig2/SF4atf3pMy8dSNU7dWIHgg4vCsfBPUqwAQXyd9R3oZf1AAoGbI8hddm94TUiJ2CfwfKQcoQbwpUyFFPkL9Lq4Npg.jpg?size=100x100&quality=95&crop=47,47,452,452&ava=1',
      name: 'Павел',
    },
    {
      id: '3',
      img: 'https://sun2-18.userapi.com/s/v1/ig2/T8djmTsyAlrhRf5ArmnzY7x6hT5GygV_9QfNG9VoW4di0J8nhCiDpYLEtK0nuJxWEuymBz4PL2y02e7oqB6rr1dM.jpg?size=100x100&quality=95&crop=384,288,1124,1124&ava=1',
      name: 'Дмитрий',
    },
    {
      id: '4',
      img: 'https://sun2-18.userapi.com/s/v1/if1/Qs2AnOQGTEBAPGoXh52YW0j3yHw0n8u_eH_cY3PjNu8trpQCfsk6OyuSvA1Pr4kGVhm23YET.jpg?size=100x100&quality=96&crop=194,44,1175,1175&ava=1',
      name: 'Николай',
    },
    {
      id: '5',
      img: 'https://sun2-19.userapi.com/s/v1/ig2/Jx5dCri7nKIXDV-YHW-HfBcUnELtiZc-kNVhXDt5WpoOarYmMQHgKfLL4H_POtjKgUbKMkU3vEBfpwPvOLUNqSz6.jpg?size=100x100&quality=95&crop=45,346,1788,1788&ava=1',
      name: 'Артем',
    },
  ],
};

export const setRestApiRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/users', (req, res) => {
    res.send(fakeDB.users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const entity = fakeDB.users.find((i) => i.id === id);
    if (!entity) res.status(404).send({ message: 'User not found' });
    else res.send([entity]);
  });

  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = fakeDB.users.findIndex((i) => i.id === id);
    if (index === -1) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    fakeDB.users[index] = { ...fakeDB.users[index], ...req.body };
    res.send(fakeDB.users);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = fakeDB.users.findIndex((i) => i.id === id);
    if (index === -1) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    fakeDB.users[index] = { ...fakeDB.users[index], name: req.body?.name };
    res.send(fakeDB.users);
  });

  app.post('/users', (req, res) => {
    const id = (Math.max(...fakeDB.users.map((i) => parseInt(i.id, 10))) + 1).toString();
    fakeDB.users.push({ ...req.body, id });
    res.send(fakeDB.users);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    fakeDB.users = fakeDB.users.filter((i) => i.id !== id);
    res.send(fakeDB.users);
  });
};
