const http = require('http');

var INTERVAL = process.argv[2] || 1000;
var TIME = process.argv[3] || 5000;

let clock;

async function consoleDateAndTime () {
  clock = setInterval(() => {
    console.log('Clock: ', new Date());
  }, INTERVAL);
}

function stopClock () {
  return new Promise(resolve => {
    setTimeout(() => {
      clearInterval(clock);
      resolve(new Date());
    }, TIME);
  });
}

async function serverHandler (request, response) {
  let result;
  if (request.method === 'GET' && request.url !== '/favicon.ico') {
    try {
      consoleDateAndTime();
      result = await stopClock();
    } catch (error) {
      console.error(error);
    }
  }
  response.end('Current Date: ' + result);
}
http.createServer(serverHandler).listen(3000);
