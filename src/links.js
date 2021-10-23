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
    if(resp.statusText !== 'ok'){
      resp.statusText === 'fail';
    }
    response = new Response(resp.url, resp.status, resp.statusText);
  } catch (error) {
    response = new Response(link, 500, 'fail');
  }
  return response;
}

module.exports.validate = validate;