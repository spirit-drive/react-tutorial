// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from 'socket.io-client';
import { HOST, SOCKET_PORT } from 'src/app/client/config';

export const socket = io(`ws://${HOST}:${SOCKET_PORT}`, {
  auth: (cb) => {
    cb({
      token: 'token',
    });
  },
});
