module.exports = (sequelize, Sequelize, DataTypes) => {
  const FeedBack = sequelize.define("feedBack", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    image:{
        type: DataTypes.STRING,
    },
    feedback: {
      type: DataTypes.STRING(1000),
    },
    institutionId: {
      type: DataTypes.INTEGER,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return FeedBack;
};
