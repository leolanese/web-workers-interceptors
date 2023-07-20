// runs in the background as a separate thread and intercepts network requests
// It can modify request headers by intercepting and cloning the request using the Fetch API 
// in the fetch event listener of the service worker.
self.addEventListener('fetch', event => {

  const modifiedHeaders = new Headers(event.request.headers);
  modifiedHeaders.set('X-Custom-Header-2', 'A value from service-worker');
  modifiedHeaders.set('X-Custom-Header-3', 'Another value from service-wroker');

  const modifiedRequest = new Request(event.request.url, {
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

});
