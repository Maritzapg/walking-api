//obtenemos el modelo TipDocModel con toda la funcionalidad
var PersonaModel = require('../models/personamodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la aplicación
module.exports = function () 
{
  
  //mostramos todos los tipos de documentos 
  router.get("/personamodel", function (req, res) 
  {
    
    //res.json(200,"LOL");
    PersonaModel.getPersonas(function (error, data) 
    {
       //res.json(200, data);
       res.status(200).json(data);
     });
  });

  //obtiene un tipo de documento por su id
  router.get("/personamodel/:id", function (req, res)
  {
    //id del tipo de documento
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if (!isNaN(id)) 
    {
      PersonaModel.getPersona(id, function (error, data) 
      {
        //si el tipo de documento existe lo mostramos en formato json
        if (typeof data !== 'undefined' && data.length > 0) 
        {
            //res.json(200, data);
            res.status(200).json(data)
        }
        //en otro caso mostramos una respuesta conforme no existe
        else 
        {
            //res.json(404, { "msg": "notExist" });
            res.status(404).json({ "msg": "notExist" })
        }
      });
    }
    else //si hay algún error
    {
        //res.json(500, { "msg": "Error" });
        res.status(500).json({ "msg": "Error" })
    }
  });

  //función que usa el verbo  post para insertar tipo de documento
  router.post("/personamodel", function (req, res) 
  {
    //creamos un objeto con los datos del tipo de documento
    var PersonaData = 
                  {
                    id_personas: null,
                    tipo_documento: req.body.tipo_documento,
                    numero_documento: req.body.numero_documento,
                    primer_nombre: req.body.primer_nombre,
                    primer_apellido: req.body.primer_apellido,
                    segundo_nombre: req.body.segundo_nombre,
                    segundo_apellido: req.body.segundo_apellido,
                  };

      PersonaModel.insertPersona(PersonaData, function (error, data) 
      {
        //si el tipo de documento se ha insertado correctamente mostramos su info
        if (data && data.insertId) 
        {
          res.redirect("/personamodel/" + data.insertId);
        }
        else 
        {
          res.json(500, { "msg": "Error" });
        }
      });
  });

  //función que usa el verbo  put para actualizar usuarios
  router.put("/personamodel", function (req, res) 
  {
    //almacenamos los datos de la petición en un objeto
    var PersonaData = 
                  { 
                    id_personas: req.param('id_personas'), 
                    tipo_documento: req.param('tipo_documento'),
                    numero_documento: req.param('numero_documento'),
                    primer_nombre: req.param('primer_nombre'),
                    primer_apellido: req.param('primer_apellido'),
                    segundo_nombre: req.param('segundo_nombre'),
                    segundo_apellido: req.param('segundo_apellido') 
                  };

    PersonaModel.updatePersona(PersonaData, function (error, data) 
    {
      //si el tipo de documeto se ha actualizado correctamente mostramos un mensaje
      if (data && data.msg) 
      {
        res.json(200, data);
        //res.status(200).json(data)
        //res.send(200).json(data)
      }
      else 
      {
        //res.json(500, { "msg": "Error" });
        res.status(500).json({"msg":"Error"})
      }
    });
  });

  //utilizamos el verbo delete para eliminar un tipo de documento
  router.delete("/personamodel", function (req, res) 
  {
    //id del tipo de documento a eliminar
    var id = req.param('id_personas');

    UserModel.deletePersona(id, function (error, data) 
    {
      if (data && data.msg === "deleted" || data.msg === "notExist") 
      {
        res.json(200, data);
      }
      else 
      {
        res.json(500, { "msg": "Error" });
      }
    });
  });

  return router;
}