 // understanding import and export using multiple files
 //creating the server in one file and routes in another file

//require is used for import and module.exports is used to export

const http = require('http');

//way 1 - here route will have the export which is requestHandler  function 
//way 2 - here route will be an object with exported 2 values
const route = require('./route');
 
//way 1 - when route will have the function
//const server = http.createServer(route);

//way 2 - when route will have the object
const server = http.createServer(route.handler);
console.log(route.someText);

server.listen(3000);
