importScripts('https://unpkg.com/axios/dist/axios.min.js');

self.onmessage = async function(event) {
  console.log('Received message in worker:', event.data);

  try {
    const response = await fetch(event.data.url);
    const data = await response.json();
    console.log('Data fetched in worker:', data);
    self.postMessage(data);
  } catch (error) {
    // Handle the error and post it back to the main thread
    console.error('Error in worker:', error.message);
    self.postMessage({ error: error.message });
  }

};