const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (item of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(item.risetime);
    const msg = `Next pass at ${date} for ${item.duration} seconds!`;
    console.log(msg);
  }
});
