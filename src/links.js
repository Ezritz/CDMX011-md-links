const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const validate = (link) => {
  if (link.substr(link.length -1, link.length) ===')') {
    link = link.slice(0, -1);
  }
  fetch(link)
    .then(response => console.log(link,response.status))
    .catch(err => {
      console.log('Error: ',err.message);
    })
}

module.exports.validate = validate;