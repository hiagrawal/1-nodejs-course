
const fs = require('fs');

const requestHandler = (req, res) => {
    if(req.url=== '/'){
        res.write('<html>');
        res.write('<head><title>Learning Responses in Nodejs</title></head>');
        res.write('<body><form action="/messages" method="POST"><input type="text" name="inputTxt"></input><button>Submit</button></form></body>');
        res.write('</html>');
        res.end();
    }
    if(req.url === '/messages'){

        const data = [];
        req.on('data', (chunks) => {
        console.log(chunks);
        data.push(chunks);
        });

        req.on('end',() =>{
        const parsedData = Buffer.concat(data).toString();
        console.log(parsedData);
        const msg = parsedData.split('=')[1];

        fs.writeFile('Input_Text', msg, (err) => {
            res.statusCode ='302';
            res.setHeader('Location', '/');
            res.end();
        });
    
        });

        console.log('In Routes file');
    }
}

//Way 1 - handler is a constant which holds the function 
//module.exports = requestHandler;

//Way 2 - when mutiple exports then exporting object which key value pair
module.exports = {
    handler: requestHandler,
    someText: "Some hard coded text"
}

// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

// exports.handler = requestHandler;
// exports.someText = "Some hard coded text";