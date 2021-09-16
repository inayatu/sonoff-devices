const ewelink = require('ewelink-api');
const conf = require('./conf.json');

(async () => {

  const connection = new ewelink({
    email: conf.email,
    password: conf.password,
    region: conf.region
  });

  console.log(connection);
  /* get all devices */
  const devices = await connection.getDevices();
  console.log(devices);

  /* get specific devide info */
  const device = await connection.getDevice('5fd765e88983980007ab3f7b');
  console.log(device);

  /* toggle device */
  await connection.toggleDevice('5fd765e88983980007ab3f7b');

})();