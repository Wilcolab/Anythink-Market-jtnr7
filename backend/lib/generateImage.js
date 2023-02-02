const axios = require('axios');

async function generateImage(prompt) {
  const api_key = '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';
  const imageParameters = {
    prompt: prompt,
    n: 1,
    size: '256x256',
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      imageParameters,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    const imageUrl = response.data.data[0].url;
    return imageUrl;
  } catch (response) {
    console.error('check the response error', response.data);
  }
}

module.exports = { generateImage };
