const OpenAIApi = require('openai');
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  /*console.log("in api/data")
  const data = { message: 'Hello from the server!' };
  res.json(data);
  */
    async function main() {
        const openai = new OpenAIApi();
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);
    }

    main();

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});