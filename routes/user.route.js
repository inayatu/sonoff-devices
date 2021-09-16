const router = require('express').Router();

const userCtrl = require('../controllers/user.ctrl');

router.route('/login').post(userCtrl.newLogin);
// router.route('/login').post(userCtrl.login);

router.route('/').get(userCtrl.getUsers).post(userCtrl.createUser);

router.route('/:id').patch(userCtrl.updateUser).delete(userCtrl.deleteUser);

module.exports = router;
