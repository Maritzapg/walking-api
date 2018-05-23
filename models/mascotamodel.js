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
var MascotaModel = {};

//Obtiene todas las mascotas
MascotaModel.getMascotas = function (callback) {
    if (connection) {
        connection.query('SELECT mascota.id_mascotas AS id, mascota.nombre, persona.id_personas as id_propietario, concat(persona.primer_nombre,\' \',persona.segundo_nombre,\' \',' +
            'persona.primer_apellido,\' \', persona.segundo_apellido) AS propietario, raza.nombre AS raza, mascota.sexo \n' +
            'FROM mascotas mascota, personas persona, razas raza \n' +
            'WHERE mascota.propietarios = persona.id_personas AND mascota.razas=raza.id_razas ORDER BY mascota.id_mascotas', function (error, rows) {


            /*'SELECT * FROM mascotas ORDER BY nombre', function (error, rows) {*/
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//obtiene una mascota dado su id
MascotaModel.getMascota = function (id, callback) {
    if (connection) {
        var sql = 'SELECT mascota.id_mascotas AS id, mascota.nombre, persona.id_personas as id_propietario, concat(persona.primer_nombre,\' \',persona.segundo_nombre,\' \',' +
            'persona.primer_apellido,\' \', persona.segundo_apellido) AS propietario, raza.nombre AS raza, mascota.sexo \n' +
            'FROM mascotas mascota, personas persona, razas raza \n' +
            'WHERE mascota.propietarios = persona.id_personas AND mascota.razas=raza.id_razas AND mascota.id_mascotas = ' + connection.escape(id);

            /*'SELECT * FROM mascotas WHERE id_mascotas = ' + connection.escape(id);*/

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

//añadir una nueva mascota
MascotaModel.insertMascota = function (MascotaData, callback) {
    if (connection) {
        connection.query('INSERT INTO mascotas SET ?', MascotaData, function (error, result) {
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

//actualizar una mascota
MascotaModel.updateMascota = function (MascotaData, callback) {

    if (connection) {
        var sql = 'UPDATE mascotas SET nombre = ' + connection.escape(MascotaData.nombre) + ',' +
            'propietarios = ' + connection.escape(MascotaData.propietarios) + ',' +
            'razas = ' + connection.escape(MascotaData.razas) + ',' +
            'sexo = ' + connection.escape(MascotaData.sexo) +
            'WHERE id_mascotas = ' + MascotaData.id_mascotas;

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

//eliminar una mascota pasando el id a eliminar
MascotaModel.deleteMascota = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM mascotas WHERE id_mascotas = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM mascotas WHERE id_mascotas = ' + connection.escape(id);

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
module.exports = MascotaModel;