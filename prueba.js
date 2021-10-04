#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const route = __dirname;

// Recursive function
const directory = (route) => { // 
  console.log('in: '+ route);
  let arrFiles = [];

  data = fs.readdirSync(route, {withFileTypes: true}); // read directories synchronously 
  // console.log('data: ' + data);
  data.forEach(item => {
    // console.log('item: ', item)
    if (item.name === 'node_modules') {
      return;
    }
    if (item.isDirectory()) {
      // console.log('isDir: ' + route + '/'+item.name);
      arrFiles = arrFiles.concat(directory(route + '/'+item.name));
    } else if (path.extname(item.name) === '.md') {
      console.log('isFile: '+ item.name);
      arrFiles.push(item.name);
    }
  })
  
  console.log('out: '+ arrFiles);
  return arrFiles;
};

console.log(directory(route));
//CLI
/*
const inquirer = require('inquirer');
inquirer.prompt([{
  type: 'fuzzypath',
  name: 'path',
  itemType: 'any',
  message: 'copy the path of the file or directory that you want to analyze',
  suggestOnly: true,
  default: 'README.md',
    
}])*/

// read file
/*
const join = path.join(ruta, 'README.md');
fs.readFile(join, 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
*/   
