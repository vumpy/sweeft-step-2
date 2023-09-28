const User = require('../models/user');
const History = require('../models/history');
const Zone = require('../models/zone');
const bcypt = require('bcrypt');
const {createTimer} = require('./settime');

const jwt = require('jsonwebtoken');
require('dotenv').config();

function updatebalance(args) {

}


module.exports = {
    registerUser: async (req, res) => {
        const{ username, password }  = req.body;

        const usercount = User.findAll({
            where: {
                username: username
            },
        });
        if(usercount.length > 0) {
            return res.badRequest().json({message: "User with this username already exists"});
        }
        else {
            let hashedPassword = await bcypt.hash(password, 8)
            const user = User.create( {
                username: username,
                password: hashedPassword,
            })

            return res.status(200).json({ message: "User Registered"});
        }
    },

    loginUser: async (req, res) => {
        const {username, password } = req.body;

        const user = await User.findOne({ 
            where: {
                username: username
            },
        })

        if(user === null) {
            return res.status(401).json({message: "User not found!"});
        }
        else{
            bcypt.compare(password, user.password, (err, data) => {
                if(err) {
                    
                }

                if(data) {
                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
                    return res.status(200).json({
                        username: username,
                        balance: user.balance,
                        token: accessToken,
                    })
                }
                else {
                    return res.status(401).json({message: "Invalid Password"});
                }
            })
        }
    },

    changePass: async (req, res) => {
        const {newpassword} = req.body;

        let hashedPassword = await bcypt.hash(newpassword, 8);

        req.user.password = hashedPassword;

        const user = await User.findOne( {
            where: {
                username: req.user.username
            }
        });

        await user.save();

        return res.status(200).json({message: "Password Updated"});
    },

    reserveZone: async (req, res) => {
        const {carid, zoneid, duration} = req.body;

        if(carid === undefined || zoneid === undefined || duration === undefined) {
            return res.status(401).json({message: "Not enough parameters"});
        }
        else {
            const history = await History.create({
                zoneid: zoneid,
                carid: carid,
                userid: req.user.id,
                isactive: true,
            });

            const zone = await Zone.findOne({
                where: {
                    id:zoneid,
                }
            });

            const user = await User.findOne({
                where:{
                    id:req.user.id,
                }
            });

            const fair = zone.fair;

            for(let i = 0; i < duration; i++) {
                const timer = createTimer(fair,user);
            }

            return res.status(200).json({message: "Zone reserved and your balance will be updated"});
        }
    },

    seeHistory: (req, res) => {
        History.findAll({
            where: {
                userid: req.user.id,
            }
        }).then(history => {
            res.status(200).json(history);
        })
    },

}