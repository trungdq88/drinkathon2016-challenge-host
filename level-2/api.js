var express = require('/node_modules/express');
var bodyParser = require('/node_modules/body-parser');
var PORT = 7772;


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

  router.post('/check', function (req, res) {
    res.json(req.body);
  });

  // API routes
  server.use('/api', router);

  // Start server
  server.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
  });

};

startApi();

