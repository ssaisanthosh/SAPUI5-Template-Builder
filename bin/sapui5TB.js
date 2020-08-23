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
      return fs.existsSync(value) ? "Project Name Exist already" : value.toString().trim().length > 0 ? true : "Please enter a Project Name";
    },
  },
  nameSpace: {
    type: "input",
    name: "Namespace",
    message: "📘  Project Namespace: ",
    validate: function (value) {
      return value.toString().trim().length > 0 ? true : "Please enter a Project Namespace";
    },
  },
  viewType: {
    type: "list",
    name: "Type",
    message: "📖  Select View Type: ",
    choices: ["XML", "JSON", "JS", "HTML"],
  },
  viewName: {
    type: "input",
    name: "ViewName",
    message: "📒  View Name: ",
    validate: function (value) {
      return value.toString().trim().length > 0 ? true : "Please enter a View Name";
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
  //  console.log(result);
  return new Promise(function (resolve, reject) {
    console.log(result);
    if (result.confirm) {
      if (!fs.existsSync(result.ProjectName)) {
        fs.mkdirSync(result.ProjectName);
        console.log(chalkPipe("greenBright.bold")("[CREATED]") + " Project Folder Created.");
      }
    }
    builder.ui5_yaml(result.ProjectName);
    // inquirer.prompt(oForm).then((result) => {
    //   oCollection = { ...oCollection, ...result };
    resolve(false);
    // });
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
