const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiFunFact = async (movie) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `beri tau aku fun fact film ${movie} dan alasan kenapa aku harus menonton film ini, lalu film ini itu similar dengan film apa saja ?`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

const geminiRecomendation = async (likedGendres, likedActors) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `beri aku rekomendasi film, yang bersangkutan dengan genre dan aktor ${
      (likedGendres, likedActors)
    } tidak masalah walaupun mereka tidak pernah bermain film bersama, tampilkan saja film-film yang menurut kamu cocok untuk aktor dan juga genre yang aku sampaikan`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  geminiFunFact,
  geminiRecomendation,
};
