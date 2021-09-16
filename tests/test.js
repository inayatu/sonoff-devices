const wifi = require('node-wifi');

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
  iface: null, // network interface, choose a random wifi interface if set to null
});

// Scan networks
wifi.scan((error, networks) => {
  if (error) {
    console.log(error);
  } else {
    console.log(networks);
  }
});

// List the current wifi connections
wifi.getCurrentConnections((error, currentConnections) => {
  if (error) {
    console.log(error);
  } else {
    console.log(currentConnections);
  }
});

var WiFiControl = require('wifi-control');

//  Initialize wifi-control package with verbose output
WiFiControl.init({
  debug: true,
});

//  Try scanning for access points:
WiFiControl.scanForWiFi(function (err, response) {
  if (err) console.log(err);
  console.log(response);
});
