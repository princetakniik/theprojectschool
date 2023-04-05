module.exports = (sequelize, Sequelize, DataTypes) => {
  const Attendance = sequelize.define("attendance", {
    userId: {
      type: DataTypes.STRING,
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
      type: DataTypes.DATE,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Attendance;
};
