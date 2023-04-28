module.exports = (sequelize, Sequelize, DataTypes) => {
  const studentDetails = sequelize.define("studentdetails", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    profilePhoto: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    institutionname: {
      type: DataTypes.STRING,
    },
    InstituteLogo: {
      type: DataTypes.STRING,
    },
    courses: {
      type: DataTypes.INTEGER,
    },
    subCourses: {
      type: DataTypes.INTEGER,
    },
    class: {
      type: DataTypes.ENUM(
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ),
    },
    section: {
      type: DataTypes.ENUM(
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
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
        "Z"
      ),
    },
    classteacher: {
      type: DataTypes.STRING,
    },
    teacherId: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Teacher", "Student", "Institute"),
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
