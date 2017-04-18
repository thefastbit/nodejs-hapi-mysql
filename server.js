'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi = require('joi');

// Create a server with a host and port
const server = new Hapi.Server();

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '1234admP',
     database: 'sistema'
});

server.connection({
    host: 'localhost',
    port: 8080
});

connection.connect();

server.start((err) => {
   if (err) {
     throw err;
   }
  console.log('Server running at:', server.info.uri);
});




// Add the route
server.route({
    method: 'GET',
    path:'/test', 
    handler: function (request, reply) {
    return reply('OK');
}
});



server.route({
    method: 'GET',
    path: '/getallusers',
    handler: function (request, reply) {
       connection.query('SELECT * FROM sistema.empleados',
       function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  }
});






server.route
({

    method: 'GET',
    path: '/getuser/{uid}',

    config: {
        validate: {
           params: {
             uid: Joi.number().integer().required()
           }
        }    
     },

    handler: function (request, reply) 
  {
     const uid = request.params.uid;
     connection.query('SELECT * FROM empleados WHERE idempleado = "' + uid + '"',
     function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  
  } 

});



server.route
({

    method: 'DELETE',
    path: '/removeuser/{uid}',

    config: {
        validate: {
           params: {
             uid: Joi.number().integer().required()
           }
        }    
     },

    handler: function (request, reply) 
  {
     const uid = request.params.uid;
     connection.query('DELETE FROM empleados WHERE idempleado = "' + uid + '"',
     function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  
  } 

});


























/*

server.route({  
    method: 'POST',
    path: '/createuser',
    handler: function (request, reply) {



      var post = {nombre:palyloadData .nombre, clave:palyloadData .clave, estado:palyloadData .estado, iddepartamento:palyloadData .iddepartamento };
      
      db.connection.query(
      
          'INSERT INTO empleados set?',post,
      
          function(err, rows) {
                                       reply([{

                                               statusCode: 200,

                                               message: 'Inserted successfully',

                                           }]);
      
            if(err) {
      
              throw new Error(err)
      
            }
      
          }
      
        )     

    config: {
        validate: {
            payload: {
                nombre: Joi.string().min(8).max(45).required(),
                clave: Joi.string().min(8).max(15).required(),
                estado: Joi.number().required(),
                iddepartamento: Joi.number().required()
            }
        }
    }
};


*/



































