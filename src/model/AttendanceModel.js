module.exports = (sequelize, Sequelize, DataTypes) => {
  const Attendance = sequelize.define("attendance", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    isPersent: {
      type: DataTypes.ENUM('0','1'),
      allowNull: '0',
      defaultValue: '1',
    },
    Comment: {
      type: DataTypes.STRING,
    },
    section:{
      type: DataTypes.ENUM("A","B","C","D","E","F","G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "s",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"),
    },
    class:{
      type: DataTypes.ENUM('1','2','3','4','5','6','7','8','9','10','11','12')
    },
    coursesId:{
      type: DataTypes.INTEGER,
    },
    institutionId:{
      type: DataTypes.INTEGER,
    },
    subCoursesId:{
      type: DataTypes.INTEGER,
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
