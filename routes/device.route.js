const router = require('express').Router();

const deviceCtrl = require('../controllers/device.ctrl');
const userCtrl = require('../controllers/user.ctrl');

router.route('/toggle/:id').post(userCtrl.isLoggedIn, deviceCtrl.toggleDevice);
router.route('/power-usage/:id').get(userCtrl.isLoggedIn, deviceCtrl.getDevicePowerUsage);
router.route('/power/:id').get(userCtrl.isLoggedIn, deviceCtrl.getDevicePowerState).post(userCtrl.isLoggedIn, deviceCtrl.setDevicePowerState);
router.route('/humidity/:id').get(userCtrl.isLoggedIn, deviceCtrl.getDeviceCurrentHumidity);
router.route('/temprature/:id').get(userCtrl.isLoggedIn, deviceCtrl.getDeviceCurrentTemperature);
router.route('/temp-humid/:id').get(userCtrl.isLoggedIn, deviceCtrl.getDeviceCurrentTH);
router.route('/firmware/:id').get(userCtrl.isLoggedIn, deviceCtrl.getFirmwareVersion);

router.route('/').get(userCtrl.isLoggedIn, deviceCtrl.getDevices).post(userCtrl.isLoggedIn, deviceCtrl.createDevice);
router.route('/:id').patch(userCtrl.isLoggedIn, deviceCtrl.updateDevice).delete(userCtrl.isLoggedIn, deviceCtrl.deleteDevice);

module.exports = router;
