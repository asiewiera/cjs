import http from 'http';
import fs from 'fs';

const fsp = fs.promises;



const server =http.createServer((request,response)=>{
  //console.log('hello', request);

  console.log(request.url);

  if(request.url === '/cars') {
    if(request.method === 'GET') {

      return fsp.readFile('./data/cars.json', 'utf8')
        .then(jsonFile=>{
          console.log(jsonFile)
          response.writeHead(200, {contentType: 'application/json'});
          response.write(jsonFile)
          return response.end();
      })
      .catch(error=> {
        
        console.error('Error reading file', error);
        response.writeHead(404, {contentType: 'application/json'});
        response.write(JSON.stringify({message: 'file cannot be read'}));
        return response.end();

      })

      
    }

    if(request.method === 'POST') {
      console.log('post hello')
    }
  }

  response.writeHead(404, {contentType: 'application/json'});
  response.write(JSON.stringify({message: 'NOT FOUND'}));
  response.end();

});

server.listen(3005);

console.log('Web server is running on port 3005');

