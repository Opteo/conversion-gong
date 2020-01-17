var PythonShell = require('python-shell')
var request = require('request')

var conversions = 0

setInterval(function() {
	request.get('https://staging-api.opteo.com/render/gongcount', { timeout: 1500 }, function(
            err,
            bod1,
            count
        ) {
          if (err) {
	  	console.log(err)
	  } else {
		 var new_conversions = +count
		console.log('conversions: ', new_conversions)
		if(new_conversions > conversions) {
			conversions = new_conversions
			console.log('new conversion found!')
			console.log('running python')
			PythonShell.run('led.py', {scriptPath: '/home/pi/conversion-gong'}, function(err) {
				if(err) {
					console.log(err)
				} else {
					console.log('finished script')	
				}
			})
		} 
	  }
        })
	
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
