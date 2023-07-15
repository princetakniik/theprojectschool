module.exports = (sequelize, Sequelize, DataTypes) => {
  const geoLocation = sequelize.define(
    "geolocation",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.INTEGER },
      ip: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      region: { type: DataTypes.STRING },
      region_code: { type: DataTypes.STRING },
      region_type: { type: DataTypes.STRING },
      country_name: { type: DataTypes.STRING },
      country_code: { type: DataTypes.STRING },
      latitude: { type: DataTypes.INTEGER },
      longitude: { type: DataTypes.INTEGER },
      postal: { type: DataTypes.STRING },
      calling_code: { type: DataTypes.STRING },
      flag: { type: DataTypes.STRING },
      emoji_flag: { type: DataTypes.STRING },
      route: { type: DataTypes.STRING },
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
  return geoLocation;
};
