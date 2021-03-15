import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import socketIO from 'socket.io';
import Config from '../project.config';
import models from './models';
import App from './App';


export default function() {
  const options = { protocol: 'http:' };
  const app = express();
  const server = http.createServer(options, app);
  const io = socketIO(server);
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    next();
  });
  const APP_SRC = path.join(Config.ROOT, 'dist');
  app.use(express.static(APP_SRC, {
    dotfiles: 'deny',
    extensions: ['html', 'js', 'css', 'png', 'jpg', 'jpeg', 'svg', 'xls', 'wi', 'pdf']
  }));
  app.post('/store', (res, req) => {
    const { body } = req;
    console.log(body);
  });
  app.get('*', (req, res) => {
    if (req.path.match(/\/assets\//)) {
      const filename = path.join(APP_SRC, req.path.replace(/^.*\/assets\//, '/assets/'));
      res.sendFile(filename);
      return;
    }
    const filename = path.join(APP_SRC, path.basename(req.path));
    if (fs.existsSync(filename)) {
      res.sendFile(filename);
    } else {
      res.sendFile(path.resolve(APP_SRC, 'index.html'));
    }
  });
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