const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{


    // console.log("request has been made from browser to server");
    // console.log(req.method);
    // console.log(req.url);

    //Lodash
    let num = _.random(0,20);
    console.log(num);

    let greet = _.once(() => {
        console.log("hello");
    });
    // because of lodash once function greet will run only once
    greet();
    greet();
    
    res.setHeader("Content-Type",'text/html');
    // res.write('<h1>hello,Pepcoders ! :) </h1>');
    // res.write('<h1>hello,Pepcoders 1! :) </h1>');
    // res.write('<h1>how you are doing! :) </h1>');
    // res.end();

    let path = 'views/';

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'About-us.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
        default:
            path += 'Four04.html'
            res.statusCode = 404;
            break;
    };

    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }else{
            // res.write(fileData);
            res.end(fileData);
        }
    });

});

//port number , host , callback func
server.listen(3000,'localhost',()=>{
    console.log("server is listening on port 3000");
});