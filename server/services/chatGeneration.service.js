const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateDescriptionService=async(prompt)=>{
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    throw error;
  }
}

module.exports = { generateDescriptionService };
