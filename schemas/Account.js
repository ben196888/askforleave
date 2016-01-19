'use strict'

exports = module.exports = function(app, mongoose){
	var accountSchema = new mongoose.Schema({
		displayname: String,
		username: { type: String, unique: true },
		password: String,
		email: { type: String, unique: true },
		roles: [String],
		timeCreated: { type: Date, default: Date.now },
		google: {},
		search: [String]
	});
	accountSchema.methods.canPlayRoleOf = function(role){
		if (roles.indexOf(role) >=0 )
			return true;
		return false;
	};
	accountSchema.methods.defaultReturnUrl = function(){
		var returnUrl = '/';
		if (this.canPlayRoleOf('manager')) {
			returnUrl = '/manager/';
		}
		if (this.canPlayRoleOf('admin')) {
			returnUrl = '/admin/';
		}
		if (this.canPlayRoleOf('user')) {
			returnUrl = '/user/';
		}
		return returnUrl;
	};
	accountSchema.methods.encrytPassword = function(password, done) {
		var bcrypt = require('bcrypt');
		bcrypt.genSalt(10, function(err, salt){
			if(err)return done(err);
			bcrypt.hash(password, salt, function(err, done){
				done(err, hash);
			});
		});
	};
	accountSchema.methods.validatePassword = function(password, hash, done) {
		var bcrypt = require('bcrypt');
		bcrypt.compare(password, hash, function(err, res){
			done(err, res);
		});
	};
	accountSchema.index({ username: 1 }, { unique: true });
	accountSchema.index({ email: 1 }, { unique: true });
	accountSchema.index({ timeCreated: 1 });
	accountSchema.index({ 'google.id': 1 });
	accountSchema.index({ search: 1 });
	accountSchema.set('autoIndex', (app.get('env') === 'development'));
	app.db.model('Account', accountSchema);
};