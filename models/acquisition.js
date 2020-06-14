var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var acquisitionSchema = new Schema({
    titulo: { type: String, required: [true, 'El Titulo es necesario'] },
    fecha_invitacion: { type: Date, required: [true, 'La fecha de invitacion es necesaria'] },
    fecha_presentacion: { type: Date, required: [true, 'La fecha de presentacion es necesaria'] },
    fecha_ampliacion: { type: Date},
    fecha_consultas: { type: Date },
    estado: { type: String, required: [true, 'El estado es necesario'] },
    correo: { type: String, required: [true, 'El correo asociado es necesario'] },
    img: { type: String, required: false },
    
});



module.exports = mongoose.model('Acquisition', acquisitionSchema);