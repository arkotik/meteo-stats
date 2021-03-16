import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import Config from '../project.config';
import models from './models';
import App from './App';
import DeviceController from './controllers/DeviceController';
import { DataController } from './controllers';


export default function() {
  const options = { protocol: 'http:' };
  const app = express();
  const server = http.createServer(options, app);
  const io = socketIO(server);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    next();
  });
  const APP_SRC = path.join(Config.ROOT, 'dist');
  // app.use(express.static(APP_SRC, {
  //   dotfiles: 'deny',
  //   extensions: ['html', 'js', 'css', 'png', 'jpg', 'jpeg', 'svg', 'xls', 'wi', 'pdf']
  // }));
  app.get('/', async (req, res) => {
    const datum = await DataController.getLastItem(1);
    res.send(`Temperature: ${datum.temperature} &deg;C | Humidity: ${datum.humidity}%`);
    res.end();
  });
  app.post('/store', async (req, res) => {
    const { body, headers  } = req;
    const device = await DeviceController.findDevice(headers.authorization);
    if (!device) {
      res.send('Unauthorized');
      res.sendStatus(401);
      res.end();
      return;
    }
    await DataController.storeData(device.id, body);
    res.send('POST OK');
    res.end();
  });
  // app.get('*', (req, res) => {
  //   if (req.path.match(/\/assets\//)) {
  //     const filename = path.join(APP_SRC, req.path.replace(/^.*\/assets\//, '/assets/'));
  //     res.sendFile(filename);
  //     return;
  //   }
  //   const filename = path.join(APP_SRC, path.basename(req.path));
  //   if (fs.existsSync(filename)) {
  //     res.sendFile(filename);
  //   } else {
  //     res.sendFile(path.resolve(APP_SRC, 'index.html'));
  //   }
  // });
  models.sequelize
    .sync()
    .then(() => {
      console.log('DB OK');
      io.on('connection', (socket) => {
        console.log(`Socket connected: [${socket.id}]`);
        App(socket, io);
        socket.on('disconnect', (reason) => {
          console.log('disconnected', reason);
        }).on('error', (error) => {
          console.log('socket error');
          console.error(error);
        });
      });
      server.listen(+process.env.PORT, '0.0.0.0', () => {
        console.log(`Listening on port ${process.env.PORT}!`);
      });
    })
    .catch(console.error);
}