'use strict'

exports = module.exports = function(app, mongoose){
	var leaveAppSchema = new mongoose.Schema({
		leaveType: {type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType'},
		accountCreated: {
			id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
			name: { type: String, default: '' },
			time: { type: Date, default: Date.now }
		},
		data: {
			startTime: {type: Date, default: Date.now},
			endTime  : {type: Date, default: Date.now},
			actualLeaveTime: {type: Number, default: 0},
			description: {type: String, default:''}
		},
		authorized: {type: Boolean, default: true}
	});
	app.db.model('LeaveApplication', leaveAppSchema);
};