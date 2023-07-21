// main thread web application
// registers the service worker + handles the communication with the worker
const test = document.cookie || 'default';

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {

          console.log('ServiceWorker scope => ', registration.scope);

          // fetch('http://localhost:3000/services/login-service/v1/login', {
          //     method: 'POST',
          //     body: JSON.stringify({username:'demo@4null.com',password:'Testing1'}),
          //     headers: {'Content-Type': 'application/json'}
          // })
          // .then(response => response.json())
          // .then(json => console.log('Fetch response', json));

          // unregister manually
          // document.getElementById('unregisterButton').addEventListener('click', () => {
          //   registration.unregister().then(function(success) {
          //     console.log('Service worker unregistered', success);
          //   }).catch(function(error) {
          //     console.log('Service worker unregisteration error', error);
          //   });
          // });  

    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });

  // Communication Interface 
  // sending message to ww
  navigator.serviceWorker.ready.then(registration => {
    console.log('Service Worker registered ok');
    const message = {
      type: 'clientMessage',
      data: test,
    };
    registration.active.postMessage(message);
  }).catch(error => {
    console.error('Service Worker registration failed', error);
  });
}


// Listening for messages from the worker
// navigator.serviceWorker.addEventListener('message', event => {
//   const { type, data } = event.data;
//   if (type === 'headerModified') {
//     console.log('Received a header modification message => ', data.url);
//     console.log('Modified Headers =>', data.headers);
//   }
// });