/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Чтобы использовать дополнительное api для expect. Без этого будет говорить что метода нет

const AsyncComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    // Здесь может быть запрос на сервер
    setTimeout(() => {
      setLoading(false);
      setData('Hello, World!');
    }, 1000);
  }, []);

  return <div>{loading ? 'Loading...' : `Data: ${data}`}</div>;
};

describe('AsyncComponent', () => {
  test('component should write data after loading 1', async () => {
    const { queryByText, findByText } = render(<AsyncComponent />);

    // Проверяем, что данные еще не отрисованы
    expect(queryByText('Loading...')).toBeInTheDocument();
    expect(queryByText('Data:')).not.toBeInTheDocument();

    // Ждем загрузки данных и проверяем, что данные отрисованы
    expect(await findByText('Data: Hello, World!')).toBeInTheDocument();
    expect(queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('component should write data after loading 2', async () => {
    const { queryByText } = render(<AsyncComponent />);

    // Проверяем, что данные еще не отрисованы
    expect(queryByText('Loading...')).toBeInTheDocument();
    expect(queryByText('Data:')).not.toBeInTheDocument();

    // Ждем загрузки данных и проверяем, что данные отрисованы
    await waitFor(
      () => {
        expect(queryByText('Data: Hello, World!')).toBeInTheDocument();
        expect(queryByText('Loading...')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
