#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const directories = require('./prueba');
let options = {validate:false, validate:true};

const mdLinks = (path, options) => {
  
  
  
}

const inquirer = require('inquirer');
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
    const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    // const regex = /\[[\s\S]*?\]\([\s\S]*?\)/g;
    // const regex = /((\w+:\/\/\S+)|(\w+[\.:]\w+\S+))[^\s,\.]/ig
    // const regex = /((\w+:\/\/\w.*)|(\w+[\.:]\w+\S..))[^\s,\.]/ig;
    // const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const join = path.join(route, answers.path)
    fs.readFile(join, 'utf-8', (error, data) => {
      let resultLinks = data.match(regex);
      if (error) {
        console.log(error);
      } 
      if (regex.test(data)) {
        console.log(resultLinks);
        for (let i = 0; i< resultLinks.length; i++) {
          
        }
      }
    });
  })
  .catch(error => {
    console.log(error);
  })
module.exports = mdLinks;