/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
      title: 'NORX Leaflet',
      version: require("../package.json").version
    }
  );
};
