module.exports = (sequelize, Sequelize, DataTypes) => {
  const studentDetails = sequelize.define("studentdetails", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    institutionname: {
      type: DataTypes.STRING,
    },
    courseenrolled: {
      type: DataTypes.STRING,
    },
    class: {
        type: DataTypes.ENUM('1','2','3','4','5','6','7','8','9','10','11','12')
    },
    section: {
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
      "Z",),
    },
    classteacher: {
      type: DataTypes.STRING,
    },
    teacherId: {
      type: DataTypes.STRING,
    },
    token:{
      type: DataTypes.STRING(5000)
    },
    role: {
      type: DataTypes.ENUM("Admin", "Teacher", "Student"),
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return studentDetails;
};
