module.exports = (sequelize, Sequelize, DataTypes) => {
    const UserCourses = sequelize.define("usercourses", {
      course_id: {
        type: DataTypes.INTEGER,
      },
      Institute_id: {
        type: DataTypes.INTEGER,
      },
      user_id:{
        type: DataTypes.INTEGER,
      },
      teacher_id:{
        type: DataTypes.INTEGER,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });
    return UserCourses;
  };