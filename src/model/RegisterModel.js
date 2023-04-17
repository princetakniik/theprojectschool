module.exports = (sequelize, Sequelize, DataTypes) => {
  const Register = sequelize.define("register", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  
    password: {
        type: DataTypes.STRING,
    },
    fname:{
        type: DataTypes.STRING,
    },
    lname:{
        type: DataTypes.STRING,
    },
    username:{
        type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.BIGINT,
    },
    token: {
      type: DataTypes.STRING(1000),
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Register;
};
