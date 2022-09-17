const fs = require("fs");
module.exports.TotalAmendes = (prénom, nom, callback) => {
  fs.readdir("./casiers", (err, files) => {
    if (err) throw err;
    if (files.includes(`${nom}_${prénom}.json`)) {
      var Total = 0;
      fs.readFile(`./casiers/${nom}_${prénom}.json`, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);

        obj.forEach((element) => {
          Total += element.amende;
        });

        callback(Total);
      });
    } else {
      callback("ErreurCasier");
    }
  });
};
module.exports.TotalAmendesImpayé = (prénom, nom, callback) => {
  fs.readdir("./casiers", (err, files) => {
    if (err) throw err;
    if (files.includes(`${nom}_${prénom}.json`)) {
      var Total = 0;
      fs.readFile(`./casiers/${nom}_${prénom}.json`, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);

        obj.forEach((element) => {
          Total += element.resteAPayer;
        });

        callback(Total);
      });
    } else {
      callback("ErreurCasier");
    }
  });
};
