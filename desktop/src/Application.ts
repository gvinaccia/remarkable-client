import { WindowManager } from './WindowManager';
import { Client } from './api/Client';
import { Storage } from './storage/Storage';
import { Messages } from './shared';
import { connect, HasResponseChannel, IpcMessageEvent, settings } from './utils';

export class Application {

  private wm = new WindowManager();
  private apiClient!: Client;
  private storage: Storage;

  private deviceRegistered = false;

  constructor(storagePath: string) {
    this.storage = new Storage(storagePath);
  }

  start(indexFile: string) {
    const secret = settings.get('auth.token') as string;

    if (secret) {
      this.apiClient = new Client(secret);
      this.deviceRegistered = true;
    }

    connect(Messages.GET_REGISTRATION_STATUS, this.handleRegistrationStatusRequest.bind(this));
    connect(Messages.LOAD_ITEMS, this.handleLoadItems.bind(this));
    connect(Messages.GET_FULL_ITEM, this.handleGetFullItem.bind(this));

    this.wm.getMainWindow().loadURL(indexFile);
  }

  handleRegistrationStatusRequest(event: IpcMessageEvent, message: HasResponseChannel) {
    event.sender.send(message.respondTo, { registered: this.deviceRegistered });
  }

  handleLoadItems(event: IpcMessageEvent) {
    this.apiClient.init()
      .then(() => this.apiClient.listItems(), console.error)
      .then(items => {
        event.sender.send(Messages.ITEMS, items);
        return items;
      })
      .then(items => {
        this.storage.sync(items)
          .then(() => {
            event.sender.send(Messages.ITEMS_DOWNLOADED);
          });
      });
  }

  handleGetFullItem(event: IpcMessageEvent, itemId: string) {
    this.storage.getItem(itemId).then(r => event.sender.send(Messages.ITEM_FULL, r));
  }

  restoreMainWindow() {
    const win = this.wm.getMainWindow();
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
}
