module.exports = (sequelize, Sequelize, DataTypes) => {
  const studentLimit = sequelize.define(
    "studentlimit",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      instituteId: {
        type: DataTypes.INTEGER,
      },
      maxNoOfStudents:{
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING(1000),
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return studentLimit;
};
