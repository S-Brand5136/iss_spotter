const { nextISSTimesForMyLocation } = require("./iss");
const { printPass } = require("./iss_promised");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  return printPass(passTimes);
});
