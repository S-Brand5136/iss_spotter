const request = require("request-promise-native");

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIp = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`
  );
};

const printPass = (array) => {
  for (item of array) {
    const date = new Date(0);
    date.setUTCSeconds(item.risetime);
    const msg = `Next pass at ${date} for ${item.duration} seconds!`;
    console.log(msg);
  }
};

module.exports = { nextISSTimesForMyLocation, printPass };
