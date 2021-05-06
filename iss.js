const request = require("request");

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    return fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      return fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }

        return callback(null, times);
      });
    });
  });
};

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
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function ({ latitude, longitude }, callback) {
  request(
    `http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }

      if (response.statusCode !== 200) {
        const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
        callback(Error(msg), null);
        return;
      }

      const res = JSON.parse(body).response;
      return callback(null, res);
    }
  );
};

module.exports = { nextISSTimesForMyLocation };
