// modify request headers before sending the request using the Fetch API.
// This is useful when you want to add headers based on some dynamic information from the main webpage, 
// such as user input or cookies.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(registration => {
      console.log('ServiceWorker scope: ', registration.scope);

      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
          'X-Custom-Header-1': 'some value from main'
        }
      })
        .then(response => response.json())
        .then(json => console.log('Fetch response', json));


      // unregister
      document.getElementById('unregisterButton').addEventListener('click', () => {
        registration.unregister().then(function(success) {
          console.log('Service worker unregistered', success);
        }).catch(function(error) {
          console.log('Service worker unregisteration error', error);
        });
      });  


    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
