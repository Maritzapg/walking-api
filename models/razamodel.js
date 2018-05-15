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
var RazaModel = {};

//obtenemos todos los tipos de documento
RazaModel.getRazas = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM razas ORDER BY nombre', function (error, rows) {
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
RazaModel.getRaza = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM razas WHERE id_razas = ' + connection.escape(id);
        console.log("eee " + sql)
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
RazaModel.insertRaza = function (RazaData, callback) {
    if (connection) {
        connection.query('INSERT INTO razas SET ?', RazaData, function (error, result) {
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
RazaModel.updateRaza = function (RazaData, callback) {

    if (connection) {
        var sql = 'UPDATE razas SET nombre = ' + connection.escape(RazaData.nombre) +
            'WHERE id_razas = ' + RazaData.id_razas;

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
RazaModel.deleteRaza = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM razas WHERE id_razas = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM razas WHERE id_razas = ' + connection.escape(id);

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
module.exports = RazaModel;