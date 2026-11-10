const datastore = require('nedb-promises');
const path = require('path');

const db = {};
db.settings = datastore.create({ filename: path.join(__dirname, '../data/settings.db'), autoload: true });
db.history = datastore.create({ filename: path.join(__dirname, '../data/history.db'), autoload: true });

module.exports = db;