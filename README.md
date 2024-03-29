# Web-Workers with Interceptor

> Using vanilla JS to mount a Service Web-Worker that allow us to intercept 403, modify headers and delete cookies/localStorage



# Communication Flow in Service Worker-based Application

Interaction Flow between Site, main.js, interceptor-worker.js, and Serve

## Interaction Flow between Site, main.js, interceptor-worker.js, and Server

### `main.js` 
The main is the main thread of the JS runtime in the browser. It is responsible for registering the service worker in the client's browser. It also sets up a listener for messages coming from the service worker and handles them and executing most of the JavaScript code in your web application, including user interactions, DOM manipulation, and rendering updates

### `interceptor-worker.js`
This service worker script acts as a persistent intermediary between your application and the network. It controls the way network requests are handled and responses are processed, with the ability to intercept and modify them according to specific logic defined. It run in the background, separate from a webpage, and are not directly attached to the Document Object Model (DOM)


<br />


| Step | Site/User | main.js | interceptor-worker.js | Server |
|------|-----------|---------|-----------------------|--------|
| 1    | User opens the web page | Window load event is triggered |  |  |
| 2    |  | Checks if service worker is available |  |  |
| 3    |  | Service worker registration is initiated |  |  |
| 4    |  |  | Service worker activates and claims clients |  |
| 5    | User triggers a fetch request (for login or other services) |  |  |  |
| 6    |  |  | Intercept fetch event, determine the request type and process accordingly |  |
| 7    |  |  | If it's a login request, fetch it as is from the server | Server receives login request |
| 8    |  |  |  | Server processes login request and returns response |
| 9    |  |  | Extract and store sessionId from response |  |
| 10   | User triggers another fetch request (for other services) |  |  |  |
| 11   |  |  | Intercept fetch event, add Authorization header and potentially replace `{sessionId}` in URL, then fetch this modified request | Server receives modified request |
| 12   |  |  |  | Server processes the request and returns a response |
| 13   |  |  | Check response status. If status is `401` and sessionId exists, post message to client |  |
| 14   |  | Receive message from service worker and handle accordingly (eg., delete sessionId if status is 401) |  |  |


---

## Reverse Proxy

```js
// install express + http-proxy-middleware
npm install express http-proxy-middleware --save
```

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/services', createProxyMiddleware({ 
  target: 'https://test.services.com/services', 
  changeOrigin: true 
}));

app.listen(3000);
```

```js
// package.json
"reverse-proxy": "node server.js"
```

// TODO: Update it with the back-end API target
> now your app is running on: `localhost:8080`, so we have to update your request to: `http://localhost:8080/services/.../login`


---
### :100: <i>Thanks!</i>
#### Now, don't be an stranger. Let's stay in touch!

<a href="https://github.com/leolanese" target="_blank" rel="noopener noreferrer">
  <img src="https://scastiel.dev/api/image/leolanese?dark&removeLink" alt="leolanese’s GitHub image" width="600" height="314" />
</a>

##### :radio_button: Linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">LeoLanese</a>
##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>
##### :radio_button: Portfolio: <a href="https://www.leolanese.com" target="_blank">www.leolanese.com</a>
##### :radio_button: DEV.to: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>
##### :radio_button: Blog: <a href="https://www.leolanese.com/blog" target="_blank">leolanese.com/blog</a>
##### :radio_button: Questions / Suggestion / Recommendation: developer@leolanese.com

## Servers up and running (this works only under VPN validation)

Run `npm run reverse-proxy` for Express server which has the reverse proxy setup (server.js)
Run `npm run server` for Angular application at `http://192.168.1.127:8080`

