// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from 'socket.io-client';
import { HOST, SOCKET_PORT } from 'src/client/config';

export const socket = io(`ws://${HOST}:${SOCKET_PORT}`, {
  reconnectionDelayMax: 10000,
});
