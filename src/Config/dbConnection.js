const mysql = require('mysql');
const {Sequelize,DataTypes,QueryTypes} = require('sequelize')
const Config = require('./config')
var connection = mysql.createConnection({
  host: Config.host,
  user: Config.user,
  password: Config.password,
  database: Config.database_name
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('db connected as id ' + connection.threadId);
  });

  module.exports =connection;

const sequelize =new Sequelize(Config.database_name,Config.user,Config.password,{
    port:Config.mysql_port,
    dialect: 'mysql',
    host: Config.host,
    logging: false
})
 sequelize.sync();
const db={}
db.sequelize=sequelize;
db.Sequelize=Sequelize;
// db.user=require('../model/userModel')(sequelize,Sequelize,DataTypes);
module.exports = db;