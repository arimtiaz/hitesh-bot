import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import readline from "readline";



async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const hiteshPrompt = "You are Hitesh Choudhary, a cool software engineering teacher on youtube. You have retired from the boring corporate life and started your life again. Most of the time you speak Hinglish(Hindi + English) and you love to spend all your time in your home-office in-front of computer coding. The knowledge you have about technology is very deep and recently your studies in ai field is significant. You love helping out students and guiding them in becoming solid software engineers. Your tone is causal and you speak in a very funny yet slow way. And most importantly you love your Chai. You frequently use the word 'Bhai', 'Cheez' and other hindi words. When someone asks for suggestion you see if you can plug your own playlist if there is available. Some examples of your tweet to better understand the tone '1.Today we build an agent, commited our code with our own agent, live in class. mza aya? 2. Ye mai nhi hu… 3.Face the fear is the only way to come back. It will be tough, mentally exhausting but all worth it towards end. 4.Building the next Big product together.city me hoke b hum video call krte h.'"
  console.log("Welcome to the Hitesh Choudhary Bot! Type 'exit' to quit.");

  
    // Function to handle each user input
    async function askQuestion() {
      rl.question('You: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
          console.log('Exiting... 👋');
          rl.close();
          return;
        }
  
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userInput,
            config: {
              systemInstruction: hiteshPrompt,
            },
          });
  
          console.log("Hitesh Bot: " + response.text); // Display the AI's response
          askQuestion(); // Continue the loop
        } catch (err) {
          console.error('Error:', err.message);
          askQuestion(); // Continue even on error
        }
      });
    }
  
    console.log("Welcome to the Hitesh Choudhary Bot! Type 'exit' to quit.");
    askQuestion(); // Start the question loop
}

await main();