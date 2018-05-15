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
var PersonaModel = {};

//obtenemos todos los tipos de documento
PersonaModel.getPersonas = function (callback) {
    if (connection) {
        connection.query('SELECT persona.id_personas, tipoDoc.tipo_documento, persona.numero_documento, persona.primer_nombre, persona.primer_apellido, persona.segundo_nombre, persona.segundo_apellido \n' +
            'FROM personas persona, tipo_documentos tipoDoc \n' +
            'WHERE persona.tipo_documento=tipoDoc.id_tipo_documentos', function (error, rows) {

            /*'SELECT * FROM personas ORDER BY tipo_documento', function (error, rows) {*/
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
PersonaModel.getPersona = function (id, callback) {
    if (connection) {
        var sql = 'SELECT persona.id_personas, tipoDoc.tipo_documento, persona.numero_documento, persona.primer_nombre, persona.primer_apellido, persona.segundo_nombre, persona.segundo_apellido \n' +
            'FROM personas persona, tipo_documentos tipoDoc \n' +
            'WHERE persona.tipo_documento=tipoDoc.id_tipo_documentos and persona.id_personas = ' + connection.escape(id);

            /*'SELECT * FROM personas WHERE id_personas = ' + connection.escape(id);*/

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
PersonaModel.insertPersona = function (PersonaData, callback) {
    if (connection) {
        connection.query('INSERT INTO personas SET ?', PersonaData, function (error, result) {
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

//actualizar una persona
PersonaModel.updatePersona = function (PersonaData, callback) {

    if (connection) {
        var sql = 'UPDATE personas SET tipo_documento = ' + connection.escape(PersonaData.tipo_documento) + ',' +
            'numero_documento = ' + connection.escape(PersonaData.numero_documento) + ',' +
            'primer_nombre = ' + connection.escape(PersonaData.primer_nombre) + ',' +
            'primer_apellido = ' + connection.escape(PersonaData.primer_apellido) + ',' +
            'segundo_nombre = ' + connection.escape(PersonaData.segundo_nombre) + ',' +
            'segundo_apellido = ' + connection.escape(PersonaData.segundo_apellido) +
            'WHERE id_personas = ' + PersonaData.id_personas;

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
PersonaModel.deletePersona = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM personas WHERE id_personas = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM personas WHERE id_personas = ' + connection.escape(id);

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
module.exports = PersonaModel;