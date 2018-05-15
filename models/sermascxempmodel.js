//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),

    //creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
    connection = mysql.createConnection
        (
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'walking'
        }
        );

//creamos un objeto para ir almacenando todo lo que necesitemos
var SerMascXempModel = {};

//obtenemos todos los tipos de documento
SerMascXempModel.getSerMascXemps = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM servicios_mascotas_por_empleado ORDER BY empleados', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//obtenemos un tipo doc por su id
SerMascXempModel.getSerMascXemp = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM servicios_mascotas_por_empleado WHERE id_servicios_mascota_por_empleado = ' + connection.escape(id);

        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//añadir un nuevo tipo de documento
SerMascXempModel.insertSerMascXemp = function (SerMascXempData, callback) {
    if (connection) {
        connection.query('INSERT INTO servicios_mascotas_por_empleado SET ?', SerMascXempData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                //devolvemos la última id insertada
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}

//actualizar un tipo de documento
SerMascXempModel.updateSerMascXemp = function (SerMascXempData, callback) {

    if (connection) {
        var sql = 'UPDATE servicios_mascotas_por_empleado SET empleados = ' + connection.escape(SerMascXempData.empleados) + ', ' +
            'servicios_mascotas = ' + connection.escape(SerMascXempData.servicios_mascotas) + ' ' + 
            'WHERE id_servicios_mascota_por_empleado = ' + SerMascXempData.id_servicios_mascota_por_empleado;

        connection.query(sql, function (error, result) {
            if (error) {
                console.log(sql)
                throw error;
            }
            else {
                callback(null, { "msg": "success" });
            }
        });
    }
}

//eliminar un tipo de documento pasando la id a eliminar
SerMascXempModel.deleteSerMascXemp = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM servicios_mascotas_por_empleado WHERE id_servicios_mascota_por_empleado = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM servicios_mascotas_por_empleado WHERE id_servicios_mascota_por_empleado = ' + connection.escape(id);

                connection.query(sql, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    else {
                        callback(null, { "msg": "deleted" });
                    }
                });
            }
            else {
                callback(null, { "msg": "notExist" });
            }
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = SerMascXempModel;