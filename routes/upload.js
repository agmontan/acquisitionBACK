var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var Doc = require('../models/doc');



var app = express();


// default options
app.use(fileUpload({
    createParentPath: true
}));



 //single file 

 app.put('/:id', (req, res, next) =>{
    var id = req.params.id;
     if(!req.files){
         return res.status(400).json({
             ok:false,
             mensaje:"No selecciono nada",
             errors: {message: 'Seleccione la Imagen'}
         });
     }

     //Obtener namefile

     var archivo = req.files.imagen;
     var cutname = archivo.name.split('.');
     var extension = cutname[cutname.length -1];

     //validando extensiones 

     var extensionesvalidas = ['jpg','jpeg', 'pdf', 'docx'];

     if(extensionesvalidas.indexOf(extension) < 0)
     {
        return res.status(400).json({
            ok:false,
            mensaje:"Archivo no valido",
            errors: {message: 'El archivo que desea subir no es valido'}
           
        });
     }

     var path = './assets/doc/adquisiciones/'+archivo.name;
     archivo.mv(path,err =>{
         if(err)
         {
            return res.status(500).json({
                ok:false,
                mensaje:"Error al mover el archivo",
                errors: {message: 'El archivo no se guardo'}
               
            });
         }

         subirAlDoc(id, archivo.name,extension, res);
         
     })


     
 })

 function subirAlDoc(id, nombreArchivo,extension, res){
    Doc.findById(id, (err, doc)=>{

        var pathOld = './assets/doc/adquisiciones'+doc.image;
        if(fs.existsSync(pathOld)){
            fs.unlink(pathOld);
        }
        doc.image = nombreArchivo;
        doc.image_type = 'fa-file-'+extension;
        doc.save((err,docActualizado)=>{
            
            res.status(200).json({
                ok: true,
                message: 'Archivo movido'
            });
        })
    });
 }


module.exports = app;