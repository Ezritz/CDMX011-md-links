const fs = require('fs');

const open = (route) => {
  const regex = /\[([^\]]+)]\(((?:https)|(?!https))((?::\/\/)|(?!:\/\/))(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/g;
  // const regexText = /\[([^\]]+)]/g;
  // const regexLink = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  let data = fs.readFileSync(route, 'utf-8')
  let matches = data.match(regex);
  // resultLinks = data.match(regexLink)
  let arrNewLinks = [];
  for(let i = 0; i<matches.length; i++) {
    console.log('matches', matches[i]);
    let splt = matches[i].split('](');
    let text = splt[0].slice(1,);
    let link = splt[1].slice(0,-1);
    arrNewLinks.push({
      text: text,
      link: link,
    });
  }

  console.log('arr', arrNewLinks);
  return arrNewLinks;
}

module.exports.open = open;

