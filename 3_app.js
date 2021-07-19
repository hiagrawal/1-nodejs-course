 // understanding import and export using multiple files
 //creating the server in one file and routes in another file
 //to run, type node app.js in terminal

//require is used for import and module.exports is used to export

const http = require('http');

//way 1 - here route will have the export which is requestHandler  function 
//way 2 - here route will be an object with exported 2 values
const route = require('./3_route');
 
//way 1 - when route will have the function
//const server = http.createServer(route);

//way 2 - when route will have the object
const server = http.createServer(route.handler);
console.log(route.someText);
console.log('testing nodemon if watching files and making changes without exiting application and restarting explicitely');

server.listen(3000);
