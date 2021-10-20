const count = (pairs) => {
  let totLinks = [];
  let brokenLinks = [];
  let uniqueLinks = [];
  let arrStats = [];
  
  uniqueLinks = pairs.map((item) => {
    return item.link;
  })

  console.log('unique', uniqueLinks.length);
  // console.log('arrStats: ', arrStats)
  return {
    Total: pairs.length,
    Unique: uniqueLinks.length,
  };
}

const countWithBroken = (linksValidation) => {
  console.log('linksb: ',linksValidation);
}

module.exports.count = count;
module.exports.countWithBroken = countWithBroken;