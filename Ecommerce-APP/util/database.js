const DBconfig = require("./dbConfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DBconfig.database, DBconfig.user,
    DBconfig.password, {
    host: DBconfig.host,
    dialect: DBconfig.dialect,
});

module.exports = sequelize;