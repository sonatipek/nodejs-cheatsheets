const fs = require('fs');


const routeHandler = (req, res) => {
    console.log("Status: " + res.statusCode); //statusCode of the outgoing reply can be retrieved
    console.log("URL: " + req.url, "\nMethod: " + req.method); //method information and url information of the incoming request can be retrieved.
    
    
    // ! Routing
    if (req.url === '/') { //home
        fs.readFile('index.html', (err, html) => {
            res.writeHead(200, "OK", {"Content-Type": "text/html"})
    
            res.write(html);
            res.write(`<p>${res.statusCode}</p>`)
            res.write(`<p><b>URL:</b> ${req.url}</p>`)
    
            res.end();
        });
    }
    else if(req.url === '/about') { //about
        fs.readFile('about.html', (err, html) => {
            res.writeHead(200, "OK", {"Content-Type": "text/html"})
            
            res.write(html);
            res.write(`<p>${res.statusCode}</p>`)
            res.write(`<p><b>URL:</b> ${req.url}</p>`)
    
            res.end();
        });
    }
    else if(req.url === '/contact' && req.method === "POST"){ //contact post method
        const data = [];

        req.on('data', (chunk) => {
            data.push(chunk);
        });

        req.on('end', _ => {
            const tempResult = Buffer.concat(data).toString();
            const result = tempResult.split('=')[1];

            fs.appendFile('contact.txt', result ,(err) => {
                if (err) {
                    console.log(err);
                }else{
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
    
                    res.end();
                }
            })
        });

    }
    else if(req.url === '/contact'){ //contact
        fs.readFile('contact.html', (err, html) => {
            res.writeHead(200, "OK", {"Content-Type": "text/html"});

            res.write(html);
            
            res.end();
        })
    }
    else{ //404
        fs.readFile('404.html', (err,html) => {
            res.writeHead(404, "Not Found", {"Content-Type": "text/html"})

            res.write(html);
            res.write(`<p>${res.statusCode}</p>`)
            res.write(`<p><b>URL:</b> ${req.url}</p>`)
            
            res.end();
        });
    }
    
};

module.exports = routeHandler;