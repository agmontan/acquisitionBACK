var express = require('express');

var app = express();

var Acquisition = require('../models/acquisition');

// ==========================================
// Obtener todos las adquisiciones
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Acquisition.find({})
        .skip(desde)
        .limit(5)
        .populate('user', 'name email')
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


        acquisition.titulo = body.titulo;
        acquisition.fecha_invitacion = body.fecha_invitacion;
        acquisition.fecha_presentacion = body.fecha_presentacion;
        acquisition.fecha_ampliacion = body.fecha_ampliacion;
        acquisition.fecha_consultas = body.fecha_consultas;
        acquisition.estado = body.estado;
        acquisition.correo = body.correo;

        acquisition.user = req.user._id;

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
        titulo: body.titulo,
        fecha_invitacion: body.fecha_invitacion,
        fecha_presentacion: body.fecha_presentacion,
        fecha_ampliacion: body.fecha_ampliacion,
        fecha_consultas: body.fecha_consultas,
        estado: body.estado,
        correo: body.correo

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