const ewelink = require('../lib/sonoff');
const User = require('../models/user.model');

exports.isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findById(req.headers.user);
    if (!user) throw new Error(`User isn't verified`);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

/**
 * Check if the given email already exists in database. If not,
 * get only email & password which was used to create ewelink
 * If those credentials are correct then get devices and create new user
 */
exports.newLogin = async (req, res) => {
  try {
    let { email, password, region } = req.body;

    if (!email || !password) throw new Error('Please provide email & password');
    const user = await User.findOne({ email: email });

    // If user exists
    if (user && user.password == password) {
      // Cookie expires in 1 hr
      user.password = null;
      return res
        .status(200)
        .cookie('user', user._id.toString(), { expires: new Date(Date.now() + 3600000) })
        .json({
          status: 'success',
          data: user,
        });
    } else if (user && user.password != password) {
      throw new Error('Password is wrong');
    }

    // For new user

    // check if given email is registered on ewelink, if yes create account else return error
    region = region ? region.toLowerCase().trim() : 'us';
    const sonoff = await ewelink.createEweLinkConn(email, password, region);

    let devices = await sonoff.getDevices();
    if (devices.error == 406) throw new Error('Make sure, you have aleady created ewelink account and your credentials are correct');

    const newUser = new User({
      first_name: email.split('@')[0],
      email,
      password,
      region: sonoff.region,
      devices,
      ewelink: sonoff,
    });
    newUser
      .save()
      .then((usr) => {
        // Cookie expires in 1 hr
        usr.password = null;
        return res
          .status(200)
          .cookie('user', usr._id.toString(), { expires: new Date(Date.now() + 3600000) })
          .json({
            status: 'success',
            data: usr,
          });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'fail',
          message: err.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, region } = req.body;
    if (!email || !password) throw new Error('Please provide email and password');
    const user = await User.findOne({ email, password });
    if (user)
      return res.status(200).cookie('user', user._id.toString()).json({
        status: 'success',
        data: user,
      });

    return res.status(400).json({
      status: 'fail',
      message: 'No user found with given email and password.',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, region } = req.body;

    const user = await User.findOne({ email: email });
    if (user) return res.status(403).json({ status: 'fail', message: 'User already exists' });

    const sonoff = await ewelink.createEweLinkConn(email, password);
    // const sonoff = await ewelink.createEweLinkConn(email, password, region);
    req.body.ewelink = sonoff;
    req.body.devices = await sonoff.getDevices();

    if (req.body.devices.error == 406) {
      // User isn't registered already on ewelink
      // User must be registered first on ewelink
      return res.status(200).json({
        status: 'fail',
        message: 'Please first register yourself on Ewelink and then use the same email, password here. ',
      });
    }

    const newUser = new User(req.body);
    newUser
      .save()
      .then((usr) => {
        return res.status(201).json({
          status: 'success',
          data: { data: newUser },
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 'fail',
          message: err,
        });
      });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
