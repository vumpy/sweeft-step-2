var express = require('express');
var bodyParser = require('body-parser')

const sequelize = require('./database');

var userroute = require('./routes/user');
var carroute = require('./routes/car');
var adminroute = require('./routes/admin');

const User = require("./models/user");
const Car = require("./models/car");
const Zone = require("./models/zone");
const History = require("./models/history");

User.hasMany(Car, {as : 'owner', foreignKey: 'userid'});
Car.belongsTo(User, {foreignKey: 'userid'});

Zone.hasMany(History, {as: 'zonehistory', foreignKey: 'zoneid'});
History.belongsTo(Zone, {foreignKey: 'zoneid'});

User.hasMany(History, {as: 'userhistory', foreignKey: 'userid'});
History.belongsTo(User, {foreignKey: 'userid'});

var app = express();

sequelize.sync().then(result => {
    // console.log(result);
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userroute);
app.use('/car', carroute);
app.use('/admin', adminroute);

app.get('/', function (req, res) {
    res.send('Successful response.');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});