#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const url = require('url');
const firstArgument = process.argv[2];
const secondArgument = process.argv[3];
const thirdArgument = process.argv[4];
var port = 3000;
var htmlDirectory = './src/html';


const logo = function(){
    logoString = `
 _____         _____    __________________   __________________    ______________   
|     |       |     |  |                  | |                  |  |   ________   | 
|     |       |     |  |______      ______| |______      ______|  |  |        |  |     
|     |_______|     |        |      |             |      |        |  |________|  |  
|                   |        |      |             |      |        |      ________|
|                   |        |      |             |      |        |     |                
|      _______      |        |      |             |      |        |     |           
|     |       |     |        |      |             |      |        |     |           
|     |       |     |        |      |             |      |        |     |           
|_____|       |_____|        |______|             |______|        |_____| v.1.0.0
                  `
        return logoString;
}

const checkIfhtmlDirectoryExists = function(){
    if(!fs.existsSync(htmlDirectory)){
        console.log(logo());
        console.log(`WARNING: The path to your html files, which is: \n ${htmlDirectory} \n does not exist, please enter a path that exists or create the directory ${htmlDirectory} in the current directory!`);
        console.log(`If you are running the server with the default values, \n the server will look in the current directory in the path './src/html'`)
        console.log('Please refer to the readme at https://github.com/IsmaelOmar/http-web-server')
        process.exit(0)
    }
}

if(firstArgument === 'runserver' && (secondArgument !== undefined || thirdArgument !== undefined)){
    checkIfhtmlDirectoryExists();
    console.log(logo());
    port= secondArgument;
    htmlDirectory=thirdArgument;

} else if(firstArgument === 'runserver' && (secondArgument === undefined || thirdArgument === undefined)){
    console.log(logo());
    console.log('WARNING: either port number or path to html files or both are undefined.')
    process.exit(0);

} else if(firstArgument === 'default'){
    checkIfhtmlDirectoryExists();
    console.log(logo())
    console.log('Running Server with default port and path to html file');

} else if (firstArgument === 'help' || firstArgument === undefined){
    console.log(logo());
    console.log('\n');
    console.log(`To start the http-web-server, please run one of the following commands:  
                
                http-web-server runserver [port-number] [path-to-html-files] - port number and path to html files have to be defined
    
                or
    
                http-web-server default - to run server with default port (3000) and path (./src/html)
                
                For help, run this command:
                
                http-web-server help
                
                or
                
                http-web-server \n`);

    process.exit(0)

}else {
    console.log(logo());
    console.log('\n')
    console.log(`The argument ${firstArgument} is not recognised! Please run http-web-server help to see all availble arguments \n`);
    process.exit(1);
}

const pathEditor = function(routePath){
    if(!routePath.includes(".html")){
        return routePath + '.html';
    } else {
        return routePath;
    }
}

const renderData = function(res,error, data){
    if(error){
        res.writeHead(404);
        res.write('404: Page Not Found')
    } else {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write(data);
    }
    res.end()
}
const server = http.createServer(function(req, res){

        const urlObject = url.parse(req.url);
        const htmlFile = htmlDirectory + pathEditor(urlObject.pathname);
        
        console.log('Location of HTML file  ------------------ ' + htmlFile)
        console.log('Path Entered into Browser ------------------ ' + urlObject.pathname)

        if(urlObject.pathname === '/'){
        fs.readFile(htmlDirectory + urlObject.pathname + 'index.html', function(error, data){
           renderData(res, error, data);
        });
    } else {
        fs.readFile(htmlFile, function(error, data){
            renderData(res, error, data);
        });
    }
})

server.listen(port, function(error){
    if(error){
        console.log('Something Went Wrong', error)
    } else {
        console.log(`HTTP Web Server Running! Listening on Port ${port} \n Go to localhost:${port}, to see your webpages`)
    }
})