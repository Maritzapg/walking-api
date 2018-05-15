//obtenemos el modelo TipDocModel con toda la funcionalidad
var ServicioModel = require('../models/serviciomodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la aplicación
module.exports = function () 
{
  
  //mostramos todos los tipos de documentos 
  router.get("/serviciomodel", function (req, res) 
  {
    
    //res.json(200,"LOL");
    ServicioModel.getServicios(function (error, data) 
    {
       //res.json(200, data);
       res.status(200).json(data);
     });
  });

  //obtiene un tipo de documento por su id
  router.get("/serviciomodel/:id", function (req, res)
  {
    //id del tipo de documento
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if (!isNaN(id)) 
    {
      ServicioModel.getServicio(id, function (error, data) 
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
  router.post("/serviciomodel", function (req, res) 
  {
    //creamos un objeto con los datos del servicio
    var ServicioData = 
                  {
                    id_servicios: null,
                    costo: req.body.costo,
                    descripcion: req.body.descripcion,
                    is_active: req.body.is_active,
                    nombre: req.body.nombre,
                  };

      ServicioModel.insertServicio(ServicioData, function (error, data) 
      {
        //si el servicio se ha insertado correctamente mostramos su info
        if (data && data.insertId) 
        {
          res.redirect("/serviciomodel/" + data.insertId);
        }
        else 
        {
          res.json(500, { "msg": "Error" });
        }
      });
  });

  //función que usa el verbo  put para actualizar el servicio
  router.put("/serviciomodel", function (req, res) 
  {
    //almacenamos los datos de la petición en un objeto
    var ServicioData = 
                  { 
                    id_servicios: req.param('id_servicios'), 
                    costo: req.param('costo'), 
                    descripcion: req.param('descripcion'),
                    is_active: req.param('is_active'),
                    nombre: req.param('nombre')
                  };

    ServicioModel.updateServicio(ServicioData, function (error, data) 
    {
      //si el servicio se ha actualizado correctamente mostramos un mensaje
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
  router.delete("/serviciomodel", function (req, res) 
  {
    //id del tipo de documento a eliminar
    var id = req.param('id_servicios');

    UserModel.deleteServicio(id, function (error, data) 
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