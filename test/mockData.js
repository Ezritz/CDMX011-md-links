const stats = require('../src/stats');
const chalk = require('chalk');
const index = require('../src/index');
const links = require('../src/links');
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
let mdFiles = ['README.md','test/mock.md','test/module/carpeta.md/md.md','test/module/prueba.md', 'test/module/prueba2.md'];

let statDefault = new stats.statsLinks(4,4);
let statDefaultString = '\nTotal: '+chalk.yellow(4)+'\nUnique: '+chalk.yellow(4)+'\n';
let statDefaultBroken = new stats.statsLinks(4,4,1);
let statDefaultBrokenString = '\nTotal: '+chalk.yellow(4)+'\nUnique: '+chalk.yellow(4)+'\n'+chalk.redBright('Broken: 1')+'\n';

const mdLinksObjectValidate = new index.arrObjValidate(expectedLinksWithStatus);

let validateString = [
new links.Response('www.google.com','Google','500', './test/mock.md')
];

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
}

