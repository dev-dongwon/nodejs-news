const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedOut } = require('../middlewares/login-auth');

router.get('/', isLoggedOut, function(req, res, next) {
	res.render('login', { title: 'LOGIN' });
});

router.post('/', isLoggedOut, (req, res, next) => {
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth', failureFlash: true });
});

module.exports = router;
