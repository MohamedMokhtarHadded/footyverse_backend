var express = require('express');
var router = express.Router();
require("dotenv").config();
const authenticateUser = require('../middleware/middleware');

const { register, login, users, token, resetpwd,deleteUser,updateUser,sendEmail,forgetpwd} = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/users', users);
router.get('/token', token);
router.post('/sendEmail', sendEmail);

router.delete('/delete/:id', deleteUser);
router.put("/:id", updateUser);
router.post("/forgetpwd", forgetpwd);
router.put("/resetpwd", resetpwd);
router.get('/protected', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'You are authorized' });
});



module.exports = router;