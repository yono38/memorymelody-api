var TSV = require('tsv'),
    fs = require('fs'),
    Q = require('q'),
    db = require('../db')(),
    _ = require('underscore');

// Seed DB from TSV file
function parseTSVtoJSON() {
  var tsv_data = fs.readFileSync('./jason_concerts.tsv').toString();

  var parsed = TSV.parse(tsv_data);
  var post_processing = [];
  // Remove Junk Data
  for (var i = 0; i < parsed.length; i++ ){
    var c = parsed[i];
    if (c.hasOwnProperty('artist') && c.artist !== "") {
      post_processing.push(c);
    }
  }
  return post_processing;
}

function generateArtistCollection(json) {
  var artists = generateUniqueList(json, 'artist');
  db.models.Artist.create(artists, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted Artists: ' + artists.length);
    }
  });
}

function generateLocationCollection(json) {
  var locs = generateUniqueList(json, 'venue');
  db.models.Venue.create(locs, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted Locations: ' + artists.length);
    }
  });
}

function generateUniqueList(json, field) {
  return _.chain(json)
         .pluck(field)
         .map(function(a) { return a.trim(); })
         .uniq()
         .sortBy(function(a) { return a; })
         .map(function(a) {return {name: a};})
         .value();
}

function generateConcertList(json) {
  json.forEach(function(c) {
    //console.log(c);
    var artistId = db.models.Artist.findOne({name: c.artist}).exec();
    var venueId = db.models.Venue.findOne({name: c.venue}).exec();
    Q.all([artistId, venueId]).then(function(res) {
      //console.log(res);
      var keyC = {
        artist: res[0]._id,
        venue: res[1]._id,
        date: c.date
      };
      if (c.notes) {
        keyC.notes = c.notes;
      }
      db.models.Concert.create(keyC).exec();
      console.log(keyC);
    });
    
  });
}

//console.log(JSON.stringify(parseTSVtoJSON(), null, 2));
//generateArtistCollection(parseTSVtoJSON());
//generateLocationCollection(parseTSVtoJSON());
generateConcertList(parseTSVtoJSON());
