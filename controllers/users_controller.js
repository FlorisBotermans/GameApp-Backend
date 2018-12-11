const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    register(req, res, next) {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: User.hashPassword(req.body.password)
        });

        user.save()
            .then((user) => res.status(201).send(user))
            .catch(next);
    },

    login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    if (user.isValid(req.body.password)) {
                        let token = jwt.sign({username: user.userName}, 'secret', {expiresIn: '2d'});

                        res.status(200).send(token);
                    } else {
                        res.status(501).send('Invalid Credentials');
                    }
                } else {
                    res.status(501).send('User email is not registered.')
                }
            })
            .catch(() => res.status(501).send('Some internal error'));
    }
}