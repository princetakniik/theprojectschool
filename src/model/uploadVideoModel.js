module.exports = (sequelize, Sequelize, DataTypes) => {
  const UploadVideo = sequelize.define(
    "uploadvideo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      videosPathsUrl: {
        type: DataTypes.STRING(1000),
      },
      fileName: {
        type: DataTypes.STRING,
      },
      videoImage: {
        type: DataTypes.STRING(1000),
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
  return UploadVideo;
};
