//obtenemos el modelo TipDocModel con toda la funcionalidad
var TipDocModel = require('../models/tipdocmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la aplicación
module.exports = function () 
{
  
  //mostramos todos los tipos de documentos 
  router.get("/tipdocmodel", function (req, res) 
  {
    
    //res.json(200,"LOL");
    TipDocModel.getTipDocs(function (error, data) 
    {
       //res.json(200, data);
       res.status(200).json(data);
     });
  });

  //obtiene un tipo de documento por su id
  router.get("/tipdocmodel/:id", function (req, res)
  {
    //id del tipo de documento
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if (!isNaN(id)) 
    {
      TipDocModel.getTipDoc(id, function (error, data) 
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
  router.post("/tipdocmodel", function (req, res) 
  {
    //creamos un objeto con los datos del tipo de documento
    var TipDocData = 
                  {
                    id_tipo_documentos: null,
                    tipo_documento: req.body.tipo_documento,
                    iniciales_tipo_documento: req.body.iniciales_tipo_documento,

                  };

      TipDocModel.insertTipDoc(TipDocData, function (error, data) 
      {
        //si el tipo de documento se ha insertado correctamente mostramos su info
        if (data && data.insertId) 
        {
          res.redirect("/tipdocmodel/" + data.insertId);
        }
        else 
        {
          res.json(500, { "msg": "Error" });
        }
      });
  });

  //función que usa el verbo  put para actualizar usuarios
  router.put("/tipdocmodel", function (req, res) 
  {
    //almacenamos los datos de la petición en un objeto
    var TipDocData = 
                  { 
                    id_tipo_documentos: req.param('id_tipo_documentos'), 
                    tipo_documento: req.param('tipo_documento'), 
                    iniciales_tipo_documento: req.param('iniciales_tipo_documento') 
                  };

    TipDocModel.updateTipDoc(TipDocData, function (error, data) 
    {
      //si el tipo de documeto se ha actualizado correctamente mostramos un mensaje
      if (data && data.msg) 
      {
        res.json(200, data);
      }
      else 
      {
        res.json(500, { "msg": "Error" });
      }
    });
  });

  //utilizamos el verbo delete para eliminar un tipo de documento
  router.delete("/tipdocmodel", function (req, res) 
  {
    //id del tipo de documento a eliminar
    var id = req.param('id_tipo_documentos');

    UserModel.deleteTipDoc(id, function (error, data) 
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
