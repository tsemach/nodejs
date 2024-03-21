import net from 'net';
const unixSocketServer = net.createServer();

unixSocketServer.listen('logger.sock', () => {
  console.log('now listening');
});

unixSocketServer.on('connection', (s) => {
  console.log('got connection!');
  s.write('hello world');
  s.on("data", (data) => {
    console.log('sss', data.toString("utf-8"));
  });
  // s.end();
});

unixSocketServer.on('data', (data) => {
  console.log('server got data:', data);  
});
