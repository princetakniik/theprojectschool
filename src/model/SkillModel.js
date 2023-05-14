module.exports = (sequelize, Sequelize, DataTypes) => {
  const Skill = sequelize.define("skill", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    skillName: {
      type: DataTypes.STRING,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Skill;
};
