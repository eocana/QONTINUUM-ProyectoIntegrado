const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.post('/login', userController.login);

router.use(authenticateToken);

router.get('/users', userController.getAllUsers);
router.get('/users/:dni', userController.getUserByDni);
router.post('/users', userController.createUser);
router.put('/users/password', userController.updatePassword);
router.delete('/users', userController.deleteUser);

module.exports = router;
