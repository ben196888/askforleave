'use strict';

exports.init = function(req, res){
	var account = req.user;
	// req.app.db.models.LeaveApplication
	req.app.db.models.LeaveApplication.find({'accountCreated.id':account._id}, function(err, leaves){
		if(err) return done(err);
		res.render('account/index', { account: account, leaves: leaves});
	});
};

// exports.show = function(req, res){
// 	req.params.id
// 	res.render('account/leave/index');
// };

// exports.create = function(req, res){

// };