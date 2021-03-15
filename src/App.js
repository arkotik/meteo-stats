import Manager                                   from '../lib/Manager';
import { MAP as controllersMap, BaseController } from './controllers';

function App(socket, io) {
  const manager = new Manager(socket);
  BaseController.manager = manager;
  BaseController.io = io;
  BaseController.app = this;
  try {
    for (const event in controllersMap) {
      const Controller = controllersMap[event];
      manager.addEvent(event, ({ action, data }) => {
        console.log({ action, data });
        const controller = new Controller({ action, data, socket });
        controller
          .runAction()
          .then((response) => {
            if (response !== void 0) {
              socket.emit(event, { action, success: true, data: response });
            }
          })
          .catch((err) => {
            console.error(err);
            socket.emit(event, { action, success: false, data: { message: err.message } });
          });
      });
    }
  } catch (err) {
    console.error(err);
    // socket.emit({ action: 'error', success: false, data: { message: err.message } });
  }
}

export default App;
