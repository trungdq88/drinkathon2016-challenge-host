function btoa(str) {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'binary');
  }

  return buffer.toString('base64');
}

var express = require('/node_modules/express');
var bodyParser = require('/node_modules/body-parser');
var fs = require('fs');

var answer = btoa(fs.readFileSync('/secret/email.txt'));
var level3 = require('/secret/levels/3.js');
var level2 = require('/secret/levels/2.js');
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
    if (req.body.content === answer) {
      res.json(level3);
    } else {
      res.json({error: 'Oh no... That email is not valid!'});
    }
  });

  router.post('/next', function (req, res) {
    if (level3.check(req.body.island_name,
                     req.body.island_lat,
                     req.body.island_lng)) {
      res.json({next_island_url: 'http://asd'});
    } else {
      res.json({error: 'Hm... where is that?'});
    }
  });

  router.post('/show', function (req, res) {
    if (level2.check(req.body.island_name,
                     req.body.island_lat,
                     req.body.island_lng)) {
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

