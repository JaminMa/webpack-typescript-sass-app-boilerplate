var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d', port);
});
