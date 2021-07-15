
//creating a server, getting hit in request, 
//sending a html button form in response, 
//getting the input data in request 
//and saving the input data in another file

const fs = require('fs');
const http = require('http');
const server = http.createServer((req,res) => {
  if(req.url=== '/'){
      res.write('<html>');
      res.write('<head><title>Learning Responses in Nodejs</title></head>');
      res.write('<body><form action="/messages" method="POST"><input type="text" name="inputTxt"></input><button>Submit</button></form></body>');
      res.write('</html>');
      res.end();
  }
  if(req.url === '/messages'){

    //Node takes the input data in chunks (stream of data) and keep taking till there is data and stops when there is no data
    //streaming of data is good concept since in real time we will have a lot of data and we can start working on them since we get chunks
    //else will have to wait for the entire parsed data to start working on the request data
    //Although we can work on chunks, we need the entire data. For that we have buffer
    //buffer allows to work on chunks of data 

    //for this, we have 'on' method (event listener) which allows to listen to events, 
    //here we want to listen to 'data' event whenever new data is received (which is a new chunk)
      const data = [];
      req.on('data', (chunks) => {
        console.log(chunks);
        data.push(chunks);
      });

      //another we have 'end' event  
      //this will be fired once node js is done parsing the incoming data request
      //to interact with chunks, we have buffer object which allows to work on chunks of data 
      req.on('end',() =>{
        const parsedData = Buffer.concat(data).toString();
        console.log(parsedData);
        const msg = parsedData.split('=')[1];

        //we have 2 methods here: writeFile and writeFileSync. 
        //writeFileSync means it is a synchronous method and hence next execution should not be done once it is finished writing
        //which is obviously not recommended bcz if file size is large, the process becomes slow
        //hence writeFile is always the recommended one
        //it has 2 advantages: 1. it runs asynchronoously, would not block executing the next line
        //2. and very important, it offers callback function also, so if there is any code which needs to be executed after file has finished writing
        //move it to the callback function

        //so instead of this
        // fs.writeFileSync('Input_Text', msg);
        // res.statusCode ='302';
        // res.setHeader('Location', '/');
        // res.end();

        //write this
        fs.writeFile('Input_Text', msg, (err) => {
            res.statusCode ='302';
            res.setHeader('Location', '/');
            res.end();
        });
   
      });

      //node js runs code asynchronously which is obviously the need because we cant stop executing the next line if prev call is not finished
      //so in this case, it will start executing below lines and change the location even before data is being saved in file.
      //since it will execute 'end' event only after nodejs has finished parsing the data and meanwhile move to executing the new line
      //so if wants redirection to happen only after data is being saved then move it to end listener
      
       //  fs.writeFileSync('Input_Text', msg);
       //  res.statusCode ='302';
       //  res.setHeader('Location', '/');
      //   res.end();

      console.log('called before parsed data');
  }
});
server.listen(3000);
