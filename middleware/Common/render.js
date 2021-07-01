/**
 * Rendereli a paraméterben kapott oldalt.
 */
 //const requireOption = require('./requireOption');

 module.exports = function(objectrepository, viewName) {
  return function(req, res) {
      res.render(viewName);
  };
};