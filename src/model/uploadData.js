module.exports = (sequelize, Sequelize, DataTypes) => {
  const uploadData = sequelize.define("uploaddata", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
    },
    fileData: {
        type: DataTypes.BLOB("long")
    },
    filePath: {
      type: DataTypes.BLOB("long")
    },
    fileImage:{
      type: DataTypes.STRING(1000),
    }
  });
  return uploadData;
};
