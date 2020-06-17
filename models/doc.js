var mongoose = require('mongoose');
const acquisition = require('./acquisition');
var Schema = mongoose.Schema;


var docSchema = new Schema({
    
    titulo: { type: String, required: [true, 'El Titulo es necesario'] },
    image: { type: String },
    image_type: {type: String},
    acquisition: {
        type: Schema.Types.ObjectId, ref: 'Acquisition',
        required: [true, 'El id acquisition es un campo obligatorio ']
    }

        
});



module.exports = mongoose.model('Doc', docSchema);