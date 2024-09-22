// server.js
const express = require('express');
const bodyParser = require('body-parser');
const atob = require('atob');  // To decode Base64 files
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors()); // Ensure this is included in your backend

// POST Method to process data
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().reverse()[0]]
        : [];

    // File handling
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKB = null;
    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            fileSizeKB = buffer.length / 1024;
            // Simulate file validation and mime type check
            fileMimeType = "application/octet-stream"; // Example MIME type
            fileValid = true;
        } catch (error) {
            fileValid = false;
        }
    }

    const response = {
        is_success: true,
        user_id: "john_doe_17091999",  // Example user id format
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    };

    res.status(200).json(response);
});

// GET Method
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
