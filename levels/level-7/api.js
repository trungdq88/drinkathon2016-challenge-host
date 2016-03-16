var express = require('/node_modules/express');
var bodyParser = require('/node_modules/body-parser');
var fs = require('fs');

var level8 = require('/secret/levels/8.js');
var level6 = require('/secret/levels/6.js');
var PORT = 7777;


// Error reporting
process.on('uncaughtException', function(err) {
  console.log(err);
});

// Start express server
var server = express();

// Serve static files at root url (React/Redux client)
server.use('/', express.static(__dirname));
server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));
/**
 * Set up API server
 */
var startApi = function () {

  var router = express.Router();

  router.get('/hello', function (req, res) {
    res.json({hello: 'world'});
  });

  router.post('/next', function (req, res) {
    if (req.body.island_name === level8.name &&
        req.body.island_lat === level8.lat &&
        req.body.island_lng === level8.lng) {
      res.json({next_island_url: 'http://asd'});
    } else {
      res.json({error: 'Hm... where is that?'});
    }
  });

  router.post('/show', function (req, res) {
    if (req.body.island_name === level6.name &&
        req.body.island_lat === level6.lat &&
        req.body.island_lng === level6.lng) {
      res.sendFile(__dirname + '/question.html');
    } else {
      res.json({error: 'Uhh... we only accept guests from previous island.'});
    }
  });

  // API routes
  server.use('/api', router);

  // Start server
  server.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
  });

};

startApi();

