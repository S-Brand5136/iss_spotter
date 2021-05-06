const { fetchMyIP, fetchCoordsByIP } = require("./iss");

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

    console.log(`It did work!`, coords);
  });
});
