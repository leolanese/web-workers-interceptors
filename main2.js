
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(registration => {
      console.log('ServiceWorker scope: ', registration.scope);

      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
          'My-Custom-Header': 'my-custom-header'
        }
      })
        .then(response => response.json())
        .then(json => console.log('Fetch response', json));


    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
