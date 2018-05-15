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
var ServicioModel = {};

//obtenemos todos los tipos de documento
ServicioModel.getServicios = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM servicios ORDER BY costo', function (error, rows) {
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
ServicioModel.getServicio = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM servicios WHERE id_servicios = ' + connection.escape(id);

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
ServicioModel.insertServicio = function (ServicioData, callback) {
    if (connection) {
        connection.query('INSERT INTO servicios SET ?', ServicioData, function (error, result) {
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

//actualizar un servicio
ServicioModel.updateServicio = function (ServicioData, callback) {

    if (connection) {
        var sql = 'UPDATE servicios SET costo = ' + connection.escape(ServicioData.costo) + ',' +
            'descripcion = ' + connection.escape(ServicioData.descripcion) + ',' +
            'is_active = ' + connection.escape(ServicioData.is_active) + ',' +
            'nombre = ' + connection.escape(ServicioData.nombre) + 
            'WHERE id_servicios = ' + ServicioData.id_servicios;

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "success" });
            }
        });
    }
}

//eliminar un tipo de documento pasando la id a eliminar
ServicioModel.deleteServicio = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM servicios WHERE id_servicios = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM servicios WHERE id_servicios = ' + connection.escape(id);

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
module.exports = ServicioModel;