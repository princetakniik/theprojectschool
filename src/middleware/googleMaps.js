const Config = require("../Config/config");
var haversine = require("haversine-distance");
const axios = require("axios");
const IPData = require("ipdata");
const { geolocation } = require("../Config/dbConnection");
const db = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const WorldCities = require('worldcities');

const geoLocation = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const geoData = await geolocation.create({
      userId: rest.userId,
      lat: rest.lat,
      lng: rest.lng,
      countryCode: rest.countryCode,
      ip: rest.ip,
    });
    res.status(200).json({ msg: `geoLocation is inserted....`, data: geoData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `geo location not insert`, err });
  }
};

const getLocation = async (req, res) => {
  try {
    const locationData = await db.sequelize.query(
      `
      select g.id ,g.userId ,g.ip ,g.city ,g.region ,g.region_code ,g.region_type ,g.country_name ,
      g.country_code,g.latitude,g.longitude,g.postal,g.calling_code,g.flag,g.emoji_flag,g.route 
      from geolocations g 
      where g.isDelete=false 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
  res.status(200).json({ msg: `location data are....`, data: locationData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `location data not found`, err });
  }
}

const getLocationById = async (req, res) => {
  const { id } = req.query;
  try {
    const locationData = await db.sequelize.query(
      `
      select g.id ,g.userId ,g.ip ,g.city ,g.region ,g.region_code ,g.region_type ,g.country_name ,
      g.country_code,g.latitude,g.longitude,g.postal,g.calling_code,g.flag,g.emoji_flag,g.route 
      from geolocations g 
      where g.isDelete=false and g.id =${id}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `Location data by id are....`, data: locationData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Location data not found by id...`, err });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      userId: rest.userId,
      ip: rest.ip,
      city: rest.city,
      region: rest.region,
      region_code: rest.region_code,
      region_type: rest.region_type,
      country_name: rest.country_name,
      country_code: rest.country_code,
      latitude: rest.latitude,
      longitude: rest.longitude,
      postal: rest.postal,
      calling_code: rest.calling_code,
      flag: rest.flag,
      emoji_flag: rest.emoji_flag,
      route: rest.route,
    };
    const updateData = await geolocation.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `Location data are updated ....`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Location data not updated ....`, err });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.query;
  try {
    const deleteData = await geolocation.destroy({
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `Location data are deleted....`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Location data are not deleted...`, err });
  }
};

const getDistance = async (req, res) => {
  const { ...rest } = req.body;
  var point1 = { lat: rest.lat1, lng: rest.lng1 };

  //Second point in your haversine calculation
  var point2 = { lat: rest.lat2, lng: rest.lng2 };

  var haversine_m = haversine(point1, point2); //Results in meters (default)
  var haversine_km = haversine_m / 1000; //Results in kilometers
  res.status(200).json({
    msg_m: "distance (in meters): ",
    m: haversine_m,
    msg_km: "distance (in kilometers):",
    km: haversine_km,
  });
};

const distance = async (req, res) => {
  const { lat1, lon1, lat2, lon2, unit } = req.body;
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    console.log(dist);
  }
};

const getDistanceFromLatLonInKm = async (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.body;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log(d);
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const fetchLocationName = async (req, res) => {
  const { ...rest } = req.query;
  const url = "https://api.ipdata.co/?api-key=" + Config.api_key;
  try {
    const response = await axios.get(url);
    console.log("currency Symbol", response.data);
   
const currency={
  Symbol:response.data.currency.symbol,
  native:response.data.currency.native,
  code:response.data.currency.code
}
console.log('currency',currency);
    const result = {
      userId: rest.userId,
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      region_code: response.data.region_code,
      region_type: response.data.region_type,
      country_name: response.data.country_name,
      country_code: response.data.country_code,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      postal: response.data.postal,
      calling_code: response.data.calling_code,
      flag: response.data.flag,
      emoji_flag: response.data.emoji_flag,
      route: response.data.asn.route,
    };
    const insertData = await geolocation.create(result);
    res.status(200).send({ msg: `user data are...`, data: insertData });
  } catch (error) {
    console.error(error);
  }
};

const getLocationBylatlon = async (req, res) => {
  const apiKey = 'YOUR_API_KEY';
const placeName = 'New York City'; // The place name you want to geocode

axios
  .get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: placeName,
      key: Config.api_key,
    },
  })
  .then((response) => {
    const { results } = response.data;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      console.log('Latitude:', lat);
      console.log('Longitude:', lng);
    } else {
      console.log('No results found for the given place name.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
};





module.exports = {
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
};
