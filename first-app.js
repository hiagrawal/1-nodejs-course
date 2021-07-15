
//to run type in terminal : node filename which here is : node first-app.js
//this will start executing the file
console.log("Hello from node js");

//creating file using node
const fs = require('fs'); //file system
fs.writeFileSync('Hello.txt','Hello from Nodejs 123'); //will create a file and write to it

//to run type in terminal : node filename which here is : node first-app.js
//this will start executing the file and create the server and start the same
//Now to get request, hit the url in the browser so the nodejs will listen to it and start executing the same

//creating server
const http = require('http');
const server = http.createServer((req,res) => { //this req is the request, nodejs generated for us to get all the data when user hits the url
    //console.log(req);
    console.log(req.url, req.method, req.headers); 
    //url is url after localhost 3000, method is get, and header is an object. Can ckeck all these in terminal
    //Try hitting http://localhost:3000/test

    //process.exit(); //do process.exit to stop the server

    //res indicates what response needs to be sent to the client
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Node js Page</title></head>');
    res.write('<body><h1>Hello from Node js server</h1></body>');
    res.write('<html>');
    res.end(); 
    // res.ends means response has been ended here and hence nodejs will sent it back to the client and hence no more response code should be written after it.
    //res.write('hi'); //this will give error since the res has ended
});
server.listen(3000); //3000 is the port on which creating server
//so when hit the server: http://localhost:3000, it will listen to it, get request and print the reuest.
//Server will keep on running till the time it has event registered. 
//In this, it is request, when user hit the page, it gets the request and hence will be running
//do process.exit to stop the server


//status code of 302 stands for redirection


