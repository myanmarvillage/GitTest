var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var api = new ParseServer({
    // Parse Server settings
  databaseURI: 'mongodb://localhost:27017/dev',
  cloud: __dirname + '/cloud/main.js',
  appId: 'NWTPARSE',
  clientKey: 'newwave', //Add your client key here.
  masterKey: 'newwave', //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:4040/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  push: {
	  android: {
		  senderId: '852137287481', // senderId: '328919160037',
		  apiKey: 'AIzaSyAFlWnVAuA7DKW1Z9EL7qHbXVEQKe-HLYs' // apiKey: 'AIzaSyBwMMFh0zZ2syz_O1K--EvHZkZuxCzAYHs'
	  }/*,
	  ios: {
		  pfx: '',
		  bundleId: '',
		  production: false
	  }*/
  }
});

var dashboard = new ParseDashboard({
    // Parse Dashboard settings
	"apps": [
    {
      "serverURL": "http://localhost:4040/parse",
      "appId": "NWTPARSE",
      "masterKey": "newwave",
      "appName": "BestTrip"
    }
  ]
});

var app = express();

// make the Parse Server available at /parse
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);