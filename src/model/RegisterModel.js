module.exports = (sequelize, Sequelize, DataTypes) => {
  const Register = sequelize.define("register", {
    email: {
        type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.BIGINT,
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
    institutionname:{
        type: DataTypes.STRING,
    },
    courseenrolled:{
        type: DataTypes.STRING,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Register;
};
