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
var CargoModel = {};

//obtenemos todos los tipos de documento
CargoModel.getCargos = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM cargo ORDER BY cargo', function (error, rows) {
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
CargoModel.getCargo = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM cargo WHERE id_cargo = ' + connection.escape(id);

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
CargoModel.insertCargo = function (CargoData, callback) {
    if (connection) {
        connection.query('INSERT INTO cargo SET ?', CargoData, function (error, result) {
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


//actualizar un cargo
CargoModel.updateCargo = function (CargoData, callback) {

    if (connection) {
        console.log('este es el id ' + CargoData.id_cargo)
        console.log('este es el cargo ' + CargoData.cargo)
        var sql = 'UPDATE cargo SET cargo = ' + connection.escape(CargoData.cargo) +
            'WHERE id_cargo = ' + CargoData.id_cargo;

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
CargoModel.deleteCargo = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM cargo WHERE id_cargo = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM cargo WHERE id_cargo = ' + connection.escape(id);

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
module.exports = CargoModel;