module.exports = (sequelize, Sequelize, DataTypes) => {
  const subCourses = sequelize.define("subcourses", {
    subcourses_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    InstituteId: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      type: DataTypes.INTEGER,
    },
    subcourses: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING(1000),
    },
    startTime: {
      type: DataTypes.TIME,
    },
    endTime: {
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
