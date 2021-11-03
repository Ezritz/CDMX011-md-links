const stats = require('../src/stats.js');
const chalk = require('chalk');
const index = require('../src/index.js');
const links = require('../src/links.js');
const expectedLinks = [
  {
    text: 'Google',
    link: 'www.google.com',
    file: './test/mock.md',
  },
  {
    text: 'stackoverflow',
    link: 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex',
    file: './test/mock.md',
  },
  {
    text: 'Node',
    link: 'https://nodejs.org/en/',
    file: './test/mock.md',
  },
  {
    text: 'Mock Fetch',
    link: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
    file: './test/mock.md',
  },
];
const expectedLinksWithStatus = [ 
  new index.objValidate('www.google.com','Google','', './test/mock.md'),
  new index.objValidate('https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex','stackoverflow','', './test/mock.md'),
  new index.objValidate('https://nodejs.org/en/','Node','', './test/mock.md'),
  new index.objValidate('https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday','Mock Fetch','', './test/mock.md'),
  
];
const expectedLinksOneMd = [
  new index.objValidate('https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/toString','google', '', './test/module/carpeta.md/md.md')
];

let mdFiles = ['README.md','test/mock.md','test/module/carpeta.md/md.md','test/module/prueba.md', 'test/module/prueba2.md'];


let statDefault = new stats.statsLinks(4,4);
let statDefaultString = '\nTotal: '+chalk.yellow(4)+'\nUnique: '+chalk.yellow(4)+'\n';
let statDefaultBroken = new stats.statsLinks(4,4,1);
let statDefaultBrokenString = '\nTotal: '+chalk.yellow(4)+'\nUnique: '+chalk.yellow(4)+'\n'+chalk.redBright('Broken: 1')+'\n';

const mdLinksObjectValidate = new index.arrObjValidate(expectedLinksWithStatus);
const mdLinksObjectNoFile = new index.arrObjValidate(expectedLinksOneMd);

const expectedLinksToValidate = [
  new index.objValidate('www.google.com','Google',500, './test/mock.md'),
  new index.objValidate('https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex','stackoverflow',200, './test/mock.md'),
  new index.objValidate('https://nodejs.org/en/','Node',200, './test/mock.md'),
  new index.objValidate('https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday','Mock Fetch',200, './test/mock.md'),
];
const expectedLinkFail = [
  new index.objValidate('www.google.com',500, 'fail')
]
const mdLinksObjectValidateFail = new index.arrObjValidate(expectedLinkFail);
const  mdLinksOptionValidate = new index.arrObjValidate(expectedLinksToValidate);
let mdLinksOptionValidateString = './test/mock.md '+ chalk.cyan('www.google.com')+' '+ 'fail '+ chalk.red(500) +' '+  chalk.green('Google')+ '\n'+
'./test/mock.md ' + chalk.cyan('https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex') + ' '+ 'ok '+ chalk.yellow(200)+ ' '+ chalk.green('stackoverflow')+'\n'+
'./test/mock.md ' + chalk.cyan('https://nodejs.org/en/') +' '+ 'ok '+chalk.yellow(200) + ' '+ chalk.green('Node')+'\n'+
'./test/mock.md ' + chalk.cyan('https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday') + ' '+'ok '+ chalk.yellow(200) +' '+  chalk.green('Mock Fetch')+'\n';

let cliResultValidate = {
  validate: true,
  stats: false,
  path: './test/mock.md',
}
let cliResultStats = {
  validate: false,
  stats: true,
  path: './test/mock.md',
}
let cliResultDefault = {
  validate: false,
  stats: false,
  path: '/Users/edith/Desktop/bc-laboratoria/CDMX011-md-links',
}
// const cliMdLinks = new index.arrObjValidate(cli);

let mdLinksNoOptionString = './test/mock.md '+ chalk.cyan('www.google.com')+' '+ chalk.green('Google')+ '\n'+
'./test/mock.md ' + chalk.cyan('https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex') + ' '+ chalk.green('stackoverflow')+'\n'+
'./test/mock.md ' + chalk.cyan('https://nodejs.org/en/') +' '+ chalk.green('Node')+'\n'+
'./test/mock.md ' + chalk.cyan('https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday') + ' '+ chalk.green('Mock Fetch')+'\n';
let expectedLinksValidated = [
  {
    text: 'Google',
    link: 'www.google.com',
    file: './test/mock.md',
    status: '500',
  },
  {
    text: 'stackoverflow',
    link: 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex',
    file: './test/mock.md',
    status: '200',
  },
  {
    text: 'Node',
    link: 'https://nodejs.org/en/',
    file: './test/mock.md',
    status: '200',
  },
  {
    text: 'Mock Fetch',
    link: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
    file: './test/mock.md',
    status: '200',
  },
];


module.exports = {
  expectedLinks,
  mdFiles, 
  statDefault,
  expectedLinksValidated,
  statDefaultString,
  statDefaultBroken,
  statDefaultBrokenString,
  mdLinksObjectValidate,
  expectedLinksWithStatus,
  mdLinksOptionValidate,
  mdLinksOptionValidateString,
  mdLinksNoOptionString,
  mdLinksObjectNoFile,
  mdLinksObjectValidateFail,
  cliResultValidate,
  cliResultStats,
  cliResultDefault
 
}

