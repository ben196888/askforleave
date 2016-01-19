'use strict';

exports.init = function(req, res){
	if(req.isAuthenticated()){
		res.redirect('/account/');
	}
	else{
		res.render('index', { title: '做好做滿' , projectName: 'Leave'});
	}
};
