const net = require('net');
const socketPath = 'logger.sock'; // Update this with your server's Unix socket path

const client = net.createConnection(socketPath);

client.on('connect', () => {
  console.log('Connected to Unix domain server');

  // Send data to the server
  client.write('Hello from the client!');
  client.write('Logger mesage' + JSON.stringify({name: 'tsemach'}));
});

client.on('data', (data) => {
  console.log('Received data from server:', data.toString());
  client.write('Hello from the client!');
});


client.on('end', () => {
  console.log('Disconnected from Unix domain server');
});

client.on('error', (err) => {
  console.error('Error:', err);
});

