module.exports = (sequelize, Sequelize, DataTypes) => {
  const subCourses = sequelize.define("subcourses", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Institute:{
      type: DataTypes.INTEGER,
  },
    course: {
      type: DataTypes.INTEGER,
    },
    subcourses: {
      type: DataTypes.STRING,
    },
    startTime:{
      type: DataTypes.TIME,
    },
    endTime:{
      type: DataTypes.TIME,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return subCourses;
};
