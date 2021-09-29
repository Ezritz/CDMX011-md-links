#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ruta = __dirname;


fs.readdir(ruta, (error, data) => {
  if (error) {
    console.log(error);
  }
  const files = data;

  files.forEach(item => {
    fs.lstat(item, (err, stats) => {
      if (err) {
        console.log(err);
      } else if (stats.isDirectory()) {
        console.log('Directory: ' + item);
      } else {
        console.log('File: ' + item);
      }
    });
  })
  
});

const inquirer = require('inquirer');
inquirer.prompt([{
  type: 'fuzzypath',
  name: 'path',
  itemType: 'any',
  message: 'copy the path of the file or directory that you want to analyze',
  suggestOnly: true,
  default: 'README.md',
    
}])
  .then(answers => {
    console.log('Answer: ', answers)
    const join = path.join(ruta, answers.path)
    fs.readFile(join, 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
  })
  .catch (error => {
    console.log(error)
  })
