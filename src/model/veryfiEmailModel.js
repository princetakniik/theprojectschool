module.exports = (sequelize, Sequelize, DataTypes) => {
    const VeryfiEmail = sequelize.define("emailveryfi", {
      email: {
          type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.BIGINT,
      },
     
    });
    return  VeryfiEmail;
  };
  