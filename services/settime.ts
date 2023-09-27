const User = require('../models/user');

let timer = setTimeout(async (fair: number, user: typeof User) => {
    const bal = user.balance - fair;
    user.balance = bal;
    await user.save();
});

module.exports = timer;