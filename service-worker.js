// runs in the background as a separate thread and intercepts network requests
// It can modify request headers by intercepting and cloning the request using the Fetch API 
// in the fetch event listener of the service worker.
self.addEventListener('fetch', event => {
  
  // WIP
  // if (event.request.url.includes('/post/')) {
    const modifiedHeaders = new Headers(event.request.headers);
    modifiedHeaders.set('X-Custom-Header-2', 'A value from service-worker');
    modifiedHeaders.set('X-Custom-Header-3', 'Another value from service-wroker');
    modifiedHeaders.set('X-Custom-Header-4', 'TO BE DELETED');

    // Delete a header
    modifiedHeaders.delete('X-Custom-Header-4');

    const modifiedRequest = new Request(event.request.url, {
      mode: 'cors',
      credentials: 'omit',
      headers: modifiedHeaders,
    });

    event.respondWith(
      fetch(modifiedRequest)
        .then(function(response) {
          console.log('Intercepted a fetch request => ', event.request.url);
          console.log('Request:', modifiedRequest); 
          console.log('Response:', response); 
          return response;
        })
        .catch(function() {
          return new Response("Failed to fetch");
        })
    );
  // }

});


self.addEventListener('message', event => {
  const { type, data } = event.data;
  if (type === 'clientMessage') {
    console.log('Message received in the service worker:', data);

    // hacemos algo con el contenido del mensaje
  }
});