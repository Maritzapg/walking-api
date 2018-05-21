//obtenemos el modelo TipDocModel con toda la funcionalidad
var SerMascModel = require('../models/sermascmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la aplicación
module.exports = function () 
{
  
  //mostramos todos los tipos de documentos 
  router.get("/sermascmodel", function (req, res) 
  {
    
    //res.json(200,"LOL");
    SerMascModel.getSerMascs(function (error, data) 
    {
       //res.json(200, data);
       res.status(200).json(data);
     });
  });

  //mostramos todos los servicios de mascota agrupados
    router.get("/informeMascotaServicios", function (req, res)
    {

        //res.json(200,"LOL");
        SerMascModel.getInformeMascotaServicios(function (error, data)
        {
            //res.json(200, data);
            res.status(200).json(data);
        });
    });

  //obtiene un tipo de documento por su id
  router.get("/sermascmodel/:id", function (req, res)
  {
    //id del tipo de documento
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if (!isNaN(id)) 
    {
      SerMascModel.getSerMasc(id, function (error, data) 
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
  router.post("/sermascmodel", function (req, res) 
  {
    //creamos un objeto con los datos del tipo de documento
    var SerMascData = 
                  {
                    fecha_fin: req.body.fecha_fin,
                    fecha_inicio: req.body.fecha_inicio,
                    mascotas: req.body.mascotas,
                    servicios: req.body.servicios,
                    id_servicios_mascotas: null,
                  };

      SerMascModel.insertSerMasc(SerMascData, function (error, data) 
      {
        //si el tipo de documento se ha insertado correctamente mostramos su info
        if (data && data.insertId) 
        {
          res.redirect("/sermascmodel/" + data.insertId);
        }
        else 
        {
          res.json(500, { "msg": "Error" });
        }
      });
  });

  //función que usa el verbo  put para actualizar usuarios
  router.put("/sermascmodel", function (req, res) 
  {
    //almacenamos los datos de la petición en un objeto
    var SerMascData = 
                  { 
                    id_servicios_mascotas: req.param('id_servicios_mascotas'), 
                    fecha_fin: req.param('fecha_fin'), 
                    fecha_inicio: req.param('fecha_inicio'),
                    mascotas: req.param('mascotas'),
                    servicios: req.param('servicios') 
                  };

    SerMascModel.updateSerMasc(SerMascData, function (error, data) 
    {
      //si el tipo de documeto se ha actualizado correctamente mostramos un mensaje
      if (data && data.msg) 
      {
        //res.json(200, data);
        res.status(200).json(data)
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
  router.delete("/sermascmodel", function (req, res) 
  {
    //id del tipo de documento a eliminar
    var id = req.param('id_servicios_mascotas');

    UserModel.deleteSerMasc(id, function (error, data) 
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