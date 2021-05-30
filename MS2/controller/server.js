// Libraries
const express = require("express");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
const model = require("../model/addon");
const fs = require("fs");

// Useful server variables
const port_num = 8080;

app.use(express.static(path.join(__dirname, "..", "view"))); // the server main window
app.use(express.json()); // be able to parse json
app.use(express.urlencoded({ extended: false })); // be able to parse url
app.use(fileUpload()); // to upload files

// run the server...
app.listen(port_num, (err) => {
  if (err) {
    console.log("error");
    return -1;
  }
  console.log("Listening on port " + port_num + "...");
});

// recieve post request
app.post("/detect", (req, res) => {
  var ans = "running detect algorithm...";
  console.log(ans);

  // save train file
  let targetFile1 = req.files.filename1;
  targetFile1.mv(
    path.join(__dirname, "..", "model", "uploads", "train.csv"),
    (err) => {
      if (err) {
        res.status(500).send(err);
        res.end();
      } else {
        // save test file
        let targetFile2 = req.files.filename2;
        targetFile2.mv(
          path.join(__dirname, "..", "model", "uploads", "test.csv"),
          (err) => {
            if (err) {
              res.status(500).send(err);
              res.end();
            } else {
              // set arguments for the model
              var csv1 =
                "../model/uploads/train.csv"; /** put in here the name of the regular csv */
              var csv2 =
                "../model/uploads/test.csv"; /** put in here the name of the csv to detect */
              var algo = req.body.algorithm; /** algo name to run */

              // call model
              model.getAnomalyReport(csv1, csv2, algo, (json) => {
                res.send(json);
                res.end();
              });
            }
          }
        );
      }
    }
  );
});
