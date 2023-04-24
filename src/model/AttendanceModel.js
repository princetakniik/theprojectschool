module.exports = (sequelize, Sequelize, DataTypes) => {
  const Attendance = sequelize.define("attendance", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    isPersent: {
      type: DataTypes.ENUM('1','2')
    },
    Comment: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Teacher", "Student"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      field:'date'
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Attendance;
};
