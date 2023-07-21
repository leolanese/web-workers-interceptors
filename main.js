if ('serviceWorker' in navigator) {

    window.addEventListener('load', function() {
        navigator.serviceWorker.register('interceptor-worker.js', { scope: '/' })
            .then(function(registration) {
                console.log('Service worker registered with scope: ', registration.scope);
            
                navigator.serviceWorker.addEventListener("message", (event) => {
                    console.log(`Received message from worker: ${event.data}`);
                    if (event.data.include('401')) {
                        // removed sessionId from localStorage

                    }
                });
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
  });   
  
}