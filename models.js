'use strict';

exports = module.exports = function(app, mongoose) {
	// embeddable docs first
	require('./schemas/LeaveApplication')(app, mongoose);

	// then regular docs
	require('./schemas/Account')(app, mongoose);
	require('./schemas/User')(app, mongoose);
	require('./schemas/Admin')(app, mongoose);
	require('./schemas/AdminGroup')(app, mongoose);
};