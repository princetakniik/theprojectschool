module.exports = (sequelize, Sequelize, DataTypes) => {
    const userSkill = sequelize.define("userskill", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id:{
        type: DataTypes.INTEGER,
      },
      skill_id: {
        type: DataTypes.INTEGER,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });
    return userSkill;
  };