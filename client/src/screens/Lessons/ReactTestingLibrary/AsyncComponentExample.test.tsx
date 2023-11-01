/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
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
  test('component should write data after loading', async () => {
    render(<AsyncComponent />);

    // Проверяем, что данные еще не отрисованы
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Data:')).not.toBeInTheDocument();

    // Ждем загрузки данных и проверяем, что данные отрисованы
    expect(await screen.findByText('Data: Hello, World!', {}, { timeout: 2000 })).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
