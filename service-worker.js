
self.addEventListener('fetch', function (event) {
    
    const request = event.request;
    const cookieHeader = request.headers.get('My-Custom-Cookie');
    const customHeader = request.headers.get('My-Custom-Header');

    console.log('Test Cookie from worker', cookieHeader);
    console.log('Test Custom header from worker', customHeader);

    event.respondWith(fetch(request));
});
