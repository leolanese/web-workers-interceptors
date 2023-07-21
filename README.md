# Web-Workers with Interceptor

> Using vanilla JS to mount a Service Web-Worker that allow us to intercept 403, modify headers and delete cookies/localStorage

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
  target: 'https://services.lttwdev.slcom-tws.com/services', 
  changeOrigin: true 
}));

app.listen(3000);
```

```js
// package.json
"reverse-proxy": "node server.js"
```

> now your app is running on: `localhost:8080`, so we have to update your request to: `http://localhost:8080/services/login-service/v1/login`

## Servers up and running (this works only under VPN validation)

Run `npm run reverse-proxy` for Express server which has the reverse proxy setup (server.js)
Run `npm run server` for Angular application at `http://192.168.1.127:8080`

