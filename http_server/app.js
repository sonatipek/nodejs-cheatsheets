const http = require('http');
const routes = require('./routes');

const PORT = 3000, HOST = "localhost";

const server = http.createServer(routes)

// Listen port
server.listen(PORT, HOST);
console.log(`Server listening on  ${PORT}`);