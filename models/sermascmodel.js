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
var SerMascModel = {};

//obtiene todos los servicios de una mascota
SerMascModel.getSerMascs = function (callback) {
    if (connection) {
        connection.query('SELECT servicio_mascota.id_servicios_mascotas AS id, mascota.nombre, servicio.nombre as servicio, ' +
            'servicio_mascota.fecha_inicio, servicio_mascota.fecha_fin \n' +
            'FROM servicios_mascotas servicio_mascota, mascotas mascota, servicios servicio \n' +
            'WHERE servicio_mascota.mascotas = mascota.id_mascotas AND ' +
            'servicio_mascota.servicios = servicio.id_servicios', function (error, rows) {

            /*'SELECT * FROM servicios_mascotas ORDER BY fecha_fin', function (error, rows) {*/
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

//obtiene el informe de servicios de una mascota
SerMascModel.getInformeMascotasServicios = function (callback) {

    if (connection) {

        connection.query('SELECT  servicios_mascotas.id_servicios_mascotas,\n' +
            '\tservicios_mascotas.fecha_inicio, \n' +
            '\tservicios_mascotas.fecha_fin,\n' +
            '        \n' +
            '\tmascotas.id_mascotas, \n' +
            '\tmascotas.nombre, \n' +
            '        (SELECT nombre\n' +
            '\t  FROM razas\n' +
            '          WHERE id_razas = razas) AS raza,\n' +
            '          mascotas.sexo,\n' +
            '          \n' +
            '        tipo_documentos.tipo_documento,\n' +
            '        personas.numero_documento, \n' +
            '        concat(personas.primer_nombre,\' \',personas.segundo_nombre,\' \',' +
            '        personas.primer_apellido,\' \', personas.segundo_apellido) AS propietario, \n' +
            '         \n' +
            '        servicios.nombre as servicio,\n' +
            '        servicios.costo, \n' +
            '        servicios.descripcion\n' +
            '\n' +
            'FROM servicios_mascotas \n' +
            '\tINNER JOIN (mascotas\n' +
            '        \tINNER JOIN (personas\n' +
            '\t\t\tINNER JOIN tipo_documentos ON personas.tipo_documento = tipo_documentos.id_tipo_documentos) ON mascotas.propietarios = personas.id_personas) ON servicios_mascotas.mascotas = mascotas.id_mascotas\n' +
            '        INNER JOIN servicios ON servicios.id_servicios = servicios_mascotas.servicios', function (error, rows) {

        /*connection.query('SELECT mascota.id_mascotas AS id, mascota.nombre, concat(persona.primer_nombre,\' \',persona.segundo_nombre,\' \',' +
            'persona.primer_apellido,\' \', persona.segundo_apellido) AS propietario, raza.nombre AS raza, mascota.sexo \n' +
            'FROM mascotas mascota, personas persona, razas raza \n' +
            'WHERE mascota.propietarios = persona.id_personas AND mascota.razas=raza.id_razas ORDER BY mascota.id_mascotas', function (error, rows) {
*/
            if (error) {
                throw error;
            }
            else {
                /*var mascotas = [];
                //console.log(rows);
                mascotas = rows;
                var sqlServices;
                for(var i = 0; i < mascotas.length; i++)
                {
                    (function(i){
                    sqlServices = 'SELECT servicio_mascota.id_servicios_mascotas AS id, mascota.nombre, ' +
                        'mascota.id_mascotas as mascota_id, servicio.nombre as servicio, ' +
                        'servicio_mascota.fecha_inicio, servicio_mascota.fecha_fin \n' +
                        'FROM servicios_mascotas servicio_mascota, mascotas mascota, servicios servicio \n' +
                        'WHERE servicio_mascota.mascotas = mascota.id_mascotas AND ' +
                        'servicio_mascota.servicios = servicio.id_servicios AND ' +
                        'mascota.id_mascotas = ' + mascotas[i].id;

                    connection.query(sqlServices, function (error, rowsServices) {
                        if (error) {
                            throw error;
                        }
                        else {
                            mascotas[i].services = rowsServices
                            console.log(mascotas[i])
                        }
                    });
                    }(i));
                }
                console.log('---------------------------------------------------')
                console.log(mascotas)*/
                callback(null, rows);
            }
        });
    }
}

//obtenemos un servicio x mascota por su id
SerMascModel.getInformeMascotaServicios = function (id, callback) {
    if (connection) {
        var sql = 'SELECT  servicios_mascotas.id_servicios_mascotas,\n' +
            '\tservicios_mascotas.fecha_inicio, \n' +
            '\tservicios_mascotas.fecha_fin,\n' +
            '        \n' +
            '\tmascotas.id_mascotas, \n' +
            '\tmascotas.nombre, \n' +
            '        (SELECT nombre\n' +
            '\t  FROM razas\n' +
            '          WHERE id_razas = razas) AS raza,\n' +
            '          mascotas.sexo,\n' +
            '          \n' +
            '        tipo_documentos.tipo_documento,\n' +
            '        personas.numero_documento, \n' +
            '        concat(personas.primer_nombre,\' \',personas.segundo_nombre,\' \',' +
            '        personas.primer_apellido,\' \', personas.segundo_apellido) AS propietario, \n' +
            '         \n' +
            '        servicios.nombre as servicio,\n' +
            '        servicios.costo, \n' +
            '        servicios.descripcion\n' +
            '\n' +
            'FROM servicios_mascotas \n' +
            '\tINNER JOIN (mascotas\n' +
            '        \tINNER JOIN (personas\n' +
            '\t\t\tINNER JOIN tipo_documentos ON personas.tipo_documento = tipo_documentos.id_tipo_documentos) ON mascotas.propietarios = personas.id_personas) ON servicios_mascotas.mascotas = mascotas.id_mascotas\n' +
            '        INNER JOIN servicios ON servicios.id_servicios = servicios_mascotas.servicios WHERE mascotas.id_mascotas = '+ connection.escape(id);

        /*'SELECT * FROM servicios_mascotas WHERE id_servicios_mascotas = ' + connection.escape(id);*/

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

//obtenemos un servicio x mascota por su id
SerMascModel.getSerMasc = function (id, callback) {
    if (connection) {
        var sql = 'SELECT servicio_mascota.id_servicios_mascotas AS id, mascota.nombre, servicio.nombre as servicio, ' +
            'servicio_mascota.fecha_inicio, servicio_mascota.fecha_fin \n' +
            'FROM servicios_mascotas servicio_mascota, mascotas mascota, servicios servicio \n' +
            'WHERE servicio_mascota.mascotas = mascota.id_mascotas AND ' +
            'servicio_mascota.servicios = servicio.id_servicios AND ' +
            'servicio_mascota.id_servicios_mascotas = '+ connection.escape(id);

            /*'SELECT * FROM servicios_mascotas WHERE id_servicios_mascotas = ' + connection.escape(id);*/

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

//añadir un nuevo servicio x mascota
SerMascModel.insertSerMasc = function (SerMascData, callback) {
    if (connection) {
        connection.query('INSERT INTO servicios_mascotas SET ?', SerMascData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                //devolvemos el última id insertado
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}

//actualizar un servicio por mascota
SerMascModel.updateSerMasc = function (SerMascData, callback) {

    if (connection) {
        var sql = 'UPDATE servicios_mascotas SET fecha_fin = ' + connection.escape(SerMascData.fecha_fin) + ',' +
            'fecha_inicio = ' + connection.escape(SerMascData.fecha_inicio) + ',' +
            'mascotas = ' + connection.escape(SerMascData.mascotas) + ',' +
            'servicios = ' + connection.escape(SerMascData.servicios) + ' ' +
            'WHERE id_servicios_mascotas = ' + SerMascData.id_servicios_mascotas;

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
SerMascModel.deleteSerMasc = function (id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM servicios_mascotas WHERE id_servicios_mascotas = ' + connection.escape(id);

        connection.query(sqlExists, function (err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM servicios_mascotas WHERE id_servicios_mascotas = ' + connection.escape(id);

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
module.exports = SerMascModel;