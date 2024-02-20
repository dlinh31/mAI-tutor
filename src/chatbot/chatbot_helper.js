const OpenAI = require('openai');

let prompts = [
    { role: "system", content: "You are a study assistant, please provide support for users to learn"},
]

async function get_help(prompt) {
    console.log("into typescript")
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        
        dangerouslyAllowBrowser: true
    })

    prompts.push({role: "user", content: prompt})
    const completion = await openai.chat.completions.create({
    messages: prompts,
    model: "gpt-3.5-turbo",
  });
  const response_text = completion.choices[0].message.content

  console.log(completion.choices[0]);
  
  prompts.push({role: "system", content: response_text})

  return response_text
}


module.exports = get_help;
