module.exports = (sequelize, Sequelize, DataTypes) => {
  const Institute = sequelize.define("institute", {
    institute_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    InstituteName: {
      type: DataTypes.STRING,
    },
    InstituteLogo: {
      type: DataTypes.STRING,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Institute;
};
