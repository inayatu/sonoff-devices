const ewelink = require('../lib/sonoff');
const Device = require('../models/device.model');
const user = require('../models/device.model');

exports.getFirmwareVersion = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let firmware = await sonoff.getFirmwareVersion(req.params.id);
    res.json({
      status: 'success',
      data: { data: firmware },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.setDevicePowerState = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let power_state = await sonoff.setDevicePowerState(req.params.id, 'on');
    res.json({
      status: 'success',
      data: { data: power_state },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDevicePowerState = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let power_state = await sonoff.getDevicePowerState(req.params.id);
    res.json({
      status: 'success',
      data: { data: power_state },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDeviceCurrentTH = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let temp_humid = await sonoff.getDeviceCurrentTH(req.params.id);
    res.json({
      status: 'success',
      data: { data: temp_humid },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDeviceCurrentHumidity = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let current_humid = await sonoff.getDeviceCurrentHumidity(req.params.id);
    res.json({
      status: 'success',
      data: { data: current_humid },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDeviceCurrentTemperature = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let current_tem = await sonoff.getDeviceCurrentTemperature(req.params.id);
    res.json({
      status: 'success',
      data: { data: current_tem },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDevicePowerUsage = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let power_usage = await sonoff.getDevicePowerUsage(req.params.id);
    res.json({
      status: 'success',
      data: { data: power_usage },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// Toggle (ON/OFF) the device
exports.toggleDevice = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    await sonoff.toggleDevice(req.params.id);
    res.json({
      status: 'success',
      data: { data: 'device toggeled' },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// TODO
exports.createDevice = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDevice = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// List of all connected devices
exports.getDevices = async (req, res) => {
  try {
    let sonoff = await ewelink.createEweLinkConn(req.user.email, req.user.password, req.user.region);
    let devices = await sonoff.getDevices();
    res.json({
      status: 'success',
      results: devices.length,
      data: devices,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// TODO
exports.updateDevice = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// TODO
exports.deleteDevice = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
