const worker = new Worker('worker.js');

worker.onmessage = function(event) {
  if (event.data.error) {
    console.error('Error en el worker:', event.data.error);
  } else {
    console.log('Datos recibidos del worker:', event.data);
  }
};

worker.onerror = function(event) {
  console.error('Error en el worker:', event.message);
};

// start thge request worker
worker.postMessage({
  url: 'https://jsonplaceholder.typicode.com/posts/1',
});
console.log('Message posted to worker');

