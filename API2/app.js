const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/data', (req, res) => {
    console.log(`[API2] Request received from API1 at ${req.originalUrl}`);
    const message = 'Hello from API2!';
    console.log(`[API2] Sending response: "${message}"`);
    res.json({ message: message, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`[API2] Server listening on port ${PORT}`);
});