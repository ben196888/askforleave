'use strict';

exports = module.exports = function(app, passport) {
	// var LocalStrategy  = require('passport-local').Strategy;
	var GoogleStrategy = require('passport-google-oauth2').Strategy;
	passport.use(new GoogleStrategy({
		clientID : app.config.oauth.google.key,
		clientSecret: app.config.oauth.google.secret
	}, function(req, accessToken, refreshToken, profile, done){
		process.nextTick(function(){
			app.db.models.Account.findOne({'google.id': profile.id}, function(err, account){
				if(err) return done(err);
				if(!account){
					// create account
					var username = profile.emails[0].value.split("@")[0];
					var email = profile.emails[0].value;
					var fieldsToSet = {
						displayname: profile.displayName,
						username: username,
						email: email,
						roles: ['user'],
						search: [username, email]
					};
					fieldsToSet[profile.provider] = { id: profile.id };
					app.db.models.Account.create(fieldsToSet, function(err, account){
						if(err) throw err;
						return done(null, account);
					});
				}
				else{
					// login
					console.log(req.user);
					return done(null, account);
				}

			});
		});
	}));

	passport.serializeUser(function(account, done){
		done(null, account._id);
	});
	passport.deserializeUser(function(id, done){
		app.db.models.Account.findOne( { _id: id }, function(err, account){
			done(err, account);
		});
	});
};