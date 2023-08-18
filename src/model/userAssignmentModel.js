module.exports = (sequelize, Sequelize, DataTypes) => {
  const userAssignments = sequelize.define(
    "userassignment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      assignmentsId: {
        type: DataTypes.INTEGER,
      },
      assignmentPaths: {
        type: DataTypes.STRING(1000),
      },
      submitDate: {
        type: DataTypes.DATEONLY,
        field: "submitDate",
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
      marks: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("Created", "Pending", "Submitted"),
      },
      uploadPathUrl: {
        type: DataTypes.STRING(1000),
      },
      upstatus: {
        type: DataTypes.ENUM("0", "1"),
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
  return userAssignments;
};
