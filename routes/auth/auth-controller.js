const User = require('../../model/user');
const jwtController = require('../../src/jwt-controller');

module.exports = {
    register : async (request, response, next) => {
        try {
                const { email, password, nickname } = request.body;
                if (!email || !password || !nickname) throw Error("email, password and nickname is required");
                const user = await User.create( email, password, nickname );
                await user.save();
                response.redirect('/');
        } catch(error) {
            next(error);
        }
    },

    login : async (request, response, next) => {
        try {
            let token;
            const { email, password } = request.body;
            const user = await User.findOneByEmail(email);
            if (!user) throw Error("Invalided email!");
            if(user.verify(password)) {
                token = await jwtController.makeToken(user);
            }
            response.cookie('jwt', token);
            response.json({
                message:"login success"
            });
        } catch(error) {
            next(error);
        }
    },

    googleAuthenticate : (passport) => {
        return passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
    },

    googleCallbackAuthenticate : (passport) => {
        return passport.authenticate('google', { failureRedirect: '/login.html' });
    },

    setTokenToCookie: (request, response) => {
        response.cookie('jwt', request.user.token);
        response.redirect('/');
    }
}