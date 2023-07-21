const sessionId='test-session-id';

self.addEventListener('fetch', event => {
  // if (event.request.url.includes('/services/login-service/v1/login')) {   
  //   console.log('login request');
  //   event.respondWith(
  //     fetch(event.request)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         sessionId = data['sessionId'];
  
  //         // }
  //       })
  //       .catch(function() {
  //         // if 401 send event to main.js and remove sessionId if exist
  //         return new Response("Failed to fetch");
  //       })
  //   );
  // } 
  
  if (event.request.url.includes('/services/')) {
    const modifiedHeaders = new Headers(event.request.headers);

    if (!!sessionId) {
      modifiedHeaders.set('sessionId', sessionId);
    }

    const modifiedRequest = new Request(event.request.url, {
      mode: 'cors',
      credentials: 'omit',
      headers: modifiedHeaders,
    });

    event.respondWith(handleFetchWithSession(modifiedRequest));

    }
});

const handleFetchWithSession = (request) => {
    return fetch(request)
        .then(response => {
        console.log('response status:', response.status);
        
        if (response.status === 403 && !!sessionId) {
            console.log('403 = credentials invalid');

            // Send event to Main.js to delete sessionId
            event.waitUntil(
                (async () => {
                    const clientId =
                    event.resultingClientId !== ""
                        ? event.resultingClientId
                        : event.clientId;
                    const client = await self.clients.get(clientId);
                
                    console.log("service worker: postMessage = " + sessionId);
                    client.postMessage('403');
                })()
            );
        }
        
        console.log('Intercepted a fetch request => ', request.url);
        console.log('Request =>', request);
        console.log('Response: =>', response);

        return response;
    })
        .catch(() => {
            return new Response("Failed to fetch");
    });
}

// Get sessionID and put it as header
// if response is 401 --> send event to main.js and remove sessionId if exist

onmessage = (e) => {
  console.log('Worker: Message received from main script = ' +  e.data[0]);
 
  postMessage('Inside Interceptor and gooooo');

}