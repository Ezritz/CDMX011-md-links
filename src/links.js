const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const validate = (link) => {
  fetch(link)
    .then(promiseFetch => promiseFetch.json())
    .then(content => console.log(content))
    .catch(err => {
      console.log('Error: ',err.message);
    })
}

module.exports.validate = validate;