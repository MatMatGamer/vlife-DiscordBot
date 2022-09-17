const fs = require("fs");
module.exports.run = async (
  nom,
  prénom,
  delitsR = null,
  armes = null,
  meurtres = null,
  braquages = null,
  po = null,
  droguePrinter = null,
  divers = null,
  amende = 0,
  resteAPayer = 0
) => {
  fs.readdir("./casiers", (err, files) => {
    if (err) throw err;
    if (files.includes(`${nom}_${prénom}.json`)) {
      fs.readFile(`./casiers/${nom}_${prénom}.json`, (err, data) => {
        var obj = JSON.parse(data);
        var newObj = {};
        if (delitsR != null) {
          newObj.delitsR = delitsR;
        }
        if (armes != null) {
          newObj.armes = armes;
        }
        if (meurtres != null) {
          newObj.meurtres = meurtres;
        }
        if (braquages != null) {
          newObj.braquages = braquages;
        }
        if (po != null) {
          newObj.po = po;
        }
        if (droguePrinter != null) {
          newObj.droguePrinter = droguePrinter;
        }
        if (divers != null) {
          newObj.divers = divers;
        }
        newObj.amende = amende;
        newObj.resteAPayer = resteAPayer;
        newObj.date = new Date().toUTCString();
        obj.push(newObj);
        fs.writeFile(
          `./casiers/${nom}_${prénom}.json`,
          JSON.stringify(obj, null, 2),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    } else {
      fs.writeFile(
        `./casiers/${nom}_${prénom}.json`,
        JSON.stringify([
          {
            delitsR: delitsR ? delitsR : null,
            armes: armes ? armes : null,
            meurtres: meurtres ? meurtres : null,
            braquages: braquages ? braquages : null,
            po: po ? po : null,
            droguePrinter: droguePrinter ? droguePrinter : null,
            divers: divers ? divers : null,
            amende: amende,
            resteAPayer: resteAPayer,
            date: new Date().toUTCString(),
          },
        ]),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
};
