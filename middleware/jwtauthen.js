const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

module.exports = {
    authenticateToken: (req,res,next) => {
        const authheader = req.headers.authorization;
        const token = authheader && authheader.split(' ')[1];
        if(token == null) return res.status(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403);

            req.user = user;
            next();
        })
    },

    checkadmin: async (req,res) => {
        const user =  await User.findOne({
            where: {
                id: req.user.id,
            }
        })

        return user.isadmin;
    }

}