require("dotenv").config();
const { PORT, mysql_port, database_name, dialect, user,
    password,host } = process.env;

module.exports = {
  PORT: PORT,
  mysql_port: mysql_port,
  database_name: database_name,
  host: host,
  user:user,
  password :password ,
  dialect:dialect
};
