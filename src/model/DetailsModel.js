module.exports = (sequelize, Sequelize, DataTypes) => {
  const studentDetails = sequelize.define("studentdetails", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    profilePhoto: {
      type: DataTypes.STRING(1000),
    },
    address: {
      type: DataTypes.STRING(1000),
    },
    city: {
      type: DataTypes.STRING,
    },
    Additional: {
      type: DataTypes.STRING,
    },
    zipCode: { type: DataTypes.BIGINT },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.BIGINT,
    },
    institutionId: {
      type: DataTypes.INTEGER,
    },
    coursesId: {
      type: DataTypes.INTEGER,
    },
    subCoursesId: {
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

    teacherId: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Teacher", "Student","Principal"),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "etc"),
      allowNull: false,
    },
    dob: { type: DataTypes.DATEONLY, field: "date" },
    Department_Id: {
      type: DataTypes.INTEGER,
    },
    Semester: {
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
    eContactName: {
      type: DataTypes.STRING,
    },
    eContactNum: {
      type: DataTypes.BIGINT,
    },
    eContactRela: {
      type: DataTypes.STRING,
    },
    Employee_ID: {
      type: DataTypes.STRING,
    },
    TIWExperience: {
      type: DataTypes.INTEGER,
    },
    TTWExperience: {
      type: DataTypes.INTEGER,
    },
    Title: {
      type: DataTypes.ENUM(
        "Professor",
        "Associate Professor",
        "Assistant Professor",
        "etc"
      ),
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return studentDetails;
};
