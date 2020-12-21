import {createSocket, Socket} from 'dgram';

const serverSocket : Socket = createSocket('udp4');

export function initSocket() {
  
  console.log("initializing socket");

  serverSocket.on('error', (err) => {
    console.log(`serverSocket error:\n${err.stack}`);
    serverSocket.close();
  });

  serverSocket.on('message', (msg, rinfo) => {
    console.log(`serverSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });

  serverSocket.on('listening', () => {
    const address = serverSocket.address();
    console.log(`serverSocket listening ${address.address}:${address.port}`);
  });

  serverSocket.bind(25565);
}

export function doListen() {
  console.log("inside doListen() function");
  
}

export function doSend() {
  console.log("Started doSend()")
}

initSocket();