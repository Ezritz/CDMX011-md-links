#!/usr/bin/env node
const directories = require('./prueba');
const file = require('./file');
const links = require('./links');

const mdLinks = (path, options = {validate: false, stats: false}) => {
  let files = [];
  let singlefile = false;
  if (path.substr(path.length - 1, path.length) != '/') {
    files.push(path);
    singlefile= true;
  } else {
    try {
    files = directories.directory(path);
    }catch(error){
      process.stderr.write('invalid directory\n');
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
      process.stderr.write('file doesn\'t exist\n');
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
        process.stdout.write(links.validate(resultLinks[i]).toString() + ' file: ' + fileToOpen+'\n');
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

mdLinks(path, options);


// console.log('args: ',args);

module.exports.mdLinks = mdLinks;
