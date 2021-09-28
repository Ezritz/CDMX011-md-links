module.exports = () => {
  // ...
};

const mdLinks = (path, options) => {
  
};

mdLinks('./Readme.md', {validate: true})
  .then(links => {
    // [{href, text, file, status, ok}, ...]
  })
  .catch(console.error);

mdLinks('./some/example.md', {validate: true})
  .then(links => {
    // [{href, text, file, status, ok}, ...]
  })
  .catch(console.error);

mdLinks('./some/dir')
  .then(links => {
    // [{href, text, file}, ...]
  })
  .catch(console.log(error))