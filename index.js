const http = require('http');
const dotenv = require('dotenv').config();
const dbConnect = require('./Config/DBconnect');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

dbConnect();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});