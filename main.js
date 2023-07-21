if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('interceptor-worker.js', { scope: '/' })
            .then(function(registration) {
                console.log('Service worker registered with scope: ', registration.scope);
            
                navigator.serviceWorker.addEventListener("message", (event) => {
                    console.log(`Received message from worker: ${event.data}`);

                    if (event.data === '403') {
                        // 2
                        // removed sessionId from localStorage
                        console.log('delete sessionId from localStorage')
                        localStorage.removeItem('sessionId');
                    }
                });

            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
  });   
}


