'use strict';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.redirect('/login/');
}

function ensureAdmin(req, res, next) {
  if (req.user.canPlayRoleOf('admin')) {
    return next();
  }
  res.redirect('/');
}

function ensureManager(req, res, next) {
  if (req.user.canPlayRoleOf('manager')) {
    return next();
  }
  res.redirect('/');
}

function ensureUser(req, res, next) {
  if (req.user.canPlayRoleOf('user')) {
    return next();
  }
  res.redirect('/');
}

exports = module.exports = function(app, passport){
	// front end
	app.get('/', require('./views/index').init);

	// social login
	app.get('/login/google', passport.authenticate('google', {
		callbackURL: '/login/google/callback', 
		passReqToCallback: true,
		scope: ['profile', 'email']
	}));
	app.get('/login/google/callback', passport.authenticate('google', {
		callbackURL: '/login/google/callback', 
		successRedirect: '/account/', 
		failureRedirect: '/'
	}));

	// logout
	app.get('/logout/', require('./views/logout').init);
	// social login

	// app.get('/account/', function(req, res){res.send(req.user);});
	app.get('/account/', require('./views/account/index').init);
	// app.get('/account/:id/leave', require('./views/account/index').show);
	// app.post('/account/:id/leave', require('./views/account/index').create);
	app.get('/account/profile', function(req, res){res.send("profile");});
};