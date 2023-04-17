module.exports = (sequelize, Sequelize, DataTypes) => {
  const VeryfiEmail = sequelize.define("emailveryfi", {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    otp: {
      type: DataTypes.BIGINT,
    },
  });
  return VeryfiEmail;
};
