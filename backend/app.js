const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  // Replace this with the data you want to send to the client
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});