module.exports = (sequelize, Sequelize, DataTypes) => {
  const teacherModule = sequelize.define(
    "teachermodule",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      instituteId: {
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER,
      },
      subcourseId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING(1000),
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      teachDate: {
        type: DataTypes.DATEONLY,
        field: "teachDate",
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
    },
    {
      timestamps: true,
    }
  );
  return teacherModule;
};
