const systemPrompt = `You are NutriSmart AI, a professional nutrition and recipe assistant.
Provide expert answers to users' health, diet, and nutrition questions.
When asked for recipes, provide a structured breakdown containing:
1. Recipe Name
2. Prep & Cook time
3. Ingredients list (preferably with local Indian options where relevant)
4. Step-by-step cooking instructions
5. Approximate Nutritional Breakdown (Calories, Protein, Carbs, Fats)

Respond in clear Markdown format. Keep the tone encouraging, helpful, and professional.`;

const chat = async (req, res, next) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a friendly fallback if API key is not configured yet
      return res.status(200).json({
        success: true,
        reply: `### NutriSmart AI (Sandbox Mode)
        
It looks like the **GEMINI_API_KEY** is not configured in the backend \`.env\` file. 

To enable live AI answers and recipes, please add:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`
to your \`backend/.env\` and restart the server.

**Sample Recipe Suggestion (Sandbox):**
1. **Moong Dal Khichdi**: Great for digestion. 
   - *Ingredients*: Moong dal, Rice, Jeera, Ghee, Turmeric, Ginger.
   - *Calories*: ~250 kcal | *Protein*: 9g | *Carbs*: 45g | *Fat*: 3g.`
      });
    }

    // Build the request contents payload
    const contents = [];
    
    // Format history if available
    if (history && Array.isArray(history)) {
      history.forEach((msg) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: `${systemPrompt}\n\nUser Query: ${prompt}` }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error response:", data);
      throw new Error(data.error?.message || "Failed to communicate with Gemini API");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from AI.";
    
    res.status(200).json({
      success: true,
      reply
    });
  } catch (error) {
    console.error("AI controller error:", error);
    next(error);
  }
};

const estimateFood = async (req, res, next) => {
  try {
    const { food_name, quantity } = req.body;
    if (!food_name) {
      return res.status(400).json({ success: false, message: "Food name is required." });
    }

    const qty = parseFloat(quantity) || 1.0;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ success: false, message: "Gemini API key is not configured in backend." });
    }

    const prompt = `Analyze this food item: "${food_name}" for a quantity of ${qty} serving(s)/piece(s). Estimate its nutritional value. Return ONLY a valid JSON object matching this schema: { "calories": number, "protein": number, "carbs": number, "fat": number }. Do not include any other markdown, text, explanation, or backticks. Example: {"calories": 150, "protein": 4.5, "carbs": 25, "fat": 2.2}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to communicate with Gemini API");
    }

    let textReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // Clean JSON response (strip markdown blocks if any)
    textReply = textReply.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedNutrition = JSON.parse(textReply);
      res.status(200).json({
        success: true,
        nutrition: {
          calories: Math.round(parsedNutrition.calories || 100),
          protein: parseFloat(parsedNutrition.protein || 0),
          carbs: parseFloat(parsedNutrition.carbs || 0),
          fat: parseFloat(parsedNutrition.fat || 0)
        }
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", textReply);
      throw new Error("Invalid format returned by AI.");
    }
  } catch (error) {
    console.error("AI estimation error:", error);
    next(error);
  }
};

module.exports = { chat, estimateFood };
