const { nextISSTimesForMyLocation, printPass } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    return printPass(passTimes);
  })
  .catch((error) => {
    console.log(`It didnt work!: `, error.message);
  });
