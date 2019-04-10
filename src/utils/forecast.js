const request = require("request");

forecast = (long, lat, callback) => {
  if (isNaN(long) || isNaN(lat)) {
    callback("Invalid arguments", undefined);
    return;
  }
  var url =
    "https://api.darksky.net/forecast/e5aa06a962d511b4e439120d2f08f80b/" +
    long +
    "," +
    lat +
    "?units=si";
  request(
    {
      url,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Cannot connect to the internet", undefined);
      } else if (body.currently == null) {
        callback("Unable to get temperature", undefined);
      } else {
        //callback(undefined,`The current tepereture is ${body.currently.temperature} according to ${body.timezone} timezone`);
        callback(
          undefined,
          `${body.daily.data[0].summary} \nThe high today is ${
            body.daily.data[0].temperatureMax
          } and the low is ${
            body.daily.data[0].temperatureMax
          }.\nThe current tepereture is ${
            body.currently.temperature
          } according to ${body.timezone} timezone`
        );
      }
    }
  );
};
module.exports = forecast;
