#!/usr/bin/env node
const find = require('./find');
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
  if(this.status === '') {
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
  console.log('mdLinks' );
  return new Promise((resolve, rejected) => {
    
    let files = [];
    let arrLinks = [];
    let singlefile = false;
    if (path.substr(path.length - 1, path.length) != '/') {
      files.push(path);
      singlefile= true;
    } else {
      try {
        files = find.directory(path);
        console.log('files: ', files);
      }catch(error){
        rejected(process.stderr.write('invalid directory\n'));
        return
      }
    }
    let resultPairs = [];
    for (const i in files){
      let fileToOpen = files[i];
      if (!singlefile){
        fileToOpen = path+files[i];
      }
      
      try {
        console.log('open', fileToOpen);
        resultPairs = resultPairs.concat(file.open(fileToOpen));
        // console.log('concat ', resultPairs);
      }catch(error){
        // console.log(error);
      }
      
      if (resultPairs === null) {
        continue
      }
    }
    
    switch(true) {
      
    case options.validate && options.stats :
      for (let i = 0; i<resultPairs.length; i++) {
        let obj = links.validate(resultPairs[i].link);
        let objRes = new objValidate(obj.href,resultPairs[i].text,obj.status,resultPairs[i].file);
        arrLinks.push(objRes);
      }
      let objStatsBroken = stats.countWithBroken(arrLinks);
      resolve(objStatsBroken);
      break
    case options.validate:
      // console.log('entro validate');
      for (let i = 0; i<resultPairs.length; i++) {
        let obj = links.validate(resultPairs[i].link);
        // console.log('obj' , obj)
        let objRes = new objValidate(obj.href,resultPairs[i].text,obj.status,resultPairs[i].file);
        // console.log('validate', objRes);
        arrLinks.push(objRes);
      }
      resolve(new arrObjValidate(arrLinks));
      break
    case options.stats:
      let statsLink = stats.count(resultPairs);
      resolve(statsLink);
      break
    default:
    // console.log('resultPairs', resultPairs)
      for (let i = 0; i<resultPairs.length; i++) {
        let objDef = new objValidate(resultPairs[i].link,resultPairs[i].text,'',resultPairs[i].file)
        arrLinks.push(objDef);
        // console.log('arrLinks ', arrLinks);
        // process.stdout.write("href: "+resultPairs[i].link.slice(0, -1) + " file: " + fileToOpen + '\n');
        // console.log(resultLinks[i].slice(0, -1));
      } 
      resolve(new arrObjValidate(arrLinks));
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
module.exports.arrObjValidate = arrObjValidate;
module.exports.objValidate = objValidate;
