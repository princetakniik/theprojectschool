const {
  getDistance,
  geoLocation,
  getLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
  distance,
  getDistanceFromLatLonInKm,
  fetchLocationName,
  getLocationBylatlon,
} = require("../middleware/googleMaps");

module.exports = (app) => {
  app.get("/getDistance", (req, res) => getDistance(req, res));
  app.post("/geoLocation", (req, res) => geoLocation(req, res));
  app.get("/getLocation", (req, res) => getLocation(req, res));
  app.get("/getLocationById", (req, res) => getLocationById(req, res));
  app.put("/updateLocation", (req, res) => updateLocation(req, res));
  app.delete("/deleteLocation", (req, res) => deleteLocation(req, res));
  app.get("/distance", (req, res) => distance(req, res));
  app.get("/getDistanceFromLatLonInKm", (req, res) =>
    getDistanceFromLatLonInKm(req, res)
  );
  app.get("/fetchLocationName", (req, res) => fetchLocationName(req, res));
  app.get("/getLocationBylatlon", (req, res) => getLocationBylatlon(req, res));
};
