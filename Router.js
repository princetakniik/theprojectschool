module.exports = (app) => {
    require("./src/api-route/RegisterRoute")(app);
    require('./src/api-route/LoginUserRouter')(app)
  };
  