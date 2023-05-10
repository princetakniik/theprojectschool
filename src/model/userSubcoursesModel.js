module.exports = (sequelize, Sequelize, DataTypes) => {
  const UserSubcourses = sequelize.define("usersubcourses", {
    subcourses_id: {
      type: DataTypes.INTEGER,
    },
    course_id: {
      type: DataTypes.INTEGER,
    },
    Institute_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    teacher_Id:{
      type: DataTypes.INTEGER,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return UserSubcourses;
};
