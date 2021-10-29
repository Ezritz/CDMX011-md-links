const chalk = require('chalk');

const count = (pairs) => {
  let totLinks = [];
  let brokenLinks = [];
  let uniqueLinks = [];
  let arrStats = [];
  
  
  uniqueLinks = pairs.map((item) => {
    return item.link;
  })
  
  // console.log('unique', uniqueLinks.length);
  // console.log('arrStats: ', arrStats)
  let objStats;
  objStats = new statsLinks(pairs.length, uniqueLinks.length);
  return objStats;
  
}
function statsLinks(total, unique, broken) {
  this.total = total;
  this.unique = unique;
  this.broken = broken;
}
statsLinks.prototype.toString = function toString() {
  if(this.broken === undefined) {
    return '\n'+'Total: ' + chalk.yellow(this.total) + '\n' + 'Unique: ' + chalk.yellow(this.unique)+ '\n';
  } else {
    return '\n'+'Total: ' + chalk.yellow(this.total) + '\n' + 'Unique: ' + chalk.yellow(this.unique) + '\n' + chalk.redBright('Broken: ' + this.broken)+ '\n';
  }
  
}

const countWithBroken = (linksValidation) => {
  let brokenLinks = [];
  for (let link of linksValidation) {
    if (link.status >= 400) {
      brokenLinks.push(link.status);
    }
  }
  let objResult;
  objResult = new statsLinks(linksValidation.length,linksValidation.length,brokenLinks.length);
    /*Total: linksValidation.length,
    Unique: linksValidation.length,
    Broken: brokenLinks.length,*/
  
  // return 'Total: '+chalk.yellow(objResult.Total) + '\n' + 'Unique: '+ chalk.yellow(objResult.Unique) + '\n' + 'Broken: ' + chalk.redBright(objResult.Broken);
  return objResult;

  // console.log('linksb: ',linksValidation);
}

module.exports.count = count;
module.exports.statsLinks = statsLinks;
module.exports.countWithBroken = countWithBroken;