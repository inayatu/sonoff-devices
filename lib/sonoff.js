const ewelink = require('ewelink-api');
const conf = require('../conf.json');

exports.createEweLinkConn = (email, password, region) => {
  return new Promise((resolve, reject) => {
    try {
      const sonoff = new ewelink({
        email: email,
        password: password,
        region: region,
      });
      if (sonoff) return resolve(sonoff);
      return reject('Error creating eWelink Connection');
    } catch (error) {
      console.log(error);
      return reject('Error creating eWelink Connection');
    }
  });
};
