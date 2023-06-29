module.exports = (sequelize, Sequelize, DataTypes) => {
  const userFeedBack = sequelize.define("userfeedback", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    feedback: {
      type: DataTypes.STRING(1000),
    },
    institutionId: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      type: DataTypes.INTEGER,
    },
    subCourseId: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    responsiveness: { type: DataTypes.INTEGER },
    attentive: { type: DataTypes.INTEGER },
    politeness: { type: DataTypes.INTEGER },
    studentId: {
      type: DataTypes.INTEGER,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return userFeedBack;
};
