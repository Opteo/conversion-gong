//var Promise = require('bluebird')
// var Adwords = require('node-adwords').AdwordsUser
// var AdwordsConstants = require('node-adwords').AdwordsConstants
// var AdwordsReport = require('node-adwords').AdwordsReport
var PythonShell = require('python-shell')
var mysql = require('mysql')

// var report = new AdwordsReport({
	
// })

var conversions = 0

setInterval(function() {
	var mysql      = require('mysql');
	var connection = mysql.createConnection(require('./config').db.rds);

	connection.connect();

	connection.query('SELECT count(*) as count from common.users', function(err, rows, fields) {
	  if (err) {
	  	console.log(err)
	  }

	  var new_conversions = rows[0].count
		console.log('conversions: ', new_conversions)
		if(new_conversions > conversions) {
			conversions = new_conversions
			console.log('new conversion found!')
			console.log('running python')
			PythonShell.run('led.py', function(err) {
				if(err) {
					console.log(err)
				}
				console.log('finished script')
			})
		}
	});

	connection.end();
}, 5000)


// setInterval(function() {
// 	report.getReport('v201609', {
// 		reportName: 'Opteo',
// 		reportType: 'ACCOUNT_PERFORMANCE_REPORT',
// 		fields: ['AllConversions'],
// 		format: 'CSV',
// 		startDate: new Date("01/01/2010"),
// 		endDate: new Date("01/01/2018")
// 	}, function(err, report) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			var new_conversions = +report.split('\n')[2].split(',').join('').split("\"").join('')
// 			console.log('conversions: ', new_conversions)
// 			if(new_conversions > conversions) {
// 				conversions = new_conversions
// 				console.log('new conversion found!')
// 				console.log('running python')
// 				PythonShell.run('led.py', function(err) {
// 					if(err) {
// 						console.log(err)
// 					}
// 					console.log('finished script')
// 				})
// 			}
// 		}
// 	})
// }, 5000)