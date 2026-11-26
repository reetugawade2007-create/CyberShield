const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check backend
app.get('/', (req, res) => {
  res.send('CyberShield Backend is Running!');
});

// Submit URL to VirusTotal
app.post('/scan', async (req, res) => {
  try {
    const url = String(req.body.url || '').trim();

    if (!url) {
      return res.status(400).json({
        error: 'Please provide a URL',
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({
        error: 'Invalid URL format',
      });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        error: 'Only HTTP and HTTPS URLs are allowed',
      });
    }

    if (!process.env.VIRUSTOTAL_API_KEY) {
      return res.status(500).json({
        error: 'VirusTotal API key is not configured',
      });
    }

    console.log('URL received:', url);

    const formData = new URLSearchParams();
    formData.append('url', url);

    const response = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      formData.toString(),
      {
        headers: {
          'x-apikey': process.env.VIRUSTOTAL_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return res.json({
      message: 'URL submitted successfully',
      analysisId: response.data.data.id,
    });

  } catch (error) {
    console.error(
      'VirusTotal Scan Error:',
      error.response?.data || error.message,
    );

    return res.status(500).json({
      error: 'Unable to submit URL to VirusTotal',
    });
  }
});

// Get VirusTotal analysis results
app.get('/analysis/:id', async (req, res) => {
  try {
    const analysisId = req.params.id;

    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${encodeURIComponent(analysisId)}`,
      {
        headers: {
          'x-apikey': process.env.VIRUSTOTAL_API_KEY,
        },
      },
    );

    const attributes = response.data.data.attributes;

    if (attributes.status !== 'completed') {
      return res.json({
        status: 'in-progress',
      });
    }

    const stats = attributes.stats || {};

    return res.json({
      status: 'completed',
      stats: {
        malicious: stats.malicious || 0,
        suspicious: stats.suspicious || 0,
        harmless: stats.harmless || 0,
        undetected: stats.undetected || 0,
      },
    });

  } catch (error) {
    console.error(
      'VirusTotal Analysis Error:',
      error.response?.data || error.message,
    );

    return res.status(500).json({
      error: 'Unable to retrieve analysis results',
    });
  }
});

// Start backend server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`CyberShield Backend running on port ${PORT}`);
});