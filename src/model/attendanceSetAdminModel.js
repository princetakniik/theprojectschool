module.exports = (sequelize, Sequelize, DataTypes) => {
    const attendanceSetAdmin = sequelize.define("attendanceadmin", {
      user_id: {
        type: DataTypes.INTEGER,
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
      minAttendance:{
        type: DataTypes.INTEGER,
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
      startDate: {
        type: DataTypes.DATEONLY,
        field:'startDate'
      },
      endDate: {
        type: DataTypes.DATEONLY,
        field:'endDate'
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      
    });
    return attendanceSetAdmin;
  };
  