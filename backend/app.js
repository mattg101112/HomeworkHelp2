const OpenAIApi = require('openai');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/data', (req, res) => {
  console.log("req.body: " + req);

    async function main() {
        const openai = new OpenAIApi();
        const completion = await openai.chat.completions.create({
            messages: [{ "role": "user", "content": "Hi chatgpt.  How are you today?" }],
            model: "gpt-3.5-turbo",
        });
        
        console.log(completion.choices[0]);
        return completion.choices[0];
    }

    /*response.writehead(200, { 'Content-Type': 'application/json' });
    response.write(json.stringify(main()));
    */
    main().then(function(result) {
        console.log("result: " + result);
        res.json(result);
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});