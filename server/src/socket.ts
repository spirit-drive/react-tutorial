import { Server } from 'socket.io';

type Message = {
  socketID: string;
  name?: string;
  msg: string;
};

const fakeDataBase: Message[] = [];

export const runSocket = () => {
  const SOCKET_PORT = parseInt(process.env.SOCKET_PORT) || 4043;
  const io = new Server(SOCKET_PORT, {
    cors: {
      origin: 'http://localhost:2033',
    },
  });

  io.on('connection', (socket) => {
    socket.on('msg', ({ msg, name }: { msg: string; name: string }) => {
      fakeDataBase.push({ socketID: socket.id, msg, name });
      io.emit('msgs', fakeDataBase);
    });

    socket.on('getMsgs', () => {
      socket.emit('msgs', fakeDataBase);
    });

    socket.on('test', (fun) => {
      console.log(fun, fun(1, 3));
    });
  });
};
