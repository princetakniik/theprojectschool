module.exports = (sequelize, Sequelize, DataTypes) => {
  const Assignments = sequelize.define(
    "assignment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      assignmentsName: {
        type: DataTypes.STRING,
      },
      assignmentsPaths: {
        type: DataTypes.STRING(1000),
      },
      lastDate: {
        type: DataTypes.DATEONLY,
        field: "lastDate",
      },
      instituteId: {
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER,
      },
      subCourseId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING(1000),
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
  return Assignments;
};
