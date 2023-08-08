require("dotenv").config();

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


async function chatGPT(prompt) {
  try {
		// 1. createCompletion을 사용하면 옵션을 여러개 줄 수 있다!
    const completion = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt: prompt,
      },
      {
        timeout: 10000,
        headers: {
          "Example-Header": "example",
        },
      }
    );
    
    return completion.data.choices[0].text;

    // 2. createCompletion을 사용하면 간단한 인풋과 아웃풋을 볼 수 있다. 
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{role: "user", content: prompt}],
    // });
    // console.log(response.data)
    // return response.data.choices[0].message;
  } catch (error) {
    console.error('Error making API call:', error.message);
    return null;
  }
}

async function main() {
  const prompt = 'Tell me a joke'; // Your prompt here
  console.log('Prompt:', prompt);
  const response = await chatGPT(prompt);
  if (response) {
    console.log('ChatGPT response:', response);
  } else {
    console.log('Failed to get a response from ChatGPT.');
  }
}

main();