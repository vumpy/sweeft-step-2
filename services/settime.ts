const User = require('../models/user')

type TimerFunction = (fair: number, user: typeof User) => NodeJS.Timeout;

export function createTimer(fair: number, user: typeof User) {
    const timer = setTimeout(async () => {
        const bal = user.balance - fair;
        user.balance = bal;
        await user.save();
    }, 1000 * 60 * 60);

    return timer;
};