const request = require("request");

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }

    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
