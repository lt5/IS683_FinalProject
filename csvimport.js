var express = require('express'),
   fs = require('fs'),
   routes = require('./routes'),
   http = require('http'),
   csv = require('csv'),
   path = require('path');
var app = express();


var arrData = [];
var stEnergyData = {};
var arrEnergyData = [];

function dump (mydump) {
   console.log(mydump);
}

csv(arrData)
   .from.stream(fs.createReadStream(__dirname + '/energyUse.csv'), {
   columns: true
})
   .on('record', function (row, index) {
   arrData.push(row);
})
   .on('end', function (count) {
      for(var idx in arrData) {
         var tmpData = {};
         for(var keys in arrData[idx])
            if(keys !== "country") {
               tmpData[keys] = arrData[idx][keys];
            }
            stEnergyData.country = arrData[idx].country;
            stEnergyData.data = tmpData;
            arrEnergyData.push(stEnergyData);
            stEnergyData = {};
      }

   var MongoClient = require('mongodb').MongoClient;
   // Connect to the db
   MongoClient.connect("mongodb://localhost/FinalProject", function (err, db) {
      var collection = db.collection('energyUse')
      collection.insert(arrEnergyData, function (err, doc) {
         console.log(doc);
      });
   });
   console.log('Number of lines: ' + count);
   

});


app.configure(function () {
   app.set('port', process.env.PORT || 8082);
   app.set('views', __dirname + '/views');
   app.set('view engine', 'jade');
   app.use(express.favicon());
   app.use(express.logger('dev'));
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(app.router);
   app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
   app.use(express.errorHandler());
});

//app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
   console.log("Express server listening on port " + app.get('port'));
});
