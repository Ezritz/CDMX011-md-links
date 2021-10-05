#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const route = __dirname;
const chalk = require('chalk');

// Recursive function
const directory = (route, subdir = '') => { // 
  console.log('in: '+ route);
  let arrFiles = [];

  data = fs.readdirSync(route + '/' + subdir, {withFileTypes: true}); // read directories synchronously 
  // console.log('data: ' + data);
  data.forEach(item => {
    // console.log('item: ', item)
    if (item.name === 'node_modules') {
      return;
    }
    if (item.isDirectory()) {
      // console.log('isDir: ' + route + '/'+item.name);
      arrFiles = arrFiles.concat(directory(route, subdir + '/' + item.name));
    } else if (path.extname(item.name) === '.md') {
      console.log(chalk.yellow('isFile: ')+ chalk.green(item.name));
      arrFiles.push(subdir + '/' + item.name);
      // console.log(item.name);
    }
  })
  
  // console.log('out: '+ arrFiles);
  return arrFiles;
};

console.log(directory(route));

//CLI

const inquirer = require('inquirer');
inquirer.prompt([{
  type: 'list',
  name: 'path',
  itemType: 'any',
  message: 'Select a File to analyze links',
  suggestOnly: true,
  default: 'README.md',
  choices: directory(route),
}])
  .then(answers => {
    console.log('File: ' + answers.path);

    // read file
    const regex = /((\w+:\/\/\S+)|(\w+[\.:]\w+\S+))[^\s,\.]/ig;
    const join = path.join(route, answers.path)
    fs.readFile(join, 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
      } else if (regex.test(data)) {
        console.log('content:\n' + data);
      }
    });
  })
  .catch(error => {
    console.log(error);
  })



   
