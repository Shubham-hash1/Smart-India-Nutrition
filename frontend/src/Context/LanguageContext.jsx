import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    // Nav & General
    home: "Home",
    about: "About",
    products: "Products",
    blogs: "Blogs",
    aiAssistant: "AI Chat",
    calorieTracker: "Calorie Tracker",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    welcome: "Welcome",
    back: "Back",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    submit: "Submit",
    loading: "Loading...",
    
    // Hero & Home
    heroTitle1: "Nourish Your Body,",
    heroTitle2: "Empower Your Life",
    heroDesc: "Discover personalized nutrition plans, connect with our health community, track calories, and query our smart AI assistant.",
    heroBtn: "Get Started",
    stageTitle: "Every Stage, Every Story",
    riskTitle1: "Know the Risks,",
    riskTitle2: "Guard Your Health",
    searchPlaceholder: "Search diseases (e.g. Thyroid, Diabetes)...",
    noDiseaseFound: "No diseases found matching your search.",
    
    // AI Chat
    aiTitle: "AI Nutrition Assistant",
    aiDesc: "Ask any health queries, get personalized meal plans, and request healthy recipes.",
    aiInputPlaceholder: "Ask me anything... (e.g. 'Give me a high protein lunch recipe')",
    aiSuggestRecipe: "Suggest a healthy recipe",
    aiSuggestDiet: "Diet for weight loss",
    aiSuggestThyroid: "Diet tips for Thyroid",
    aiClear: "Clear Chat",
    
    // Calorie Tracker
    trackerTitle: "Calorie & Macro Tracker",
    trackerDesc: "Log your meals, estimate your daily requirements, and balance your nutrition.",
    calTarget: "Daily Target",
    calConsumed: "Consumed",
    calRemaining: "Remaining",
    addMeal: "Add Meal Log",
    foodName: "Food Item Name",
    calories: "Calories (kcal)",
    protein: "Protein (g)",
    carbs: "Carbs (g)",
    fat: "Fat (g)",
    servings: "Servings / Quantity",
    quickAdd: "Or Quick Select Food:",
    bmrCalc: "BMR & Calorie Calculator",
    gender: "Gender",
    male: "Male",
    female: "Female",
    weight: "Weight (kg)",
    height: "Height (cm)",
    age: "Age (years)",
    activity: "Activity Level",
    activitySedentary: "Sedentary (little or no exercise)",
    activityLight: "Lightly active (light exercise 1-3 days/week)",
    activityModerate: "Moderately active (moderate exercise 3-5 days/week)",
    activityVery: "Very active (hard exercise 6-7 days/week)",
    calcBtn: "Calculate Target",
    todayMeals: "Today's Logged Meals",
    noMeals: "No meals logged today yet. Keep track of what you eat!",
    
    // Blogs
    blogTitle1: "Community",
    blogTitle2: "Voices",
    blogDesc: "Share your health journey, tips, and experiences.",
    createPost: "Create a New Post",
    postTitle: "Post Title...",
    postContent: "What's on your mind?",
    videoUrlLabel: "Recipe Video URL (optional, YouTube/Vimeo/mp4)",
    publish: "Publish",
    posting: "Publishing...",
    loginToPost: "Please log in to join the conversation, create posts, and leave comments!",
    comments: "Comments",
    addCommentPlaceholder: "Add a comment...",
    reply: "Reply"
  },
  hi: {
    // Nav & General
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    blogs: "ब्लॉग",
    aiAssistant: "एआई चैट",
    calorieTracker: "कैलोरी ट्रैकर",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    welcome: "स्वागत है",
    back: "पीछे",
    cancel: "रद्द करें",
    save: "सहेजें",
    delete: "हटाएं",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",

    // Hero & Home
    heroTitle1: "अपने शरीर को पोषण दें,",
    heroTitle2: "अपने जीवन को सशक्त बनाएं",
    heroDesc: "व्यक्तिगत पोषण योजनाएं खोजें, हमारे स्वास्थ्य समुदाय से जुड़ें, कैलोरी ट्रैक करें और हमारे स्मार्ट एआई सहायक से प्रश्न पूछें।",
    heroBtn: "शुरू करें",
    stageTitle: "हर चरण, हर कहानी",
    riskTitle1: "जोखिमों को जानें,",
    riskTitle2: "अपने स्वास्थ्य की रक्षा करें",
    searchPlaceholder: "बीमारियों की खोज करें (जैसे कि थायराइड, मधुमेह)...",
    noDiseaseFound: "आपकी खोज से मेल खाती कोई बीमारी नहीं मिली।",

    // AI Chat
    aiTitle: "एआई पोषण सहायक",
    aiDesc: "स्वास्थ्य संबंधी कोई भी प्रश्न पूछें, व्यक्तिगत भोजन योजनाएं प्राप्त करें, और स्वस्थ व्यंजनों का अनुरोध करें।",
    aiInputPlaceholder: "मुझसे कुछ भी पूछें... (जैसे कि 'मुझे उच्च प्रोटीन लंच रेसिपी बताएं')",
    aiSuggestRecipe: "स्वस्थ नुस्खे का सुझाव दें",
    aiSuggestDiet: "वजन घटाने के लिए आहार",
    aiSuggestThyroid: "थायराइड के लिए आहार सुझाव",
    aiClear: "चैट साफ़ करें",

    // Calorie Tracker
    trackerTitle: "कैलोरी और मैक्रो ट्रैकर",
    trackerDesc: "अपने भोजन को लॉग करें, अपनी दैनिक आवश्यकताओं का अनुमान लगाएं, और अपने पोषण को संतुलित करें।",
    calTarget: "दैनिक लक्ष्य",
    calConsumed: "सेवन किया",
    calRemaining: "शेष",
    addMeal: "भोजन लॉग जोड़ें",
    foodName: "खाद्य पदार्थ का नाम",
    calories: "कैलोरी (kcal)",
    protein: "प्रोटीन (g)",
    carbs: "कार्ब्स (g)",
    fat: "वसा (g)",
    servings: "सर्विंग्स / मात्रा",
    quickAdd: "या तुरंत भोजन चुनें:",
    bmrCalc: "बीएमआर और कैलोरी कैलकुलेटर",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    weight: "वजन (kg)",
    height: "ऊंचाई (cm)",
    age: "आयु (वर्ष)",
    activity: "सक्रियता स्तर",
    activitySedentary: "गतिहीन (बहुत कम या बिल्कुल व्यायाम नहीं)",
    activityLight: "कम सक्रिय (हल्का व्यायाम सप्ताह में 1-3 दिन)",
    activityModerate: "मध्यम सक्रिय (मध्यम व्यायाम सप्ताह में 3-5 दिन)",
    activityVery: "बहुत सक्रिय (कठिन व्यायाम सप्ताह में 6-7 दिन)",
    calcBtn: "लक्ष्य की गणना करें",
    todayMeals: "आज के भोजन लॉग",
    noMeals: "आज अभी तक कोई भोजन लॉग नहीं किया गया है। आप जो खाते हैं उसे ट्रैक करें!",

    // Blogs
    blogTitle1: "सामुदायिक",
    blogTitle2: "आवाजें",
    blogDesc: "अपनी स्वास्थ्य यात्रा, सुझाव और अनुभव साझा करें।",
    createPost: "एक नई पोस्ट लिखें",
    postTitle: "पोस्ट का शीर्षक...",
    postContent: "आपके दिमाग में क्या है?",
    videoUrlLabel: "व्यंजन वीडियो URL (वैकल्पिक, YouTube/Vimeo/mp4)",
    publish: "प्रकाशित करें",
    posting: "प्रकाशित किया जा रहा है...",
    loginToPost: "बातचीत में शामिल होने, पोस्ट बनाने और टिप्पणियां छोड़ने के लिए कृपया लॉग इन करें!",
    comments: "टिप्पणियाँ",
    addCommentPlaceholder: "एक टिप्पणी जोड़ें...",
    reply: "उत्तर दें"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
