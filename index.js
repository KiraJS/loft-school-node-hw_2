const http = require('http');

var INTERVAL = process.argv[2] || 1000;
var TIME = process.argv[3] || 5000;
let clock;

async function consoleDateAndTime () {
  clock = setInterval(function () {
    console.log('Clock: ', new Date());
  }, INTERVAL);
  clock();
}

async function stopClock () {
  await setTimeout(function () {
    console.log('stopClock1');
    return clearInterval(clock);
  }, TIME);
  console.log('stopClock2'); /// ???? не отрабатывает
  return new Date();
}

async function serverHandler (request, response) {
  let result;
  if (request.method === 'GET' && request.url !== '/favicon.ico') {
    try {
      consoleDateAndTime();
      result = await stopClock();
      console.log('Current Date: ', result);
    } catch (error) {
      console.error(error);
    }
  }
  response.end('response');
}
http.createServer(serverHandler).listen(3000);
