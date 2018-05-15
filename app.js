var express = require('express');
var cookieParser = require('cookie-parser');
var tipdocs = require('./routes/tipdocs');
var cargo = require('./routes/cargo');
var raza = require('./routes/raza');
var empleado = require('./routes/empleado');
var servicio = require('./routes/servicio');
var mascota = require('./routes/mascota');
var persona = require('./routes/persona');
var serviciosMascota = require('./routes/sermasc');
var serviciosMascotaEmpleado = require('./routes/sermascxemp');

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser'), port = 3001;
var app = express();

// todos los entornos
app.set('port', process.env.PORT || port);

app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use('/documento', tipdocs());
app.use('/cargo', cargo());
app.use('/raza', raza());
app.use('/servicio', servicio());
app.use('/empleado', empleado());
app.use('/mascota', mascota());
app.use('/persona', persona());
app.use('/serviciosMascota', serviciosMascota());
app.use('/serviciosMascotaEmpleado', serviciosMascotaEmpleado());

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;



/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'walking',
    port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
connection.end();*/