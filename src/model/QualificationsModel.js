module.exports = (sequelize, Sequelize, DataTypes) => {
  const Qualifications = sequelize.define("qualifications", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    X_Passed: {
      type: DataTypes.ENUM("Yes", "No"),
    },
    X_PassedYear: {
      type: DataTypes.DATEONLY,
    },
    X_marks: {
      type: DataTypes.INTEGER,
    },
    XII_Passed: {
      type: DataTypes.ENUM("Yes", "No"),
    },
    XII_PassedYear: {
      type: DataTypes.DATEONLY,
    },
    XII_Marks: {
      type: DataTypes.INTEGER,
    },
    graduate_Year: {
      type: DataTypes.DATEONLY,
    },
    graduation: {
      type: DataTypes.ENUM("Yes", "No"),
    },
    Marks_Graduare: {
      type: DataTypes.INTEGER,
    },
    Stream: {
      type: DataTypes.ENUM("Scince", "Commerce", "Humanity", "etc"),
    },
    Highest_degree: {
      type: DataTypes.STRING,
    },
    FieldsOfStudy: {
      type: DataTypes.STRING,
    },
    ProfessionalCertificationApp: {
      type: DataTypes.ENUM("Yes", "No"),
    },
    ProfessionalCertificationName: {
      type: DataTypes.STRING,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Qualifications;
};
