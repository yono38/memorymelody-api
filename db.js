module.exports = function(config) {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/memorymelody');

  var Artist = new Schema({
      name: { type: String, required: true, unique: true }
  });
  var ArtistModel = mongoose.model('Artist', Artist);

  var Venue = new Schema({
      name: { type: String, required: true, unique: true }
  });
  var VenueModel = mongoose.model('Venue', Venue);

  var Concert = new Schema({
      artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
      date: { type: Date, required: true },
      venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
      notes: { type: String }
  });
  var ConcertModel = mongoose.model('Concert', Concert);

  return {
    models: {
      Artist: ArtistModel,
      Venue: VenueModel,
      Concert: ConcertModel
    }
  };
};
