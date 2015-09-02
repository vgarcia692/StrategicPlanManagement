
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Victor App'});
};

exports.adminIndex = function(req, res) {
	res.render('admin/index', {title: 'Administration'});
};

exports.deptHeadIndex = function(req, res) {
	res.render('deptHead/index', {title: 'Department Head'});
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.adminPartials = function (req, res) {
  var name = req.params.name;
  res.render('admin/partials/' + name);
};

exports.deptHeadPartials = function(req, res) {
	var name = req.params.name;
	res.render('deptHead/partials/' + name);
};
