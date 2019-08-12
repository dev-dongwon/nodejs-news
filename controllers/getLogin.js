module.exports = (req, res) => {
	res.clearCookie('auth_token', { path: '/' });
	res.clearCookie('express:sess', { path: '/' });
	res.clearCookie('express:sess.sig', { path: '/' });
	req.logout();
	res.render('login', { user: req.user });
};
