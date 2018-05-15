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
var EmpleadoModel = {};


//obtenemos todos los empleados
EmpleadoModel.getEmpleados = function (callback) {
    if (connection) {
        connection.query(
            'SELECT persona.id_personas as id, concat(persona.primer_nombre, " ", persona.segundo_nombre, " ", persona.primer_apellido, " ", persona.segundo_apellido) AS nombre , cargo.cargo ' + 
            'FROM empleados empleado, cargo cargo, personas persona ' + 
            'WHERE empleado.cargo = cargo.id_cargo ' +  
            'AND empleado.id_empleados = persona.id_personas ORDER BY cargo', function (error, rows) {
            //SELECT * FROM empleados ORDER BY cargo', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//obtiene un empleado por su id
EmpleadoModel.getEmpleado = function (id, callback) {
    if (connection) {
        var sql = 'SELECT persona.id_personas as id, concat(persona.primer_nombre, " ", persona.segundo_nombre, " ", persona.primer_apellido, " ", persona.segundo_apellido) AS nombre , cargo.cargo ' +
            'FROM empleados empleado, cargo cargo, personas persona ' +
            'WHERE empleado.cargo = cargo.id_cargo ' +
            'AND empleado.id_empleados = persona.id_personas AND empleado.id_empleados = ' + connection.escape(id);

            /*'SELECT * FROM empleados WHERE id_empleados = ' + connection.escape(id);*/

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
EmpleadoModel.insertEmpleado = function (EmpleadoData, callback) {
    if (connection) {
        connection.query('INSERT INTO empleados SET ?', EmpleadoData, function (error, result) {
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
EmpleadoModel.updateEmpleado = function (EmpleadoData, callback) {

    if (connection) {
        var sql = 'UPDATE empleados SET cargo = ' + connection.escape(EmpleadoData.cargo) +" "+
            'WHERE id_empleados = ' + EmpleadoData.id_empleados;

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
EmpleadoModel.deleteEmpleado = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM empleados WHERE id_empleados = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM empleados WHERE id_empleados = ' + connection.escape(id);

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
module.exports = EmpleadoModel;