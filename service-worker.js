// worker Script running on background thread as the web worker 
// It intercepts fetch requests + modifies headers + responds to the main thread with the intercepted data using postMessage()
self.addEventListener('fetch', event => {
  
  // WIP
  if (event.request.url.includes('/post/')) {
    const modifiedHeaders = new Headers(event.request.headers);
    modifiedHeaders.set('X-Custom-Header-2', 'Value-2 from service-worker');
    modifiedHeaders.set('X-Custom-Header-3', 'Value-3 from service-wroker');
    modifiedHeaders.set('X-Custom-Header-4', 'TO BE DELETED');

    // Delete a header
    modifiedHeaders.delete('X-Custom-Header-4');

    const modifiedRequest = new Request(event.request.url, {
      mode: 'cors',
      credentials: 'omit',
      headers: modifiedHeaders,
    });

  //  event.respondWith(
  //    ..
  //  );
  }

});


self.addEventListener('message', event => {
  const { type, data } = event.data;
  if (type === 'clientMessage') {
    console.log('Message received in the service worker:', data);

    //TODO: Handle the {response} content
  }
});
