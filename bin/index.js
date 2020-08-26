#!/usr/bin/env node
const sapui5TB = require("./sapui5TB"),
  chalkPipe = require("chalk-pipe");

sapui5TB.envLoad().then(function (result) {
  sapui5TB.applicationLoad().then(function (result) {
    sapui5TB.compile(result).then(function (result) {
      sapui5TB.build(result).then(function (result) {
        console.log(chalkPipe("greenBright.bold")("******************************************************"));
        console.log(chalkPipe("greenBright.bold")("       [Tempate has beed Successfully Build]          "));
      });
    });
  });
});
