/* eslint-env jest */
const {mdLinks} = require('../src/index');
const find = require('../src/find');
const links = require('../src/links');
const stat = require('../src/stats');
const file = require('../src/file');
const {
  expectedLinks,
  mdFiles, 
  statDefault, 
  expectedLinksValidated,
  statDefaultString,
  statDefaultBroken,
  statDefaultBrokenString,
  mdLinksObjectValidate,
} = require('../test/mockData');
const fetch = require('sync-fetch');
jest.mock('sync-fetch');

describe('mdLinks', () => {
  it('default mdLinks', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md', {validate:false,stats:false})).
      resolves.toStrictEqual(mdLinksObjectValidate);
  });
  /*
  it('validate mdLinks', () => {
    expect.assertions(1);
    return expect(mdLinks('./test/mock.md', {validate:true,stats:false})).
      resolves.toStrictEqual(mdLinksObjectValidate);
  });
*/
});

describe('directory', () => {
  it('find md files', () => {
    expect(find.directory('./')).toStrictEqual(mdFiles);
  })
})

describe('open files', () => {
  it('read files md', () => {
    expect(file.open('./test/mock.md')).toStrictEqual(expectedLinks);
  })
})

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
