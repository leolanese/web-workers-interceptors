self.addEventListener('fetch', function (event) {

    const localCookie = 'default';
    console.log('Cookies', localCookie);

    const newHeader = [...event.request.headers];

    let newReq = new Request(event.request, {
        headers: {
          ...event.request.headers,
          foo: 'bar'
        }
      });
      newReq.headers['My-Custom-Header'] = 'Modified';
      

    // const request = event.request;
    // const cookieHeader = newReq.headers.set('My-Custom-Cookie');
    // const customHeader = newReq.headers.set('My-Custom-Header');

    // console.log('Test Cookie from worker', cookieHeader);
    // console.log('Test Custom header from worker', customHeader);

    event.respondWith(fetch(newReq));
});
