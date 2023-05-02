require("dotenv").config();
const { PORT, mysql_port, database_name, dialect, user,
    password,host,saltRound ,JWT_SECRET,basePort} = process.env;

module.exports = {
  PORT: PORT,
  mysql_port: mysql_port,
  database_name: database_name,
  host: host,
  user:user,
  password :password ,
  dialect:dialect,
  saltRound:saltRound,
  JWT_SECRET:JWT_SECRET,
  basePort:basePort
};
