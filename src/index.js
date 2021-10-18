#!/usr/bin/env node
const directories = require('./prueba');
const file = require('./file');
const links = require('./links');

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
      let resultLinks;
      try {
        resultLinks = file.open(fileToOpen);
      }catch(error){
        rejected(process.stderr.write('file doesn\'t exist\n'));
        return
      }
      
      if (resultLinks === null) {
        continue
      }

      switch(true) {
      case options.validate && options.stats :
        break
      case options.validate:
        for (let i = 0; i<resultLinks.length; i++) {
          let obj = links.validate(resultLinks[i]);
          let objRes = {
            href: obj.href,
            text: obj.statusText,
            status: obj.status,
            file: fileToOpen,
          }
          arrLinks.push(objRes)
        }
        break
      case options.stats:
        break
      default:
        for (let i = 0; i<resultLinks.length; i++) {
          process.stdout.write("href: "+resultLinks[i].slice(0, -1) + " file: " + fileToOpen + '\n');
          // console.log(resultLinks[i].slice(0, -1));
        } 
      }
    }
    resolve(arrLinks);
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
console.log(mdLinks(path, options));


// console.log('args: ',args);

module.exports.mdLinks = mdLinks;
