module.exports = (sequelize, Sequelize, DataTypes) => {
  const viewVideo = sequelize.define(
    "viewvideo",
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
      subCourseId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      videoId: {
        type: DataTypes.INTEGER,
      },
      videoMin: {
        type: DataTypes.STRING,
      },
      videoSawMin: {
        type: DataTypes.STRING,
      },
      status: {
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
  return viewVideo;
};
