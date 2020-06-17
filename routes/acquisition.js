var express = require('express');

var app = express();

var Acquisition = require('../models/acquisition');
var Doc = require('../models/doc');

// ==========================================
// Obtener todos las adquisiciones JSON estructure
// ==========================================
app.get('/all', (req, res, next) => {

    
    Acquisition.find({})
        .exec(
            (err, acquisitions) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando acquisition',
                        errors: err
                    });
                }


                    res.status(200).json({
                        ok: true,
                        acquisitions: acquisitions.forEach((elemento)=>{
                            Doc.find({"_id":elemento._id})
                                .exec(

                                )
                        
                        }),
                        
                    });
                

            });
});

function mostrarDocs(acquisitions, res){
    Doc.findById(id, (err, doc)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando acquisition',
                errors: err
            });
        }
        
    });
 }

// ==========================================
// Obtener todos las adquisiciones 
// ==========================================
app.get('/', (req, res, next) => {

    
    Acquisition.find({})
        .exec(
            (err, acquisitions) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando acquisition',
                        errors: err
                    });
                }

                Acquisition.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        acquisitions: acquisitions,
                        total: conteo
                    });
                })

            });
});

// ==========================================
// Actualizar Acquisition
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Acquisition.findById(id, (err, acquisition) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar acquisition',
                errors: err
            });
        }

        if (!acquisition) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El adquisicion con el id ' + id + ' no existe',
                errors: { message: 'No existe un acquisition con ese ID' }
            });
        }

        acquisition.section = body.section;
        acquisition.titulo = body.titulo;
        acquisition.estado = body.estado;
        acquisition.correo = body.correo;
        acquisition.fecha_invitacion = body.fecha_invitacion;
        acquisition.fecha_presentacion = body.fecha_presentacion;
        acquisition.fecha_ampliacion = body.fecha_ampliacion;
        acquisition.fecha_consultas = body.fecha_consultas;
        
        acquisition.save((err, acquisitionSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar acquisition',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                acquisition: acquisitionSaved
            });

        });

    });

});



// ==========================================
// Crear un nuevo acquisition
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var acquisition = new Acquisition({
        section: body.titulo,
        titulo: body.titulo,
        estado: body.estado,
        correo: body.correo,
        fecha_invitacion: body.fecha_invitacion,
        fecha_presentacion: body.fecha_presentacion,
        fecha_ampliacion: body.fecha_ampliacion,
        fecha_consultas: body.fecha_consultas
        
    });

    acquisition.save((err, acquisitionSaved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear acquisition',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            acquisition: acquisitionSaved
        });


    });

});


// ============================================
//   Borrar un acquisition por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Acquisition.findByIdAndRemove(id, (err, acquisitionDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar acquisition',
                errors: err
            });
        }

        if (!acquisitionDeleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un acquisition con ese id',
                errors: { message: 'No existe un acquisition con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            acquisition: acquisitionDeleted
        });

    });

});


module.exports = app;