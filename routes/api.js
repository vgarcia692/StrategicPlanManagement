/*
 * Serve JSON to our AngularJS client
 */

exports.userData = function (req, res) {
	if (req.isAuthenticated()) {
		res.json({
			user: req.user
		});
		} else {
			res.send(401);
		}
	};

