const path = require("path");

function getAnomalyReport(csv1, csv2, algo, callback) {

  // create addon, and run it to get anomaly reprot in ar.csv
  var addon = require("bindings")("addon");
  addon(csv1, csv2, algo);

  // read data from ar.csv
  const fs = require("fs");
  fs.readFile(path.join(__dirname, "ar.csv"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {

      //split ar.csv data to row
      var anomalyArray = data.split("\r\n");
      n = anomalyArray.length;

      var json = {};
      var jsonData = {};

      // create array for every chunk
      for (var i = 0; i < n; i++) {
        var currLine = anomalyArray[i].split(",");
        jsonData[currLine[0]] = [];
      }

      // add anomalies to arrays
      for (var i = 0; i < n; i++) {
        var currLine = anomalyArray[i].split(",");
        if (currLine[1] === currLine[2]) {
          jsonData[currLine[0]].push(currLine[1]);
        } else {
          jsonData[currLine[0]].push(currLine[1] + "-" + currLine[2]);
        }
      }
      if (anomalyArray[0] === "") {
        json["anomalies"] = "none";
      } else {
        json["anomalies"] = jsonData;
      }

      //delete at.csv from computer.
      try {
        fs.unlinkSync(path.join(__dirname, "ar.csv"), null);
      } catch (error) {
        console.log("error");
      }

      callback(json);
    }
  });
}

exports.getAnomalyReport = getAnomalyReport;
