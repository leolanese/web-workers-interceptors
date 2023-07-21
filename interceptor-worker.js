const sessionId='test-session-id';

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/services/login-service/v1/login')) {   
    console.log('login request');
    event.respondWith(
      fetch(event.request)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          sessionId = data['sessionId'];
        })
        .catch(function() {
          return new Response("Failed to fetch");
        })
    );
  } else if (event.request.url.includes('/services/')) {
    const modifiedHeaders = new Headers(event.request.headers);

    if (!!sessionId) {
      modifiedHeaders.set('sessionId', sessionId);
    }

    const modifiedRequest = new Request(event.request.url, {
      mode: 'cors',
      credentials: 'omit',
      headers: modifiedHeaders,
    });

    event.respondWith(handleFetchWithSession(event, modifiedRequest));
  }
});

function handleFetchWithSession(event, request) {
  return fetch(request)
    .then(response => {      
      if (response.status === 403 && !!sessionId) {
        event.waitUntil(
          (async () => {
            const clientId =
              event.resultingClientId !== ""
                  ? event.resultingClientId
                  : event.clientId;
            const client = await self.clients.get(clientId);        
            client.postMessage('403');
          })()
        );
      }
      return response;
    })
    .catch(function() {
      return new Response("Failed to fetch");
    });
}