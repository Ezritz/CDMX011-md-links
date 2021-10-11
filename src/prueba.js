const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

// Recursive function
const directory = (route, subdir = '') => { // 
  // console.log('in: '+ route);
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
      arrFiles = arrFiles.concat(directory(route, subdir + '/' + item.name));;
    } else if (path.extname(item.name) === '.md') {
      // console.log(chalk.yellow('isFile: ')+ chalk.green(item.name));
      arrFiles.push(subdir + '/' + item.name);
      // console.log(item.name);
    }
  })
  
  // console.log('Result: '+ chalk.inverse(arrFiles));
  return arrFiles;
};

// console.log(directory(route));

module.exports.directory = directory;
