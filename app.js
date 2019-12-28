#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2];

const server = http.createServer(function(req, res){

        const urlObject = url.parse(req.url);
        const htmlFile = './src/html' + urlObject.pathname + '.html';
        
        console.log(urlObject.pathname)

        if(urlObject.pathname === '/'){
        fs.readFile('./src/html/index.html', function(error, data){
            if(error){
                res.writeHead(404);
                res.write('404: Page Not Found')
            } else {
                res.writeHead(200, {'Content-type': 'text/html'})
                res.write(data);
            }
            res.end()
        })
    } else {
        fs.readFile(htmlFile, function(error, data){
            if(error){
                res.writeHead(404);
                res.write('404: Page Not Found');
            } else {
                res.writeHead(200, {'Content-type':'text/html'})
                res.write(data);
            }
            res.end();
        });
    }
})

server.listen(port, function(error){
    if(error){
        console.log('Something Went Wrong', error)
    } else {
        console.log(`Web Server Running! Listening on Port ${port} \n Go to localhost:${port}, to see your webpages`)
    }
})