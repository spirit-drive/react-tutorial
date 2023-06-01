import { store } from '../../index';
import { tokenActions } from '../../token';

type TokenChannelMessageInit = {
  type: 'init';
};

type TokenChannelMessageSet = {
  type: 'set';
  payload: string;
};

type TokenChannelMessage = TokenChannelMessageSet | TokenChannelMessageInit;

export class TokenChannel {
  channel: BroadcastChannel;

  init: boolean;

  wasUpdated: boolean;

  token: string | undefined;

  constructor(key: string) {
    this.channel = new BroadcastChannel(key);
    this.wasUpdated = false;
    this.init = false;

    this.channel.addEventListener('message', (event: MessageEvent<TokenChannelMessage>) => {
      const { type } = event.data;
      switch (type) {
        case 'init': {
          if (this.token) {
            this.wasUpdated = true;
            this.channel.postMessage({ type: 'set', payload: this.token });
          }

          break;
        }

        case 'set': {
          this.wasUpdated = true;
          const token = (<TokenChannelMessageSet>event.data).payload;
          if (token) {
            store.dispatch(tokenActions.set(token));
          } else {
            store.dispatch(tokenActions.logout());
          }
          break;
        }

        default:
          break;
      }
    });
  }

  setToken = (token: string) => {
    this.token = token;

    if (!this.init) {
      this.init = true;
      this.channel.postMessage({ type: 'init' });
      return;
    }

    if (this.wasUpdated) {
      this.wasUpdated = false;
      return;
    }

    this.channel.postMessage({ type: 'set', payload: token });
  };
}
