
/**
 * Module dependencies.
 */



    

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , mongoose = require('mongoose')
  , path = require('path');

server.listen(4000);

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
//Bootstrap db connection
mongoose.connect('mongodb://localhost/FinalProject');
require('./models/energyUse');
app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('title', 'IS683 - Data Visualiation Project');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Bootstrap routes
var routes = require('./routes')(app);
/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/
//socket io
var energyUse = mongoose.model('energyUse');


var selectedCountryData = {};
var arrLabels = [];
var arrData = [];





io.sockets.on('connection', function (socket) {
  socket.on('selectCountry', function(data) {
    energyUse.findOne({_id : data.id}, function(err, rsp) {
        for(keys in rsp.data) { 
          arrLabels.push(parseInt(keys));
          arrData.push(parseInt(rsp.data[keys]));
        }
        selectedCountryData.Labels =  arrLabels;
        selectedCountryData.Data =  arrData;
   });
    io.sockets.emit('updatechart', selectedCountryData, data);
    arrData = [];
    arrLabels = [];
  });

});