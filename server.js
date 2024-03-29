const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors());

// TODO: Update it with the back-end target
app.use('/services', createProxyMiddleware({ 
  target: 'https://test.services.com', 
  changeOrigin: true,
  rewrite: (path) => path.replace('^/services', ''),
}));

app.get('/', (req, res) => {
  res.send('response for the root URL'); 
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

