const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const API2_URL = process.env.API2_URL || 'http://api2:3001/api/data'; // ใช้ชื่อ service ของ Docker Compose

app.get('/api/proxy', async (req, res) => {
    console.log(`[API1] Request received from user at ${req.originalUrl}`);
    try {
        console.log(`[API1] Forwarding request to API2 at ${API2_URL}`);
        const response = await axios.get(API2_URL);
        const dataFromApi2 = response.data;
        console.log(`[API1] Received response from API2: ${JSON.stringify(dataFromApi2)}`);
        res.json({ message: 'Hello from API1!', data_from_api2: dataFromApi2 });
    } catch (error) {
        console.error(`[API1] Error forwarding request to API2: ${error.message}`);
        res.status(500).json({ error: 'Failed to communicate with API2' });
    }
});

app.listen(PORT, () => {
    console.log(`[API1] Server listening on port ${PORT}`);
});