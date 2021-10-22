#!/usr/bin/env node
const directories = require('./prueba');
const file = require('./file');
const links = require('./links');
const stats = require('./stats');
const chalk = require('chalk');

function objValidate(href, text, status, file) {
  this.href = href;
  this.text = text;
  this.status = status;
  this.file = file;
}
objValidate.prototype.toString = function toString() {
  if(this.ok === undefined && this.status === undefined) {
    return this.file + ' '+chalk.cyan(this.href) + ' ' + chalk.green(this.text) + '\n';
  } else if(this.status >= 400){
    return this.file + ' '+chalk.cyan(this.href)+ ' ' + 'fail ' + chalk.red(this.status) + ' ' + chalk.green(this.text) + '\n';
  } else {
    return this.file+ ' ' +chalk.cyan(this.href)+ ' '  + 'ok ' + chalk.yellow(this.status) + ' ' + chalk.green(this.text)+ '\n';
  }
}

function arrObjValidate(array) {
  this.array = array;
}
arrObjValidate.prototype.toString = function toString() {
  let str = '';
  for(let i = 0; i< this.array.length; i++) {
    str += this.array[i].toString();
  }
  return str;
}
const mdLinks = (path, options = {validate: false, stats: false}) => {
  return new Promise((resolve, rejected) => {
    
    let files = [];
    let arrLinks = [];
    let singlefile = false;
    if (path.substr(path.length - 1, path.length) != '/') {
      files.push(path);
      singlefile= true;
    } else {
      try {
        files = directories.directory(path);
        console.log('files: ', files);
      }catch(error){
        rejected(process.stderr.write('invalid directory\n'));
        return
      }
    }
    for (const i in files){
      let fileToOpen = files[i];
      if (!singlefile){
        fileToOpen = path+files[i];
      }
      let resultPairs;
      try {
        console.log('open', fileToOpen);
        resultPairs = file.open(fileToOpen);
      }catch(error){
        rejected(process.stderr.write('file doesn\'t exist\n'));
        return
      }
      
      if (resultPairs === null) {
        continue
      }

      switch(true) {
      case options.validate && options.stats :
        for (let i = 0; i<resultPairs.length; i++) {
          let obj = links.validate(resultPairs[i].link);
          let objRes = new objValidate(obj.href,resultPairs[i].text,obj.status,fileToOpen);
          arrLinks.push(objRes);
        }
        let objStatsBroken = stats.countWithBroken(arrLinks);
        resolve(objStatsBroken);
        break
      case options.validate:
        for (let i = 0; i<resultPairs.length; i++) {
          let obj = links.validate(resultPairs[i].link);
          let objRes = new objValidate(obj.href,resultPairs[i].text,obj.status,fileToOpen);
            
          arrLinks.push(objRes);
        }
        resolve(new arrObjValidate(arrLinks));
        break
      case options.stats:
        let statsLink = stats.count(resultPairs);
        resolve(statsLink);
        break
      default:
        for (let i = 0; i<resultPairs.length; i++) {
          let objDef = {
            href: resultPairs[i].link,
            text: resultPairs[i].text,
            file: fileToOpen,
          }
          arrLinks.push(objDef);
          // process.stdout.write("href: "+resultPairs[i].link.slice(0, -1) + " file: " + fileToOpen + '\n');
          // console.log(resultLinks[i].slice(0, -1));
        } 
        resolve(arrLinks);
      }
    }
    
  })
  
}

let path = process.cwd();
let options = {
  validate: false,
  stats: false,
}
for (let i=2; i < process.argv.length; i++){
  switch (process.argv[i]) {
  case '--validate':
    options.validate = true;
    break;
  case '--stats':
    options.stats = true;
    break;
  default:
    path = process.argv[i];
  }
}
mdLinks(path, options)
  .then((response) => {
    console.log(response.toString());
  })
  .catch((error) => {
    console.log('Use a route <path-to-file> [options]'), error;
  })


// console.log('args: ',args);

module.exports.mdLinks = mdLinks;
