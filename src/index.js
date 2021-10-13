#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const directories = require('./prueba');
const file = require('./file');
const links = require('./links');

let args = process.argv[2];

// console.log('args: ',args);


const mdLinks = (path, options) => {
  
  
  
  
}

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
    
    const join = path.join(process.cwd(), answers.path);
    const resultLinks = file.open(join);

    for (let i = 0; i<resultLinks.length; i++) {
    
      if (links.validate(resultLinks[i])) {
        console.log(resultLinks)
      }
    
    }
     
  })
  .catch(error => {
    console.log(error);
  });

module.exports.mdLinks = mdLinks;
