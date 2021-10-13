const fs = require('fs');
const mdLinks = require('./index');

let option = {validate:false};

const open = (route) => {
  // console.log('route: ',route);
  const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  if (option === '--validate') {
    
  }
  let data = fs.readFileSync(route, 'utf-8') 
  let resultLinks = data.match(regex);
    
  // console.log('open: ', resultLinks);
  return resultLinks;
}

module.exports.open = open;

