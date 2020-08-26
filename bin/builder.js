"use strict";
const fs = require("fs");
// replaceString = require("string-replace-async");
exports.file = function (source, file, project, namespace, viewname) {
  fs.readFile("./template/" + source + ".tbs", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var sData = data.replace(/<<#Project#>>/g, project);
    sData = sData.replace(/<<#Namespace#>>/g, namespace);
    sData = sData.replace(/<<#ViewName#>>/g, viewname);
    sData = sData.replace(/<<#NamespaceDefine#>>/g, namespace.replace(/[.]/g, "/"));
    fs.writeFile(project + "/" + file , sData, function (err) {
      if (err) return console.log(err);
    });
  });
};
