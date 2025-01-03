const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiFunFact = async (movie) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `beri tau aku fun fact film ${movie} dan alasan kenapa aku harus menonton film ini, lalu film ini itu similar dengan film apa saja ? berikan aku jawaban dalam bentuk react menggunakan clas-clas tailwindcss format classnya className , dan hanya isinya saja tanpa ada module export yang dimulai setelah return() tanpa ada jsx, langusng isinya saja tanpa return gunakan text berwarna hitam`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  geminiFunFact,
};
