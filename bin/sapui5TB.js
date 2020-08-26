"use strict";
const inquirer = require("inquirer"),
  fs = require("fs"),
  builder = require("./builder"),
  chalkPipe = require("chalk-pipe");
const template = {
  SAPUI5Application: "SAPUI5 Application",
};

const form = {
  env: {
    type: "list",
    name: "Env",
    message: "📖  Select Project Environment: ",
    choices: ["Neo"],
  },
  project: {
    type: "input",
    name: "ProjectName",
    message: "📘  Project Name: ",
    validate: function (value) {
      return fs.existsSync(value) ? "Project Name Exist already" : value.toString().trim().length > 0 ? new RegExp("^[A-Za-z0-9-.]+$").test(value) ? true : "Please enter Project Name without space and symbols"  : "Please enter a Project Name";
    },
  },
  nameSpace: {
    type: "input",
    name: "Namespace",
    message: "📘  Project Namespace: ",
    validate: function (value) {
      return value.toString().trim().length > 0 ? new RegExp("^[A-Za-z0-9-.]+$").test(value) ? true : "Please enter Project Namspace without space and symbols" : "Please enter a Project Namespace";
    },
  },
  viewType: {
    type: "list",
    name: "Type",
    message: "📖  Select View Type: ",
    choices: ["XML"],
  },
  viewName: {
    type: "input",
    name: "ViewName",
    message: "📒  View Name: ",
    validate: function (value) {
      return value.toString().trim().length > 0 ? new RegExp("^[A-Za-z0-9-.]+$").test(value) ? true : "Please enter View Name without space and symbols"  : "Please enter a View Name";
    },
  },
  app: {
    type: "list",
    name: "Template",
    message: "📚  Select your Application Template: ",
    choices: [template.SAPUI5Application],
  },
  confirm: {
    type: "confirm",
    name: "confirm",
    message: "👍  New Project will create in you current folder: ",
  },
};
let oCollection = {};

/**
 * Application Load
 * @Promise_Return
 */
exports.applicationLoad = function () {
  const oForm = [form.app];
  return new Promise(function (resolve, reject) {
    inquirer.prompt(oForm).then((result) => {
      oCollection = { ...oCollection, ...result };
      resolve(result.Template);
    });
  });
};

/**
 * Application Load
 * @Promise_Return
 */
exports.envLoad = function () {
  const oForm = [form.env];
  return new Promise(function (resolve, reject) {
    inquirer.prompt(oForm).then((result) => {
      oCollection = { ...oCollection, ...result };
      resolve(result);
    });
  });
};

/**
 * Complier for Template build
 * This work based on Template properties this.template
 * @param {*} val - templates
 */
exports.compile = function (val) {
  switch (val) {
    case template.SAPUI5Application:
      return new Promise(function (resolve, reject) {
        resolve(compile_SAPUI5Application());
      });
      break;
    default:
      break;
  }
};

/**
 * Build
 * @Promise_Return
 */
exports.build = function (result) {
  return new Promise(function (resolve, reject) {
    if (result.confirm) {
      if (!fs.existsSync(result.ProjectName)) {
        fs.mkdirSync(result.ProjectName);        
        console.log(chalkPipe("greenBright.bold")("[CREATED][01/14]") + "  Master Folder Created.");
      }
    }

    fs.mkdirSync(result.ProjectName + "/view");    
    console.log(chalkPipe("greenBright.bold")("[CREATED][02/14]") + "  View Folder Created.");
    builder.file("view_xml",  "view/" + result.ViewName + ".view.xml", result.ProjectName, result.Namespace, result.ViewName);    
    console.log(chalkPipe("greenBright.bold")("[CREATED][03/14]") + "  View File Created.");
    
    fs.mkdirSync(result.ProjectName + "/model");
    console.log(chalkPipe("greenBright.bold")("[CREATED][04/14]") + "  Model Folder Created.");
    builder.file("models_js",  "model/models.js", result.ProjectName, result.Namespace, result.ViewName);   
    console.log(chalkPipe("greenBright.bold")("[CREATED][05/14]") + "  Model File Created.");
    
    fs.mkdirSync(result.ProjectName + "/i18n"); 
    console.log(chalkPipe("greenBright.bold")("[CREATED][06/14]") + "  i18n Folder Created.");
    builder.file("i18n_properties",  "i18n/i18n.properties", result.ProjectName, result.Namespace, result.ViewName);   
    console.log(chalkPipe("greenBright.bold")("[CREATED][07/14]") + "  i18n File Created.");
    
    fs.mkdirSync(result.ProjectName + "/css");
    console.log(chalkPipe("greenBright.bold")("[CREATED][08/14]") + "  css Folder Created.");
    builder.file("style_css",  "css/style.css", result.ProjectName, result.Namespace, result.ViewName);   
    console.log(chalkPipe("greenBright.bold")("[CREATED][09/14]") + "  css File Created.");
    
    fs.mkdirSync(result.ProjectName + "/controller");
    console.log(chalkPipe("greenBright.bold")("[CREATED][10/14]") + "  Controller Folder Created.");
    builder.file("controllder_js",  "controller/" +  result.ViewName + ".controller.js", result.ProjectName, result.Namespace, result.ViewName);     
    console.log(chalkPipe("greenBright.bold")("[CREATED][11/14]") + "  Controller File Created."); 

    builder.file("manifest_json", "manifest.json", result.ProjectName, result.Namespace, result.ViewName);
    console.log(chalkPipe("greenBright.bold")("[CREATED][12/14]") + "  Manifest File Created.");
    builder.file("index_html", "index.html", result.ProjectName, result.Namespace, result.ViewName);
    console.log(chalkPipe("greenBright.bold")("[CREATED][13/14]") + "  Index File Created.");
    builder.file("component_js", "component.js", result.ProjectName, result.Namespace, result.ViewName);
    console.log(chalkPipe("greenBright.bold")("[CREATED][14/14]") + "  Component File Created.");
    resolve(true);    
  });
};

function compile_SAPUI5Application() {
  const oForm = [form.project, form.nameSpace, form.viewType, form.viewName, form.confirm];
  return new Promise(function (resolve, reject) {
    inquirer.prompt(oForm).then((result) => {
      oCollection = { ...oCollection, ...result };
      resolve(oCollection);
    });
  });
}
