const axios = require('axios');

async function generateImage(prompt) {
  const api_key = process.env.OPENAI_API_KEY;
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
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateImage };
