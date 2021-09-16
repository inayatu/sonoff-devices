const mongoose = require('mongoose');
const config = require('./conf.json');
const app = require('./app');

const port = config.port;

mongoose
  .connect(config.db_uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then((conn) => {
    console.log(`[+] DB connected`);
  })
  .catch((err) => {
    console.log(`[-] DB connection failed ${err}`);
  });

app.listen(port, () => {
  console.log(`[+] Server running on port: ${port}`);
});
