/* eslint-env jest */
jest.mock('sync-fetch');
const fetch = require('sync-fetch');

const {mdLinks, cli} = require('../src/index.js');
const find = require('../src/find.js');
const links = require('../src/links.js');
const stat = require('../src/stats.js');
const file = require('../src/file.js');
const {
  expectedLinks,
  mdFiles, 
  statDefault, 
  expectedLinksValidated,
  statDefaultString,
  statDefaultBroken,
  statDefaultBrokenString,
  mdLinksObjectValidate,
  mdLinksOptionValidate,
  mdLinksOptionValidateString,
  mdLinksNoOptionString,
  mdLinksObjectNoFile,
  mdLinksObjectValidateFail,
  cliResultValidate,
  cliResultStats,
  
} = require('../test/mockData.js');



describe('mdLinks', () => {
  it('default mdLinks', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md', {validate:false,stats:false})).
      resolves.toStrictEqual(mdLinksObjectValidate);
  });
  it('default mdLinks without options', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md')).
      resolves.toStrictEqual(mdLinksObjectValidate);
  });
  it('find md files one directory', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/module/carpeta.md/', {validate:false,stats:false})).
      resolves.toStrictEqual(mdLinksObjectNoFile);
  });
  it('should not resolved with error path', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md/', {validate:false,stats:false})).
      rejects.toEqual(true);
  });
  
  it('valid Links with fetch', () => {
    fetch.mockReset();
    fetch.mockReturnValueOnce({url: 'www.google.com', status: 500, statusText: 'fail'})
      .mockReturnValueOnce({url: 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex', status: 200, statusText: 'ok'})
      .mockReturnValueOnce({url: 'https://nodejs.org/en/', status: 200, statusText: 'ok'})
      .mockReturnValueOnce({url: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday', status: 200, statusText: 'ok'});
    const result = mdLinks('./test/mock.md', {validate:true,stats:false});
   
    // expect(fetch).toHaveBeenCalledTimes(4);
    expect(fetch).toHaveBeenNthCalledWith(1, 'www.google.com');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex');
    expect(fetch).toHaveBeenNthCalledWith(3, 'https://nodejs.org/en/');
    expect(fetch).toHaveBeenNthCalledWith(4, 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday');
    
    expect.assertions(5);
    return expect(result).resolves.toStrictEqual(mdLinksOptionValidate);
  });
  
  it('invlid Links with fetch', () => {
    fetch.mockReset();
    fetch.mockReturnValue();
      
    const result = mdLinks('./test/module/prueba2.md', {validate:true,stats:false});
   
    expect(fetch).toHaveBeenCalledTimes(1);
    expect.assertions(2);
    return expect(result).resolves.toStrictEqual(mdLinksObjectValidateFail);
  });
  
  it('Send stats with fetch', () => {
    fetch.mockReset();
    fetch.mockReturnValueOnce({url: 'www.google.com', status: 500, statusText: 'fail'})
      .mockReturnValueOnce({url: 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex', status: 200, statusText: 'ok'})
      .mockReturnValueOnce({url: 'https://nodejs.org/en/', status: 200, statusText: 'ok'})
      .mockReturnValueOnce({url: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday', status: 200, statusText: 'ok'});
    const result = mdLinks('./test/mock.md', {validate:true,stats:true});
   
    // expect(fetch).toHaveBeenCalledTimes(4);
    expect(fetch).toHaveBeenNthCalledWith(1, 'www.google.com');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex');
    expect(fetch).toHaveBeenNthCalledWith(3, 'https://nodejs.org/en/');
    expect(fetch).toHaveBeenNthCalledWith(4, 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday');

    expect.assertions(5);
    return expect(result).resolves.toStrictEqual(statDefaultBroken);
  });
  it('expected only stats', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md', {validate:false, stats:true})).
      resolves.toStrictEqual(statDefault);
  })
  it('expected array to object mdLinks to String', () => {
    expect(mdLinksObjectValidate.toString()).toEqual(mdLinksNoOptionString);
  })
  it('expected array to object validate to String', () => {
    expect(mdLinksOptionValidate.toString()).toEqual(mdLinksOptionValidateString);
  })
});

describe('cli', () => {
  it('expected object for option --stats', () => {
    expect(cli(['/usr/local/bin/node', '/usr/local/bin/md-links','./test/mock.md','--stats'], 
      {validate:false,stats:false, path: '/Users/edith/Desktop/bc-laboratoria/CDMX011-md-links'}))
    .toStrictEqual(cliResultStats);
  });
  
  it('expected object for option --validate', () => {
    expect(cli(['/usr/local/bin/node', '/usr/local/bin/md-links','./test/mock.md','--validate'],
      {validate:false,stats:false, path: '/Users/edith/Desktop/bc-laboratoria/CDMX011-md-links'}))
    .toStrictEqual(cliResultValidate);
  });
  
});

describe('directory', () => {
  it('find md files', () => {
    expect(find.directory('./')).toStrictEqual(mdFiles);
  })
});

describe('open files', () => {
  it('read files md', () => {
    expect(file.open('./test/mock.md')).toStrictEqual(expectedLinks);
  })
});

describe('stats to md', () => {
  it('show total and unique links', () => {
    expect(stat.count(expectedLinks)).toStrictEqual(statDefault);
  })
  it('expected links to string', () => {
    expect(statDefault.toString()).toEqual(statDefaultString);
  })
  it('show total,unique and broken links', () => {
    expect(stat.countWithBroken(expectedLinksValidated)).toStrictEqual(statDefaultBroken);
  })
  it('expected links with Broken to string', () => {
    expect(statDefaultBroken.toString()).toEqual(statDefaultBrokenString);
  })
})