"use strict";

const config = require('./config');
const AWS = require("aws-sdk");
const TopicArn = 'arn:aws:sns:ap-southeast-2:870109809871:AutoRemediationOutcome';

// Dummy remediation test
module.exports.handler = (event, context, callback) => {

	console.log('Dummy remediation test - Received event:', JSON.stringify(event, null, 2));

	if (!event || !event.resource || event.ruleId !== "XX-001") {
		return handleError("Invalid event");
	}

	// handle success

	// handle failure

	const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

	var params = {
		NextToken: ''
	};
	sns.listTopics(params, function (err, data) {

		if (err) {
			// console.log(err, err.stack); // an error occurred
			const params = {
				Message: 'Error message',
				Subject: "Error message From AutoRemediateXX-001",
				TopicArn: 'arn:aws:sns:ap-southeast-2:870109_809871:AutoRemediationOutcome'
			};

			let snsPromise = sns.publish(params).promise();

			snsPromise
				.then(() => { console.log(data) })
				.catch(() => { console.log(err, err.stack) });
			// sns.publish(params, function (err, data) {
			// 	if (err) console.log(err, err.stack); // an error occurred
			// 	else console.log(data);           // successful response
			// });
		}

		else {
			// console.log(data);           // successful response
			const params = {
				Message: 'Success message',
				Subject: "Success message From AutoRemediateXX-001",
				TopicArn: 'arn:aws:sns:ap-southeast-2:870109_809871:AutoRemediationOutcome'
			};

			let snsPromise = sns.publish(params).promise();

			snsPromise
				.then(() => { console.log(data) })
				.catch(() => { console.log(err, err.stack) });
			// sns.publish(params, function (err, data) {
			// 	if (err) console.log(err, err.stack); // an error occurred
			// 	else console.log(data);           // successful response
			// });
		}

	});

	callback(null, "Success");

	function handleError(message) {

		message = message || "Failed to process request.";
		return callback(new Error(message));

	}

};
