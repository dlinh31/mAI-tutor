const OpenAI = require('openai');





async function get_help(prompt) {
    console.log("into typescript")
    const openai = new OpenAI({
        // apiKey: process.env.OPENAI_API_KEY
        apiKey: "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",
        dangerouslyAllowBrowser: true
    })
    

    const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a study assistant, please provide support for users to learn"},
        {role:"user", content: prompt}
],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content
}


module.exports = get_help;
