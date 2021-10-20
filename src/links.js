const fetch = require('sync-fetch')

function Response(href, status, statusText) {
  this.href=href;
  this.status=status;
  this.statusText=statusText;
}

const validate = (link) => {
  
  // let linkValidate = [];
  //link.split(regText);
  //console.log('holi: ',link);
  // const result = link.filter(links => links.match(regLink));
  //let linksRegex = link.match(regLink);
  //console.log('linksRegex: ', linksRegex);

  let response;
  try{
    let resp = fetch(link);
    response = new Response(resp.url, resp.status, resp.statusText);
  } catch (error) {
    response = new Response(link, 500, 'invalid URL');
  }
  return response;
}

module.exports.validate = validate;