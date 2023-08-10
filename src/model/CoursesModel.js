module.exports = (sequelize, Sequelize, DataTypes) => {
  const Courses = sequelize.define("courses", {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Institute: {
      type: DataTypes.INTEGER,
    },
    course: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    startTime: {
      type: DataTypes.TIME,
    },
    endTime: {
      type: DataTypes.TIME,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    coursesImage: {
      type: DataTypes.STRING(1000),
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Courses;
};
