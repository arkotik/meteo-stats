const { DB_HOST, DB_DIALECT, DB_NAME, DB_USER, DB_PASS } = process.env;
const { WS_PING_TIMEOUT, WS_PING_INTERVAL } = process.env;

module.exports = {
  env: process.env.NODE_ENV || 'development',
  dbConfig: {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    dialect: DB_DIALECT,
    operatorsAliases: false,
    logging: false,
  },
  ws: {
    pingTimeout: WS_PING_TIMEOUT,
    pingInterval: WS_PING_INTERVAL,
  },
  useSSL: false,
  ROOT: __dirname,
};
