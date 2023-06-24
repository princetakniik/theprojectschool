require("dotenv").config();
const {
  PORT,
  mysql_port,
  database_name,
  dialect,
  user,
  password,
  host,
  saltRound,
  JWT_SECRET,
  basePort,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_REGION,
  S3_BUCKET,
} = process.env;

module.exports = {
  PORT: PORT,
  mysql_port: mysql_port,
  database_name: database_name,
  host: host,
  user: user,
  password: password,
  dialect: dialect,
  saltRound: saltRound,
  JWT_SECRET: JWT_SECRET,
  basePort: basePort,
  AWS_ACCESS_KEY_ID:AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY:AWS_SECRET_ACCESS_KEY,
  S3_REGION:S3_REGION,
  S3_BUCKET:S3_BUCKET
};
