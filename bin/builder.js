"use strict";
const fs = require("fs");
exports.ui5_yaml = function (folder) {
  let oData = "specVersion: '1.0'" + 
  metadata:" + 
    name: Project" + 
  type: application" + 
  resources:" + 
    configuration:" + 
      propertiesFileSourceEncoding: UTF-8" + 
  builder:" + 
    customTasks:" + 
      - name: webide-extension-task-updateManifestJson" + 
        beforeTask: generateManifestBundle" + 
        configuration:" + 
          appFolder: webapp" + 
          destDir: dist" + 
      - name: webide-extension-task-updateNeoApp" + 
        afterTask: generateVersionInfo" + 
        configuration:" + 
          destDir: dist" + 
          appFolder: webapp" + 
          nameSpace: Namespace" + 
      - name: webide-extension-task-lint" + 
        afterTask: webide-extension-task-updateNeoApp" + 
        configuration:" + 
          destDir: dist" + 
          appFolder: webapp" + 
          nameSpace: Namespace" + 
      - name: webide-extension-task-resources" + 
        afterTask: webide-extension-task-lint" + 
        configuration:" + 
          nameSpace: Namespace";

  fs.writeFile(folder + "/ui5.yaml", oData, function (err) {
    if (err) return console.log(err);
    // console.log("Hello World > helloworld.txt");
  });
};
