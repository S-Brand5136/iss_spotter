const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  return fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    return fetchISSFlyOverTimes(coords, (error, response) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      console.log(response);
    });
  });
});
