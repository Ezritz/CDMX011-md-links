const fetch = require('sync-fetch')

function Response(href, status, statusText) {
  this.href=href;
  this.status=status;
  this.statusText=statusText;
}

Response.prototype.toString = function responseToString() {
  return "href: "+this.href +" status: "+this.status+" statusText: "+this.statusText;
}

const validate = (link) => {
  if (link.substr(link.length -1, link.length) ===')') {
    link = link.slice(0, -1);
  }

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