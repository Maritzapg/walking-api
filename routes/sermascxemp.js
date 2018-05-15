//obtenemos el modelo TipDocModel con toda la funcionalidad
var SerMascXempModel = require('../models/sermascxempmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la aplicación
module.exports = function () 
{
  
  //mostramos todos los tipos de documentos 
  router.get("/sermascxempmodel", function (req, res) 
  {
    
    //res.json(200,"LOL");
    SerMascXempModel.getSerMascXemps(function (error, data) 
    {
       //res.json(200, data);
       res.status(200).json(data);
     });
  });

  //obtiene un tipo de documento por su id
  router.get("/sermascxempmodel/:id", function (req, res)
  {
    //id del tipo de documento
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if (!isNaN(id)) 
    {
      SerMascXempModel.getSerMascXemp(id, function (error, data) 
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
  router.post("/sermascxempmodel", function (req, res) 
  {
    //creamos un objeto con los datos del tipo de documento
    var SerMascXempData = 
                  {
                    id_servicios_mascota_por_empleado: null,
                    empleados: req.body.empleados,
                    servicios_mascotas: req.body.servicios_mascotas,
                  };

    SerMascXempModel.insertSerMascXemp(SerMascXempData, function (error, data) 
      {
        //si el tipo de documento se ha insertado correctamente mostramos su info
        if (data && data.insertId) 
        {
          res.redirect("/sermascxempmodel/" + data.insertId);
        }
        else 
        {
          res.json(500, { "msg": "Error" });
        }
      });
  });

  //función que usa el verbo  put para actualizar usuarios
  router.put("/sermascxempmodel", function (req, res) 
  {
    //almacenamos los datos de la petición en un objeto
    var SerMascXempData = 
                  { 
                    id_servicios_mascota_por_empleado: req.param('id_servicios_mascota_por_empleado'), 
                    empleados: req.param('empleados'), 
                    servicios_mascotas: req.param('servicios_mascotas') 
                  };

    SerMascXempModel.updateSerMascXemp(SerMascXempData, function (error, data) 
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
  router.delete("/sermascxempmodel", function (req, res) 
  {
    //id del tipo de documento a eliminar
    var id = req.param('id_tipo_documentos');

    UserModel.deleteSerMascXemp(id, function (error, data) 
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