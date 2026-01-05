
export type LanguageCode = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'ml';

export interface Translations {
  appName: string;
  poweredBy: string;
  detectLocation: string;
  fieldView: string;
  locationInfo: {
    place: string;
    mandal: string;
    district: string;
    detecting: string;
  };
  tabs: {
    advisor: string;
    market: string;
    news: string;
    store: string;
    inbox: string;
    authorities: string;
  };
  advisor: {
    welcome: string;
    subtitle: string;
    forecast: string;
    weatherPulse: string;
    tapStart: string;
    listening: string;
    analyzing: string;
    marketPulse: string;
    viewPredictions: string;
    waterAdvice: string;
    waterSubtitle: string;
    openControls: string;
    roi: string;
    soilPH: string;
    soilType: string;
    climateTrend: string;
    waterLevel: string;
    weatherAlert: string;
    buySeeds: string;
    buyPremiumSeeds: string;
    precisionAiInsight: string;
    humidity: string;
    wind: string;
    subtitleUser: string;
    subtitleAi: string;
  };
  market: {
    title: string;
    searchPlaceholder: string;
    forecastLabel: string;
    fromLastWeek: string;
    rateToday: string;
    prediction: string;
    compareTitle: string;
    mandi: string;
    price: string;
    trend: string;
    mandiComparisonSubtitle: string;
  };
  news: {
    title: string;
    emergency: string;
    details: string;
    pulse: string;
    report: string;
    transformTitle: string;
    newsSubtitle: string;
    priorityAlert: string;
    innovation: string;
    impactLevel: string;
  };
  store: {
    title: string;
    searchPlaceholder: string;
    aiSuggestion: string;
    buyNow: string;
    addToCart: string;
    stock: string;
    results: string;
    deliveryTo: string;
    verifiedReviews: string;
    bestSeller: string;
    amazonClone: string;
    cart: string;
    primeDelivery: string;
    ratings: string;
    tomorrow: string;
  };
  inbox: {
    title: string;
    noMessages: string;
    liveUpdates: string;
    priorityHigh: string;
    priorityGov: string;
    priorityWeather: string;
  };
  authorities: {
    title: string;
    contact: string;
    vitals: string;
    directContact: string;
    serviceActive: string;
    department: string;
    officeHours: string;
  };
  common: {
    languageSettings: string;
    selectPreference: string;
    languageAdaptNotice: string;
    discardClose: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: "AgriVoice AI",
    poweredBy: "Powered by Google Gemini",
    detectLocation: "Update Location",
    fieldView: "Field Satellite View",
    locationInfo: { place: "Place", mandal: "Mandal/Block", district: "District", detecting: "Detecting..." },
    tabs: { advisor: "Voice Advisor", market: "Market", news: "Alerts", store: "Store", inbox: "Inbox", authorities: "Authorities" },
    advisor: {
      welcome: "Welcome back.",
      subtitle: "Your personal farming mentor is ready. Just speak naturally in your language.",
      forecast: "Current Weather",
      weatherPulse: "5-Day Forecast",
      tapStart: "Tap to Start Conversation",
      listening: "I'm listening...",
      analyzing: "AI is thinking...",
      marketPulse: "Market Pulse",
      viewPredictions: "View Predictions",
      waterAdvice: "Water Level Advice",
      waterSubtitle: "Sensors indicate optimal soil levels.",
      openControls: "Open Controls",
      roi: "ROI",
      soilPH: "Soil pH",
      soilType: "Soil Type",
      climateTrend: "Climate Trend",
      waterLevel: "Water Level",
      weatherAlert: "Agricultural Impact Alert",
      buySeeds: "Go to Seeds Store",
      buyPremiumSeeds: "Buy Premium Seeds",
      precisionAiInsight: "Precision AI Insight",
      humidity: "Humidity",
      wind: "Wind",
      subtitleUser: "You",
      subtitleAi: "AgriVoice Mentor"
    },
    market: { title: "Mandi Comparison", searchPlaceholder: "Search crops...", forecastLabel: "AI Forecast", fromLastWeek: "from last week", rateToday: "Rate Today", prediction: "AI Prediction", compareTitle: "Price Comparison", mandi: "Mandi", price: "Price", trend: "Trend", mandiComparisonSubtitle: "Live wholesale rates across your district." },
    news: { title: "Regional News & Alerts", emergency: "Emergency", details: "View Details", pulse: "Regional Agri Pulse", report: "Read full report", transformTitle: "Agri Transformations", newsSubtitle: "Localized impact reports on farming and climate.", priorityAlert: "Priority Alert", innovation: "Innovation", impactLevel: "Impact Level" },
    store: { title: "Agri-Marketplace", searchPlaceholder: "Search seeds, tools...", aiSuggestion: "AI Choice", buyNow: "Buy Now", addToCart: "Add to Cart", stock: "In Stock", results: "results", deliveryTo: "Deliver to", verifiedReviews: "ratings", bestSeller: "Best Seller", amazonClone: "Amazon Style", cart: "Cart", primeDelivery: "Fast Delivery", ratings: "ratings", tomorrow: "Tomorrow" },
    inbox: { title: "Official Farming Inbox", noMessages: "No recent messages.", liveUpdates: "Live Updates", priorityHigh: "Urgent", priorityGov: "Government", priorityWeather: "Climate Alert" },
    authorities: { title: "Official Local Authorities", contact: "Contact Officer", vitals: "Agronomic Vitals", directContact: "Call Department", serviceActive: "Active Now", department: "Department", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "Language Settings", selectPreference: "Select Your Preference", languageAdaptNotice: "The interface will adapt to your native language.", discardClose: "Discard & Close" }
  },
  hi: {
    appName: "एग्रोवॉयस एआई",
    poweredBy: "जेमिनी एआई द्वारा संचालित",
    detectLocation: "स्थान अपडेट करें",
    fieldView: "खेत का सैटेलाइट व्यू",
    locationInfo: { place: "स्थान", mandal: "मंडल", district: "ज़िला", detecting: "खोज रहा है..." },
    tabs: { advisor: "वॉयस सलाहकार", market: "बाजार", news: "अलर्ट", store: "स्टोर", inbox: "इनबॉक्स", authorities: "अधिकारी" },
    advisor: {
      welcome: "वापसी पर स्वागत है।",
      subtitle: "आपका व्यक्तिगत खेती गुरु तैयार है। अपनी भाषा में बात करें।",
      forecast: "वर्तमान मौसम",
      weatherPulse: "5-दिन का पूर्वानुमान",
      tapStart: "बातचीत शुरू करने के लिए टैप करें",
      listening: "मैं सुन रहा हूँ...",
      analyzing: "एआई सोच रहा है...",
      marketPulse: "बाजार की नब्ज",
      viewPredictions: "पूर्वानुमान देखें",
      waterAdvice: "जल स्तर सलाह",
      waterSubtitle: "सेंसर इष्टतम मिट्टी के स्तर का संकेत देते हैं।",
      openControls: "कंट्रोल खोलें",
      roi: "रिटर्न",
      soilPH: "मिट्टी का पीएच",
      soilType: "मिट्टी का प्रकार",
      climateTrend: "जलवायु प्रवृत्ति",
      waterLevel: "जल स्तर",
      weatherAlert: "कृषि प्रभाव अलर्ट",
      buySeeds: "बीज स्टोर पर जाएं",
      buyPremiumSeeds: "प्रीमियम बीज खरीदें",
      precisionAiInsight: "सटीक एआई अंतर्दष्टि",
      humidity: "नमी",
      wind: "हवा",
      subtitleUser: "आप",
      subtitleAi: "एग्रोवॉयस गुरु"
    },
    market: { title: "मंडी तुलना", searchPlaceholder: "फसलें खोजें...", forecastLabel: "एआई पूर्वानुमान", fromLastWeek: "पिछले सप्ताह से", rateToday: "आज की दर", prediction: "एआई भविष्यवाणी", compareTitle: "मूल्य तुलना", mandi: "मंडी", price: "कीमत", trend: "रुझान", mandiComparisonSubtitle: "आपके जिले की लाइव मंडी दरों की तुलना।" },
    news: { title: "क्षेत्रीय समाचार और अलर्ट", emergency: "आपातकालीन", details: "विवरण देखें", pulse: "क्षेत्रीय कृषि पल्स", report: "पूरी रिपोर्ट पढ़ें", transformTitle: "कृषि परिवर्तन", newsSubtitle: "खेती और जलवायु पर स्थानीय प्रभाव रिपोर्ट।", priorityAlert: "प्राथमिकता अलर्ट", innovation: "नवाचार", impactLevel: "प्रभाव स्तर" },
    store: { title: "कृषि-बाजार", searchPlaceholder: "बीज, उपकरण खोजें...", aiSuggestion: "एआई पसंद", buyNow: "अभी खरीदें", addToCart: "कार्ट में जोड़ें", stock: "स्टॉक में", results: "परिणाम", deliveryTo: "वितरण स्थान", verifiedReviews: "रेटिंग", bestSeller: "सबसे ज्यादा बिकने वाला", amazonClone: "अमेज़न स्टाइल", cart: "कार्ट", primeDelivery: "तेज वितरण", ratings: "रेटिंग", tomorrow: "कल" },
    inbox: { title: "आधिकारिक खेती इनबॉक्स", noMessages: "कोई संदेश नहीं।", liveUpdates: "लाइव अपडेट", priorityHigh: "अति आवश्यक", priorityGov: "सरकारी", priorityWeather: "जलवायु अलर्ट" },
    authorities: { title: "स्थानीय सरकारी अधिकारी", contact: "अधिकारी से संपर्क करें", vitals: "कृषि डेटा", directContact: "विभाग को कॉल करें", serviceActive: "अभी कार्यरत", department: "विभाग", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "भाषा सेटिंग्स", selectPreference: "अपनी पसंद चुनें", languageAdaptNotice: "इंटरफ़ेस आपकी मूल भाषा में बदल जाएगा।", discardClose: "रद्द करें और बंद करें" }
  },
  te: {
    appName: "అగ్రివాయిస్ AI",
    poweredBy: "జెమినీ AI ద్వారా",
    detectLocation: "స్థానాన్ని నవీకరించండి",
    fieldView: "పొలం శాటిలైట్ వ్యూ",
    locationInfo: { place: "ప్రాంతం", mandal: "మండలం", district: "జిల్లా", detecting: "గుర్తిస్తోంది..." },
    tabs: { advisor: "వాయిస్ సలహాదారు", market: "మార్కెట్", news: "అలర్ట్లు", store: "స్టోర్", inbox: "ఇన్‌బాక్స్", authorities: "అధికారులు" },
    advisor: {
      welcome: "స్వాగతం.",
      subtitle: "మీ వ్యక్తిగత వ్యవసాయ గురువు సిద్ధంగా ఉన్నారు. సహజంగా మాట్లాడండి.",
      forecast: "వాతావరణం",
      weatherPulse: "5 రోజుల సూచన",
      tapStart: "సంభాషణ ప్రారంభించడానికి నొక్కండి",
      listening: "నేను వింటున్నాను...",
      analyzing: "AI ఆలోచిస్తోంది...",
      marketPulse: "మార్కెట్ పల్స్",
      viewPredictions: "అంచనాలు చూడండి",
      waterAdvice: "నీటి మట్టం సలహా",
      waterSubtitle: "నేల తేమ బాగుంది.",
      openControls: "నియంత్రణలు",
      roi: "లాభం",
      soilPH: "నేల pH",
      soilType: "నేల రకం",
      climateTrend: "వాతావరణ ధోరణి",
      waterLevel: "నీటి మట్టం",
      weatherAlert: "వ్యవసాయ హెచ్చరిక",
      buySeeds: "విత్తనాల స్టోర్‌కు వెళ్లండి",
      buyPremiumSeeds: "ప్రీమియం విత్తనాలు",
      precisionAiInsight: "AI అంతర్దృష్టి",
      humidity: "తేమ",
      wind: "గాలి",
      subtitleUser: "మీరు",
      subtitleAi: "అగ్రివాయిస్ గురువు"
    },
    market: { title: "మండి పోలిక", searchPlaceholder: "వెతకండి...", forecastLabel: "AI అంచనా", fromLastWeek: "గత వారం నుండి", rateToday: "నేటి ధర", prediction: "AI అంచనా", compareTitle: "ధరల పోలిక", mandi: "మండి", price: "ధర", trend: "ధోరణి", mandiComparisonSubtitle: "లైవ్ మండి ధరల పోలిక." },
    news: { title: "వార్తలు", emergency: "అత్యవసరం", details: "వివరాలు", pulse: "ప్రాంతీయ పల్స్", report: "నివేదిక", transformTitle: "వ్యవసాయ మార్పులు", newsSubtitle: "వాతావరణం మరియు వ్యవసాయంపై ప్రాంతీయ నివేదికలు.", priorityAlert: "ముఖ్యమైన అలర్ట్", innovation: "ఆవిష్కరణ", impactLevel: "ప్రభావం" },
    store: { title: "అగ్రి-మార్కెట్", searchPlaceholder: "వెతకండి...", aiSuggestion: "AI ఎంపిక", buyNow: "ఇప్పుడే కొనండి", addToCart: "జోడించు", stock: "ఉంది", results: "ఫలితాలు", deliveryTo: "డెలివరీ", verifiedReviews: "రేటింగ్", bestSeller: "బెస్ట్ సెల్లర్", amazonClone: "అమెజాన్", cart: "కార్ట్", primeDelivery: "వేగవంతమైనది", ratings: "రేటింగ్", tomorrow: "రేపు" },
    inbox: { title: "అధికారిక ఇన్‌బాక్స్", noMessages: "సందేశాలు లేవు.", liveUpdates: "అప్‌డేట్లు", priorityHigh: "అత్యవసరం", priorityGov: "ప్రభుత్వ", priorityWeather: "వాతావరణ హెచ్చరిక" },
    authorities: { title: "స్థానిక అధికారులు", contact: "సంప్రదించండి", vitals: "సమాచారం", directContact: "శాఖకు కాల్ చేయండి", serviceActive: "ఇప్పుడు అందుబాటులో", department: "శాఖ", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "భాషా సెట్టింగ్‌లు", selectPreference: "ఎంచుకోండి", languageAdaptNotice: "ఇది మీ మాతృభాషలోకి మారుతుంది.", discardClose: "మూసివేయి" }
  },
  kn: {
    appName: "ಅಗ್ರಿ ವಾಯ್ಸ್ AI",
    poweredBy: "Gemini AI ಚಾಲಿತ",
    detectLocation: "ಸ್ಥಳ ನವೀಕರಿಸಿ",
    fieldView: "ಸ್ಯಾಟಲೈಟ್ ವ್ಯೂ",
    locationInfo: { place: "ಸ್ಥಳ", mandal: "ಮಂಡಲ", district: "ಜಿಲ್ಲೆ", detecting: "ಗುರ್ತಿಸಲಾಗುತ್ತಿದೆ..." },
    tabs: { advisor: "ಧ್ವನಿ ಸಲಹೆಗಾರ", market: "ಮಾರುಕಟ್ಟೆ", news: "ಎಚ್ಚರಿಕೆ", store: "ಅಂಗಡಿ", inbox: "ಇನ್ಬಾಕ್ಸ್", authorities: "ಅಧಿಕಾರಿಗಳು" },
    advisor: {
      welcome: "ಸ್ವಾಗತ.",
      subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಕ ಸಿದ್ಧರಿದ್ದಾರೆ. ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ.",
      forecast: "ಹವಾಮಾನ",
      weatherPulse: "5 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
      tapStart: "ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
      listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
      analyzing: "AI ಯೋಚಿಸುತ್ತಿದೆ...",
      marketPulse: "ಮಾರುಕಟ್ಟೆ ನಾಡಿ",
      viewPredictions: "ಮುನ್ಸೂಚನೆಗಳು",
      waterAdvice: "ನೀರಿನ ಸಲಹೆ",
      waterSubtitle: "ಮಟ್ಟ ಚೆನ್ನಾಗಿದೆ.",
      openControls: "ಕಂಟ್ರೋಲ್",
      roi: "ROI",
      soilPH: "pH",
      soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
      climateTrend: "ಹವಾಮಾನ ಪ್ರವೃತ್ತಿ",
      waterLevel: "ನೀರಿನ ಮಟ್ಟ",
      weatherAlert: "ಕೃಷಿ ಎಚ್ಚರಿಕೆ",
      buySeeds: "ಬೀಜದ ಅಂಗಡಿ",
      buyPremiumSeeds: "ಪ್ರೀಮಿಯಂ ಬೀಜ",
      precisionAiInsight: "AI ಒಳನೋಟ",
      humidity: "ಆರ್ದ್ರತೆ",
      wind: "ಗಾಳಿ",
      subtitleUser: "ನೀವು",
      subtitleAi: "ಅಗ್ರಿ ವಾಯ್ಸ್ ಗುರು"
    },
    market: { title: "ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ", searchPlaceholder: "ಹುಡುಕಿ...", forecastLabel: "AI ಮುನ್ಸೂಚನೆ", fromLastWeek: "ಹಿಂದಿನ ವಾರ", rateToday: "ಬೆಲೆ", prediction: "AI ಅಂದಾಜು", compareTitle: "ಬೆಲೆ ಹೋಲಿಕೆ", mandi: "ಮಾರುಕಟ್ಟೆ", price: "ಬೆಲೆ", trend: "ಟ್ರೆಂಡ್", mandiComparisonSubtitle: "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು." },
    news: { title: "ಸುದ್ದಿಗಳು", emergency: "ತುರ್ತು", details: "ವಿವರ", pulse: "ಪಲ್ಸ್", report: "ವರದಿ", transformTitle: "ಬದಲಾವಣೆಗಳು", newsSubtitle: "ಕೃಷಿ ಮತ್ತು ಹವಾಮಾನದ ವರದಿಗಳು.", priorityAlert: "ಮುಖ್ಯ ಎಚ್ಚರಿಕೆ", innovation: "ನಾವೀನ್ಯತೆ", impactLevel: "ಪರಿಣಾಮ" },
    store: { title: "ಕೃಷಿ ಅಂಗಡಿ", searchPlaceholder: "ಹುಡುಕಿ...", aiSuggestion: "AI ಆಯ್ಕೆ", buyNow: "ಖರೀದಿಸಿ", addToCart: "ಸೇರಿಸಿ", stock: "ಇದೆ", results: "ಫಲಿತಾಂಶ", deliveryTo: "ವಿತರಣೆ", verifiedReviews: "ರೇಟಿಂಗ್", bestSeller: "ಬೆಸ್ಟ್ ಸೆಲ್ಲರ್", amazonClone: "ಅಮೆಜಾನ್", cart: "ಕಾರ್ಟ್", primeDelivery: "ವೇಗ", ratings: "ರೇಟಿಂಗ್", tomorrow: "ನಾಳೆ" },
    inbox: { title: "ಅಧಿಕಾರಿಕ ಇನ್ಬಾಕ್ಸ್", noMessages: "ಸಂದೇಶವಿಲ್ಲ.", liveUpdates: "ಅಪ್‌ಡೇಟ್", priorityHigh: "ತುರ್ತು", priorityGov: "ಸರ್ಕಾರಿ", priorityWeather: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ" },
    authorities: { title: "ಅಧಿಕಾರಿಗಳು", contact: "ಸಂಪರ್ಕಿಸಿ", vitals: "ಮಾಹಿತಿ", directContact: "ಇಲಾಖೆಗೆ ಕರೆ ಮಾಡಿ", serviceActive: "ಈಗ ಲಭ್ಯ", department: "ಇಲಾಖೆ", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "ಭಾಷೆ", selectPreference: "ಆರಿಸಿ", languageAdaptNotice: "ಇದು ನಿಮ್ಮ ಭಾಷೆಗೆ ಬದಲಾಗುತ್ತದೆ.", discardClose: "ಮುಚ್ಚಿ" }
  },
  ta: {
    appName: "அக்ரிவாய்ஸ் AI",
    poweredBy: "Gemini AI மூலம்",
    detectLocation: "இருப்பிடம்",
    fieldView: "செயற்கைக்கோள்",
    locationInfo: { place: "இடம்", mandal: "மண்டலம்", district: "மாவட்டம்", detecting: "கண்டறியப்படுகிறது..." },
    tabs: { advisor: "குரல் ஆலோசகர்", market: "சந்தை", news: "எச்சரிக்கை", store: "ஸ்டோர்", inbox: "இன்பாக்ஸ்", authorities: "அதிகாரிகள்" },
    advisor: {
      welcome: "வரவேற்கிறோம்.",
      subtitle: "உங்கள் விவசாய வழிகாட்டி தயார். பேசத் தொடங்குங்கள்.",
      forecast: "வானிலை",
      weatherPulse: "5 நாள் கணிப்பு",
      tapStart: "பேசத் தொடங்கவும்",
      listening: "கேட்கிறது...",
      analyzing: "AI யோசிக்கிறது...",
      marketPulse: "சந்தை நிலவரம்",
      viewPredictions: "கணிப்புகள்",
      waterAdvice: "நீர் ஆலோசனை",
      waterSubtitle: "ஈரப்பதம் சரி.",
      openControls: "கட்டுப்பாடுகள்",
      roi: "லாபம்",
      soilPH: "pH",
      soilType: "மண் வகை",
      climateTrend: "காலநிலை போக்கு",
      waterLevel: "நீர் மட்டம்",
      weatherAlert: "விவசாய எச்சரிக்கை",
      buySeeds: "விதை கடை",
      buyPremiumSeeds: "தரமான விதைகள்",
      precisionAiInsight: "AI நுண்ணறிவு",
      humidity: "ஈரப்பதம்",
      wind: "காற்று",
      subtitleUser: "நீங்கள்",
      subtitleAi: "அக்ரிவாய்ஸ் வழிகாட்டி"
    },
    market: { title: "சந்தை ஒப்பீடு", searchPlaceholder: "தேடுங்கள்...", forecastLabel: "AI கணிப்பு", fromLastWeek: "கடந்த வாரம்", rateToday: "விலை", prediction: "AI கணிப்பு", compareTitle: "விலை ஒப்பீடு", mandi: "சந்தை", price: "விலை", trend: "போக்கு", mandiComparisonSubtitle: "நேரடி சந்தை விலைகள்." },
    news: { title: "செய்திகள்", emergency: "அவசரம்", details: "விவரம்", pulse: "நிலவரம்", report: "அறிக்கை", transformTitle: "மாற்றங்கள்", newsSubtitle: "விவசாயம் மற்றும் வானிலை அறிக்கைகள்.", priorityAlert: "முக்கிய எச்சரிக்கை", innovation: "புத்தாக்கம்", impactLevel: "பாதிப்பு" },
    store: { title: "விவசாய அங்காடி", searchPlaceholder: "தேடுங்கள்...", aiSuggestion: "AI தேர்வு", buyNow: "வாங்கவும்", addToCart: "சேர்க்க", stock: "இருப்பு", results: "முடிவுகள்", deliveryTo: "டெலிவரி", verifiedReviews: "மதிப்பீடுகள்", bestSeller: "சிறந்த விற்பனை", amazonClone: "அமேசான்", cart: "கார்ட்", primeDelivery: "விரைவு", ratings: "மதிப்பீடு", tomorrow: "நாளை" },
    inbox: { title: "அதிகாரப்பூர்வ இன்பாக்ஸ்", noMessages: "செய்திகள் இல்லை.", liveUpdates: "நேரலை", priorityHigh: "அவசரம்", priorityGov: "அரசு", priorityWeather: "வானிலை எச்சரிக்கை" },
    authorities: { title: "அதிகாரிகள்", contact: "தொடர்பு", vitals: "தகவல்", directContact: "துறைக்கு அழைக்கவும்", serviceActive: "இப்போது பணியில்", department: "துறை", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "மொழி", selectPreference: "தேர்வு", languageAdaptNotice: "இது உங்கள் மொழியில் மாறும்.", discardClose: "மூடவும்" }
  },
  ml: {
    appName: "അഗ്രി വോയ്‌സ് AI",
    poweredBy: "Gemini AI പിന്തുണയോടെ",
    detectLocation: "ലൊക്കേഷൻ",
    fieldView: "സാറ്റലൈറ്റ്",
    locationInfo: { place: "സ്ഥലം", mandal: "മണ്ഡലം", district: "ജില്ല", detecting: "തിരിച്ചറിയുന്നു..." },
    tabs: { advisor: "വോയ്‌സ് ഉപദേശകൻ", market: "വിപണി", news: "അലേർട്ടുകൾ", store: "സ്റ്റോർ", inbox: "ഇൻബോക്സ്", authorities: "ഉദ്യോഗസ്ഥർ" },
    advisor: {
      welcome: "സ്വാഗതം.",
      subtitle: "നിങ്ങളുടെ കാർഷിക ഗുരു തയ്യാറാണ്. സ്വാഭാവികമായി സംസാരിക്കൂ.",
      forecast: "കാലാവസ്ഥ",
      weatherPulse: "5 ദിവസത്തെ പ്രവചനം",
      tapStart: "സംഭാഷണം തുടങ്ങാം",
      listening: "ശ്രദ്ധിക്കുന്നു...",
      analyzing: "AI ചിന്തിക്കുന്നു...",
      marketPulse: "വിപണി നിലവാരം",
      viewPredictions: "പ്രവചനങ്ങൾ",
      waterAdvice: "ജലനിരപ്പ് ഉപദേശം",
      waterSubtitle: "ശരിയായ നില.",
      openControls: "നിയന്ത്രണങ്ങൾ",
      roi: "ലാഭം",
      soilPH: "മണ്ണിന്റെ pH",
      soilType: "മണ്ണിന്റെ തരം",
      climateTrend: "കാലാവസ്ഥാ പ്രവണത",
      waterLevel: "ജലനിരപ്പ്",
      weatherAlert: "കാർഷിക മുന്നറിയിപ്പ്",
      buySeeds: "വിത്ത് കട",
      buyPremiumSeeds: "വിത്തുകൾ",
      precisionAiInsight: "AI ഉൾക്കാഴ്ച",
      humidity: "ഈർപ്പം",
      wind: "കാറ്റ്",
      subtitleUser: "നിങ്ങൾ",
      subtitleAi: "അഗ്രി വോയ്‌സ് ഗുരു"
    },
    market: { title: "ചന്ത താരതమ്യം", searchPlaceholder: "തിരയുക...", forecastLabel: "AI പ്രവചനം", fromLastWeek: "കഴിഞ്ഞ ആഴ്ച", rateToday: "നിരക്ക്", prediction: "AI പ്രവചനം", compareTitle: "വില താരതమ്യം", mandi: "ചന്ത", price: "വില", trend: "പ്രവണത", mandiComparisonSubtitle: "തത്സമയ ചന്ത നിരക്കുകൾ." },
    news: { title: "വാർത്തകൾ", emergency: "അടിയന്തരം", details: "വിവരങ്ങൾ", pulse: "കാർഷിക തുടിപ്പ്", report: "റിപ്പോർട്ട്", transformTitle: "മാറ്റങ്ങൾ", newsSubtitle: "കാർഷಿಕ, കാലാവസ്ഥാ റിപ്പോർട്ടുകൾ.", priorityAlert: "മുൻഗണനാ മുന്നറിയിപ്പ്", innovation: "നവീകരണം", impactLevel: "ആഘാതം" },
    store: { title: "കാർഷിക ചന്ത", searchPlaceholder: "തിരയുക...", aiSuggestion: "AI നിർദ്ദേശം", buyNow: "വാങ്ങുക", addToCart: "കാർട്ടിലേക്ക്", stock: "ലഭ്യം", results: "ഫലങ്ങൾ", deliveryTo: "ഡെലിവറി", verifiedReviews: "റേറ്റിംഗുകൾ", bestSeller: "മികച്ചത്", amazonClone: "ആമസോൺ", cart: "കാർട്ട്", primeDelivery: "വേഗത", ratings: "റേറ്റിംഗുകൾ", tomorrow: "നാളെ" },
    inbox: { title: "ഔദ്യോഗിക ഇൻബോക്സ്", noMessages: "സന്ദേശങ്ങളില്ല.", liveUpdates: "അപ്‌ഡേറ്റ്", priorityHigh: "അടിയന്തരം", priorityGov: "സർക്കാർ", priorityWeather: "കാലാവസ്ഥാ മുന്നറിയിപ്പ്" },
    authorities: { title: "ഉദ്യോഗസ്ഥർ", contact: "ബന്ധപ്പെടുക", vitals: "വിവരങ്ങൾ", directContact: "വകുപ്പിലേക്ക് വിളിക്കുക", serviceActive: "ഇപ്പോൾ ജോലിയിൽ", department: "വകുപ്പ്", officeHours: "9 AM - 5 PM" },
    common: { languageSettings: "ഭാഷ", selectPreference: "തിരഞ്ഞെടുക്കുക", languageAdaptNotice: "ഇത് നിങ്ങളുടെ ഭാഷയിലേക്ക് മാറും.", discardClose: "അടയ്ക്കുക" }
  }
};
