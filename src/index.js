#!/usr/bin/env node

const inquirer = require('inquirer');
const nPath = require('path');
const directories = require('./prueba');
const file = require('./file');
const links = require('./links');

const mdLinks = (path, options = {validate: false, stats: false}) => {
  inquirer.prompt([{
    type: 'list',
    name: 'path',
    itemType: 'any',
    message: 'Select a File to analyze links',
    suggestOnly: true,
    default: 'README.md',
    choices: directories.directory(process.cwd()),
  }])
    .then(answers => {
      console.log('File: ' + answers.path);
  
      // read file
      
      // const regex = /\[[\s\S]*?\]\([\s\S]*?\)/g;
      // const regex = /((\w+:\/\/\S+)|(\w+[\.:]\w+\S+))[^\s,\.]/ig
      // const regex = /((\w+:\/\/\w.*)|(\w+[\.:]\w+\S..))[^\s,\.]/ig;
      // const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      
      const join = nPath.join(path, answers.path);
      const resultLinks = file.open(join);
      
      switch(true) {
      case options.validate && options.stats :
        break
      case options.validate:
        for (let i = 0; i<resultLinks.length; i++) {
          if (links.validate(resultLinks[i])) {
            console.log(resultLinks);
          }
        } 
        break
      case options.stats:
        break
      default:
        for (let i = 0; i<resultLinks.length; i++) {
          console.log(resultLinks[i].slice(0, -1));
        } 
      }
    })
    .catch(error => {
      console.log(error);
    });
  
}

let options = {
  validate: false,
  stats: false,
}
for (let i=2; i < process.argv.length; i++){
  switch (process.argv[i]) {
  case '--validate':
    console.log("entro validate")
    options.validate = true;
    break;
  case '--stats':
    options.stats = true;
    break;
  }
}


console.log(options);
mdLinks(process.cwd(), options);

// console.log('args: ',args);

module.exports.mdLinks = mdLinks;
