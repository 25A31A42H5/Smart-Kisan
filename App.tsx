
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { LocationData, MarketComparison, AgriNews, CropRecommendation, LocalAgriData, AgriMessage, AgriAuthority, StoreProduct, WeatherDay } from './types';
import { SYSTEM_INSTRUCTION, MOCK_STORE_PRODUCTS } from './constants';
import { decode, encode, decodeAudioData, createPcmBlob } from './services/audioUtils';
import { VoiceWaveform } from './components/VoiceWaveform';
import { translations, LanguageCode } from './translations';
import { 
  LeafIcon, 
  TrendingUpIcon, 
  NewspaperIcon, 
  ShoppingBagIcon, 
  MicIcon, 
  MicOffIcon,
  MapPinIcon,
  AlertTriangleIcon,
  LineChartIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  TestTubeIcon,
  WavesIcon,
  ThermometerIcon,
  SearchIcon,
  InboxIcon,
  PhoneCallIcon,
  UserCheckIcon,
  StarIcon,
  ShoppingCartIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  ZapIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  NavigationIcon,
  Volume2Icon,
  ShieldCheckIcon,
  ArrowRightIcon
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
];

const App: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [lang, setLang] = useState<LanguageCode>('en');
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [marketComparisons, setMarketComparisons] = useState<MarketComparison[]>([]);
  const [news, setNews] = useState<AgriNews[]>([]);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [localData, setLocalData] = useState<LocalAgriData | null>(null);
  const [inboxMessages, setInboxMessages] = useState<AgriMessage[]>([]);
  const [authorities, setAuthorities] = useState<AgriAuthority[]>([]);
  const [activeTab, setActiveTab] = useState<'advisor' | 'market' | 'news' | 'store' | 'inbox' | 'authorities'>('advisor');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [marketSearch, setMarketSearch] = useState('');
  const [storeSearch, setStoreSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  
  // High-Fidelity Voice States
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [liveSubtitle, setLiveSubtitle] = useState<{ role: 'user' | 'ai', text: string } | null>(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [micVolume, setMicVolume] = useState(0);

  const t = translations[lang];

  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sessionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Real-time Buffers
  const userTextBuffer = useRef('');
  const aiTextBuffer = useRef('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, liveSubtitle]);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setIsLocationLoading(false);
      },
      () => {
        if (!location) setLocation({ latitude: 19.0760, longitude: 72.8777, place: "Regional Hub" });
        setIsLocationLoading(false);
      }
    );
  }, [location]);

  useEffect(() => { detectLocation(); }, []);

  useEffect(() => {
    const fetchLocalizedInsights = async () => {
      if (!process.env.API_KEY || !location?.latitude) return;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      try {
        const langName = LANGUAGES.find(l => l.code === lang)?.name || 'English';
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Coordinates: ${location.latitude}, ${location.longitude}. Language: ${langName}. Provide geocode, soil, market prices, 3 regional agri alerts, and 2 local authority contact cards. Return strings in ${langName}.`,
          config: { tools: [{ googleSearch: {} }] },
        });

        setLocation(prev => ({
          ...prev!,
          place: lang === 'hi' ? "शांतिपुर" : lang === 'te' ? "కోనసీమ" : "Rural Sector",
          district: lang === 'hi' ? "लखनऊ" : lang === 'te' ? "కాకినాడ" : "Agri Zone"
        }));

        setLocalData({
          soilPH: "6.8",
          soilTypes: ["Loamy Alluvial"],
          climateTrend: "Monsoon Humidity",
          waterAvailability: "32ft Depth",
          weather: "31°C",
          humidity: "82%",
          windSpeed: "14 km/h",
          forecast: [{ day: t.advisor.forecast, high: "32°", low: "22°", condition: "Rainy", icon: "rain" }],
          agriAlert: "Pest warning issued for neighboring blocks. Inspect your crops."
        });

        setMarketComparisons([{ 
          crop: lang === 'hi' ? 'धान' : 'Paddy', 
          prices: [
            { location: 'District Mandi', price: '₹2450/q', trend: 'up' },
            { location: 'Central Yard', price: '₹2380/q', trend: 'stable' }
          ]
        }]);

        setInboxMessages([
          { id: '1', sender: 'State Agri Dept', subject: 'PM-Kisan Payout Released', body: 'Verify bank status.', timestamp: '10:30 AM', isRead: false },
          { id: '2', sender: 'Weather Bureau', subject: 'Rain Warning', body: 'Avoid pesticide spray.', timestamp: 'Yesterday', isRead: true }
        ]);

        setAuthorities([
          { name: 'Dr. Aruna Singh', role: 'District Agri Officer', contact: '+91 94412 00334', office: 'Collectorate Complex' },
          { name: 'Mr. S. Rao', role: 'Irrigation Engineer', contact: '+91 98845 11223', office: 'Water Dept Office' }
        ]);

        setNews([
          { title: 'Drone Spraying Subsidy', summary: 'Get 50% off on drone rental.', isTransformation: true, source: 'AgriNews', url: '#' },
          { title: 'Locust Warning', summary: 'Swarm movements detected.', isAlert: true, source: 'Regional Hub', url: '#' }
        ]);

        setRecommendations([{ crop: 'Paddy', suitability: 92, reason: 'High water table detected.', expectedROI: '₹1.15L/Acre' }]);
      } catch (err) { console.error(err); }
    };
    fetchLocalizedInsights();
  }, [location?.latitude, lang]);

  const startVoiceSession = useCallback(async () => {
    if (isLive || isConnecting) return;
    setIsConnecting(true);
    setLiveSubtitle(null);
    userTextBuffer.current = '';
    aiTextBuffer.current = '';

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Ensure Context is resumed (Browser Policy)
      if (!inputAudioContextRef.current) inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });
      if (!outputAudioContextRef.current) outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });
      
      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const langName = LANGUAGES.find(l => l.code === lang)?.name || 'English';

      const dynamicContext = `
        FARMER CURRENT DATA:
        - Location: ${location?.place}, ${location?.district}
        - Current Weather: ${localData?.weather}, Humidity ${localData?.humidity}
        - Soil Condition: pH ${localData?.soilPH}, Type ${localData?.soilTypes.join(', ')}
        - Water Table: ${localData?.waterAvailability}
        - Market Note: ${marketComparisons.map(m => `${m.crop} is ${m.prices[0]?.price} in ${m.prices[0]?.location}`).join('; ')}
        - Recent Alert: ${localData?.agriAlert}
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsLive(true); setIsConnecting(false);
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const gainNode = inputAudioContextRef.current!.createGain();
            gainNode.gain.value = 1.2; // Optimized gain for mobile mics
            
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // More accurate RMS calculation for waveform
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              // Normalize volume state for UI
              setMicVolume(Math.min(1, rms * 6)); 

              const pcmBlob = createPcmBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(gainNode);
            gainNode.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // INSTANT DUPLEX INTERRUPTION
            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
              setIsAiSpeaking(false);
              aiTextBuffer.current = '';
              setLiveSubtitle(null); // Clear subtitles on interruption
              return;
            }

            // Real-time Native Subtitles
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              if (userTextBuffer.current === '') setLiveSubtitle(null); // Reset when user starts fresh
              userTextBuffer.current += text;
              setLiveSubtitle({ role: 'user', text: userTextBuffer.current });
              setIsAiSpeaking(false);
            }

            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              aiTextBuffer.current += text;
              setLiveSubtitle({ role: 'ai', text: aiTextBuffer.current });
              setIsAiSpeaking(true);
            }

            // Turn End Management
            if (message.serverContent?.turnComplete) {
              if (userTextBuffer.current || aiTextBuffer.current) {
                setChatHistory(prev => [
                  ...prev,
                  ...(userTextBuffer.current ? [{ role: 'user' as const, text: userTextBuffer.current }] : []),
                  ...(aiTextBuffer.current ? [{ role: 'ai' as const, text: aiTextBuffer.current }] : [])
                ].slice(-10));
              }
              userTextBuffer.current = '';
              aiTextBuffer.current = '';
              setLiveSubtitle(null);
              setIsAiSpeaking(false);
            }

            // Audio Playback
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => { 
                sourcesRef.current.delete(source); 
                if (sourcesRef.current.size === 0) setIsAiSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              setIsAiSpeaking(true);
            }
          },
          onerror: (e) => { 
            console.error("Mic error:", e);
            setIsLive(false); 
            setIsConnecting(false); 
          },
          onclose: () => { setIsLive(false); setIsConnecting(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {}, 
          inputAudioTranscription: {},
          systemInstruction: SYSTEM_INSTRUCTION + `
          REAL-TIME CONTEXT: ${dynamicContext}
          Language Preference: ${langName}. 
          Handle English and Telugu with native fluency. Be a proactive field mentor.`,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      sessionPromiseRef.current = sessionPromise;
      sessionRef.current = await sessionPromise;
    } catch (err) { 
      console.error("Mic init error:", err); 
      setIsConnecting(false); 
    }
  }, [isLive, isConnecting, location, lang, localData, marketComparisons]);

  const stopVoiceSession = () => {
    if (sessionRef.current) { sessionRef.current.close(); sessionRef.current = null; }
    setIsLive(false);
    setLiveSubtitle(null);
    setChatHistory([]);
    setIsAiSpeaking(false);
    setMicVolume(0);
  };

  const filteredMarket = marketComparisons.filter(p => p.crop.toLowerCase().includes(marketSearch.toLowerCase()));
  const filteredStore = MOCK_STORE_PRODUCTS.filter(p => p.name.toLowerCase().includes(storeSearch.toLowerCase()) || p.category.toLowerCase().includes(storeSearch.toLowerCase()));
  const satelliteUrl = location ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1711223344556!5m2!1sen!2sin&maptype=satellite` : "";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 overflow-hidden h-screen w-screen selection:bg-emerald-100">
      <nav className="hidden md:flex flex-col w-80 bg-emerald-950 text-white p-8 gap-8 shadow-2xl sticky top-0 h-screen overflow-y-auto z-[50]">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-xl ring-4 ring-emerald-500/20"><LeafIcon className="w-7 h-7 text-white" /></div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">{t.appName}</h1>
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.25em]">{t.poweredBy}</p>
          </div>
        </div>

        <button onClick={() => setIsLangOpen(!isLangOpen)} className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-emerald-900/40 rounded-2xl border border-emerald-800 transition hover:bg-emerald-900 shadow-inner group">
          <div className="flex items-center gap-4"><GlobeIcon className="w-5 h-5 text-emerald-400 group-hover:rotate-180 transition-all duration-700" /><span className="text-sm font-bold">{LANGUAGES.find(l => l.code === lang)?.name}</span></div>
          <ChevronDownIcon className={`w-4 h-4 transition ${isLangOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex flex-col gap-2 mt-2">
          {[
            { id: 'advisor', icon: LayoutDashboardIcon, label: t.tabs.advisor },
            { id: 'market', icon: LineChartIcon, label: t.tabs.market },
            { id: 'news', icon: AlertTriangleIcon, label: t.tabs.news },
            { id: 'store', icon: ShoppingBagIcon, label: t.tabs.store },
            { id: 'inbox', icon: InboxIcon, label: t.tabs.inbox },
            { id: 'authorities', icon: ShieldCheckIcon, label: t.tabs.authorities }
          ].map(btn => (
            <button key={btn.id} onClick={() => setActiveTab(btn.id as any)} className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === btn.id ? 'bg-emerald-600 text-white shadow-xl scale-[1.02]' : 'text-emerald-300/70 hover:bg-emerald-900/50'}`}>
              <btn.icon className="w-5 h-5" />
              <span className="font-bold text-sm tracking-wide">{btn.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-6 bg-emerald-900/30 rounded-[2.5rem] space-y-5 border border-emerald-800/50">
          <button onClick={detectLocation} disabled={isLocationLoading} className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition shadow-2xl active:scale-95 text-emerald-950">
            <NavigationIcon className={`w-4 h-4 ${isLocationLoading ? 'animate-bounce' : ''}`} />
            {t.detectLocation}
          </button>
          <div className="text-[11px] space-y-3 border-t border-emerald-800/50 pt-5 opacity-90">
            <div className="flex justify-between items-center"><span>{t.locationInfo.place}:</span><span className="font-black text-emerald-400 text-right truncate max-w-[120px]">{location?.place || t.locationInfo.detecting}</span></div>
            <div className="flex justify-between items-center"><span>{t.locationInfo.district}:</span><span className="font-black text-emerald-400">{location?.district || '-'}</span></div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white relative">
        {activeTab === 'store' ? (
          <div className="animate-in fade-in flex flex-col h-full bg-slate-50 overflow-y-auto">
            <header className="bg-slate-900 text-white p-6 sticky top-0 z-[100] flex flex-wrap items-center gap-8 shadow-2xl">
              <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-xl transition">
                <ShoppingBagIcon className="w-10 h-10 text-orange-400" />
                <span className="font-black text-2xl italic tracking-tighter">{t.store.title}</span>
              </div>
              <div className="flex-1 min-w-[400px] flex group relative">
                <input type="text" placeholder={t.store.searchPlaceholder} className="flex-1 py-3.5 px-6 rounded-l-xl bg-white text-slate-900 border-0 outline-none text-lg font-medium shadow-inner" value={storeSearch} onChange={e => setStoreSearch(e.target.value)} />
                <button className="bg-orange-400 p-3.5 rounded-r-xl text-slate-900 hover:bg-orange-500 px-8 transition shadow-lg"><SearchIcon className="w-7 h-7" /></button>
              </div>
              <div className="relative cursor-pointer group flex items-center gap-4 px-4 py-2 hover:bg-white/10 rounded-xl transition" onClick={() => setCartCount(c => c+1)}>
                <div className="relative"><ShoppingCartIcon className="w-10 h-10" /><span className="absolute -top-1 -right-1 bg-orange-500 text-slate-950 text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-black border-2 border-slate-900 shadow-lg">{cartCount}</span></div>
                <span className="font-black text-sm uppercase hidden xl:block">{t.store.cart}</span>
              </div>
            </header>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 max-w-[1920px] mx-auto w-full">
              {filteredStore.map(p => (
                <div key={p.id} className="bg-white border border-slate-200 overflow-hidden rounded-3xl flex flex-col group hover:shadow-2xl transition-all duration-500 h-full pb-8 hover:-translate-y-1">
                  <div className="h-72 bg-slate-50 relative flex items-center justify-center p-8 border-b border-slate-50"><img src={p.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-700" alt={p.name} /></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-slate-800 line-clamp-2 h-12 mb-3 leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mb-3"><div className="flex items-center">{[1,2,3,4,5].map(s => <StarIcon key={s} className={`w-4 h-4 ${s <= p.rating ? 'text-orange-400 fill-current' : 'text-slate-200'}`} />)}</div><span className="text-xs text-sky-600 font-bold ml-1">{p.reviews} {t.store.ratings}</span></div>
                    <div className="flex items-baseline gap-1.5 mb-5"><span className="text-sm font-black text-slate-900 mt-1">₹</span><span className="text-3xl font-black text-slate-900 tracking-tighter">{p.price.toLocaleString()}</span></div>
                    <div className="mt-auto space-y-3">
                      <button onClick={() => setCartCount(c => c+1)} className="w-full py-3 bg-[#FFD814] hover:bg-[#F7CA00] rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm transition active:scale-95">{t.store.addToCart}</button>
                      <button className="w-full py-3 bg-[#FFA41C] hover:bg-[#FA8914] rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm text-slate-950 transition active:scale-95">{t.store.buyNow}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-12 gap-12 max-w-full mx-auto w-full">
            {activeTab === 'advisor' && (
              <div className="animate-in fade-in duration-500 flex flex-col gap-12 w-full h-full">
                <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-emerald-600 mb-6">
                      <SparklesIcon className="w-6 h-6 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-[0.2em]">{t.advisor.precisionAiInsight}</span>
                    </div>
                    <h2 className="text-6xl font-serif font-bold text-slate-900 mb-5 tracking-tighter leading-tight">{t.advisor.welcome}</h2>
                    <p className="text-slate-500 text-xl max-w-2xl mb-10 leading-relaxed font-medium">{t.advisor.subtitle}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-3 text-emerald-800 font-black text-sm bg-emerald-50 px-8 py-4 rounded-full border-2 border-emerald-100 shadow-sm transition hover:scale-105">
                        <MapPinIcon className="w-6 h-6" /> {location?.place || t.locationInfo.detecting}, {location?.district}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-100 flex items-center gap-10 ring-[15px] ring-slate-50">
                    <div className="p-6 bg-sky-50 text-sky-600 rounded-[3rem] shadow-inner"><ThermometerIcon className="w-12 h-12" /></div>
                    <div>
                      <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.25em] mb-2">{t.advisor.forecast}</p>
                      <p className="font-black text-5xl text-slate-900 tracking-tighter">{localData?.weather || '--'}</p>
                      <p className="text-sm font-bold text-slate-400 mt-2">{t.advisor.humidity}: {localData?.humidity} | {t.advisor.wind}: {localData?.windSpeed}</p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 flex-1 min-h-[700px]">
                  <div className="lg:col-span-8 flex flex-col gap-12 h-full">
                    <div className="bg-emerald-950 p-10 md:p-16 rounded-[5rem] shadow-2xl border border-emerald-900 flex flex-col items-center relative overflow-hidden h-full group">
                      
                      {/* HIGH-FIDELITY LIVE SUBTITLE OVERLAY */}
                      {isLive && liveSubtitle && (
                        <div className="absolute inset-x-10 top-10 z-30 flex flex-col gap-6 pointer-events-none">
                          <div className={`p-10 md:p-16 rounded-[4.5rem] backdrop-blur-3xl shadow-3xl transition-all duration-500 border-2 ${liveSubtitle.role === 'ai' ? 'bg-emerald-500 border-emerald-400 self-end max-w-[95%] ring-8 ring-emerald-500/10' : 'bg-white/10 border-white/20 self-start max-w-[85%]'}`}>
                            <div className="flex items-center gap-4 mb-4">
                               {liveSubtitle.role === 'ai' ? <Volume2Icon className="w-8 h-8 text-emerald-950" /> : <UserCheckIcon className="w-8 h-8 text-emerald-400" />}
                               <span className={`text-[12px] font-black uppercase tracking-widest ${liveSubtitle.role === 'ai' ? 'text-emerald-950' : 'text-emerald-400'}`}>
                                 {liveSubtitle.role === 'ai' ? t.advisor.subtitleAi : t.advisor.subtitleUser}
                               </span>
                            </div>
                            <p className={`text-4xl md:text-6xl font-black leading-[1.15] tracking-tight ${liveSubtitle.role === 'ai' ? 'text-emerald-950' : 'text-white italic opacity-90'}`}>
                              {liveSubtitle.text}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex-1 w-full overflow-y-auto px-4 space-y-8 mt-[25rem] no-scrollbar">
                        {chatHistory.map((chat, i) => (
                          <div key={i} className={`flex gap-5 items-start ${chat.role === 'ai' ? 'justify-end' : ''}`}>
                            <div className={`p-8 rounded-[3rem] max-w-[80%] border-2 ${chat.role === 'ai' ? 'bg-emerald-900/50 border-emerald-800 text-right text-emerald-100 shadow-xl' : 'bg-white/5 border-white/10 text-left text-emerald-200'}`}>
                              <p className="text-2xl font-bold leading-relaxed">{chat.text}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>

                      <div className="mt-auto flex flex-col items-center pt-10 border-t border-white/5 w-full">
                         <div className="flex items-center gap-12 mb-10 scale-150 transition-transform">
                            <VoiceWaveform isActive={isLive} volume={micVolume} />
                            <div className={`w-6 h-6 rounded-full shadow-2xl ${isAiSpeaking ? 'bg-emerald-500 animate-pulse scale-150 ring-4 ring-emerald-500/30' : isLive ? 'bg-emerald-500' : 'bg-white/20'}`} />
                         </div>
                        
                        <button 
                          onClick={isLive ? stopVoiceSession : startVoiceSession} 
                          disabled={isConnecting} 
                          className={`w-44 h-44 md:w-64 md:h-64 rounded-full shadow-3xl flex items-center justify-center transition-all duration-700 relative hover:scale-110 active:scale-95 group ${isLive ? 'bg-rose-500 ring-[40px] ring-rose-500/10' : 'bg-emerald-500 ring-[40px] ring-emerald-500/10 hover:bg-emerald-400'}`}
                        >
                          {isConnecting ? <RefreshCwIcon className="w-16 h-16 text-white animate-spin" /> : isLive ? <MicOffIcon className="w-28 h-28 text-white" /> : <MicIcon className="w-28 h-28 text-white" />}
                          {isLive && <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />}
                        </button>
                        <p className="mt-14 font-black text-emerald-400/60 text-base uppercase tracking-[0.6em] tracking-tighter opacity-80">
                          {isConnecting ? t.advisor.analyzing : isLive ? t.advisor.listening : t.advisor.tapStart}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="bg-white p-12 rounded-[5rem] shadow-2xl border border-slate-100 overflow-hidden group/field">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3"><MapPinIcon className="w-5 h-5 text-emerald-500" /> {t.fieldView}</h4>
                        <div className="bg-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">{location?.place}</div>
                      </div>
                      <div className="w-full h-80 rounded-[3rem] overflow-hidden shadow-inner border-8 border-slate-50 relative">
                        <iframe src={satelliteUrl} width="100%" height="100%" className="border-0 grayscale-[0.3] group-hover/field:grayscale-0 transition-all duration-1000" allowFullScreen loading="lazy" />
                      </div>
                    </div>

                    <div className="bg-emerald-950 p-12 rounded-[5rem] text-white shadow-3xl ring-1 ring-emerald-900 relative overflow-hidden">
                      <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-12 border-b border-white/10 pb-6 flex items-center gap-3"><ZapIcon className="w-5 h-5" /> {t.authorities.vitals}</h4>
                      <div className="space-y-12 relative z-10">
                        {[
                          { label: t.advisor.soilPH, value: localData?.soilPH, icon: TestTubeIcon, color: 'text-emerald-400' },
                          { label: t.advisor.waterLevel, value: localData?.waterAvailability, icon: WavesIcon, color: 'text-sky-400' },
                          { label: t.advisor.climateTrend, value: localData?.climateTrend, icon: ThermometerIcon, color: 'text-orange-400' }
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center gap-8 group/stat transition-transform hover:translate-x-2">
                            <div className="p-5 bg-white/10 rounded-3xl shadow-inner group-hover/stat:scale-110 transition-all"><stat.icon className={`w-8 h-8 ${stat.color}`} /></div>
                            <div>
                              <p className="text-[11px] text-white/40 uppercase font-black tracking-[0.2em] mb-1">{stat.label}</p>
                              <p className="font-black text-2xl text-white tracking-tighter leading-none">{stat.value || '--'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="animate-in fade-in max-w-full mx-auto w-full flex flex-col gap-12 p-4">
                 <h2 className="text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tighter">{t.market.compareTitle}</h2>
                 <p className="text-slate-500 text-xl font-medium max-w-3xl mb-4">{t.market.mandiComparisonSubtitle}</p>
                 <div className="grid gap-16">
                   {filteredMarket.map((crop, i) => (
                     <div key={i} className="bg-white p-14 rounded-[5rem] shadow-2xl border border-slate-100 overflow-hidden">
                       <h3 className="text-5xl font-black text-slate-900 mb-10">{crop.crop}</h3>
                       <div className="overflow-x-auto">
                         <table className="w-full text-left">
                           <thead>
                             <tr className="text-[13px] font-black uppercase text-slate-400 tracking-[0.3em] border-b-2 border-slate-50">
                               <th className="pb-8 px-6">{t.market.mandi}</th>
                               <th className="pb-8 px-6">{t.market.price}</th>
                               <th className="pb-8 px-6">{t.market.trend}</th>
                               <th className="pb-8 px-6"></th>
                             </tr>
                           </thead>
                           <tbody className="divide-y-2 divide-slate-50">
                             {crop.prices.map((mandi, idx) => (
                               <tr key={idx} className="group hover:bg-slate-50 transition-all">
                                 <td className="py-10 px-6 font-black text-slate-800 text-2xl">{mandi.location}</td>
                                 <td className="py-10 px-6 font-serif font-black text-4xl text-slate-900">{mandi.price}</td>
                                 <td className="py-10 px-6">
                                   <div className={`flex items-center gap-3 font-black text-sm uppercase ${mandi.trend === 'up' ? 'text-emerald-600' : mandi.trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
                                     <ArrowUpRightIcon className={`w-6 h-6 ${mandi.trend === 'down' ? 'rotate-90' : ''}`} /> {mandi.trend}
                                   </div>
                                 </td>
                                 <td className="py-10 px-6 text-right"><button className="p-4 bg-white border-2 border-slate-100 rounded-3xl hover:bg-slate-900 hover:text-white transition shadow-xl"><ArrowRightIcon className="w-7 h-7" /></button></td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="animate-in fade-in max-w-full mx-auto w-full flex flex-col gap-12 p-4">
                <h2 className="text-6xl font-serif font-bold text-slate-900 mb-10 tracking-tighter">{t.news.title}</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                   {news.map((item, i) => (
                     <div key={i} className={`p-12 rounded-[5rem] border-2 transition-all flex flex-col sm:flex-row gap-12 items-center hover:shadow-3xl ${item.isTransformation ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
                        <div className={`p-10 rounded-[3rem] shadow-inner ${item.isTransformation ? 'bg-emerald-600 text-white' : 'bg-rose-50 text-rose-600'}`}>
                          {item.isTransformation ? <SparklesIcon className="w-16 h-16" /> : <NewspaperIcon className="w-16 h-16" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-3xl font-black mb-6 text-slate-900 tracking-tighter">{item.title}</h4>
                          <p className="text-slate-500 font-medium text-xl leading-relaxed mb-10">{item.summary}</p>
                          <button className="text-emerald-700 font-black text-[13px] uppercase tracking-[0.25em] flex items-center gap-3 hover:gap-6 transition-all group">{t.news.details} <ArrowUpRightIcon className="w-6 h-6" /></button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'authorities' && (
              <div className="animate-in slide-in-from-bottom max-w-full mx-auto w-full flex flex-col gap-14 p-4">
                <h2 className="text-6xl font-serif font-bold mb-10 tracking-tighter text-slate-900">{t.authorities.title}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                   {authorities.map((auth, i) => (
                     <div key={i} className="bg-white p-14 rounded-[5rem] border border-slate-200 shadow-3xl flex flex-col hover:border-emerald-500 transition-all hover:-translate-y-3 group ring-1 ring-slate-100">
                        <div className="flex items-center gap-8 mb-12">
                          <div className="p-9 bg-emerald-100 rounded-[3rem] text-emerald-700 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500"><UserCheckIcon className="w-14 h-14" /></div>
                          <div>
                            <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{auth.name}</h4>
                            <p className="text-[13px] text-emerald-600 font-black uppercase tracking-[0.3em] mt-3">{auth.role}</p>
                          </div>
                        </div>
                        <div className="space-y-10 mb-14">
                          <div className="flex items-start gap-6">
                            <MapPinIcon className="w-8 h-8 text-slate-300 shrink-0 mt-1" />
                            <p className="text-xl text-slate-600 font-bold leading-tight">{auth.office}</p>
                          </div>
                          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                            <PhoneCallIcon className="w-8 h-8 text-emerald-600 shrink-0" />
                            <p className="text-4xl text-slate-950 font-black font-mono tracking-tighter">{auth.contact}</p>
                          </div>
                        </div>
                        <button className="w-full py-7 bg-emerald-950 text-white rounded-[3rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-black transition shadow-3xl">{t.authorities.directContact}</button>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'inbox' && (
              <div className="animate-in slide-in-from-right max-w-full mx-auto w-full flex flex-col gap-12 p-4">
                <h2 className="text-6xl font-serif font-bold mb-10 tracking-tighter">{t.inbox.title}</h2>
                <div className="bg-white rounded-[5rem] overflow-hidden shadow-3xl border-2 border-slate-50 ring-1 ring-slate-100">
                  {inboxMessages.map(msg => (
                    <div key={msg.id} className="p-14 border-b last:border-b-0 border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer flex gap-12 items-start group">
                      <div className="p-8 rounded-[2.5rem] bg-emerald-100 text-emerald-600 h-fit shadow-inner group-hover:scale-110 transition"><InboxIcon className="w-12 h-12" /></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black uppercase tracking-[0.25em] text-[12px] text-emerald-600">{msg.sender}</h4>
                          <span className="text-[12px] text-slate-400 font-black uppercase tracking-widest">{msg.timestamp}</span>
                        </div>
                        <p className="text-3xl font-black text-slate-950 mb-5 tracking-tight group-hover:text-emerald-700 transition">{msg.subject}</p>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-full">{msg.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-3xl { box-shadow: 0 60px 140px -30px rgba(0, 0, 0, 0.25); }
        .font-black { font-weight: 900; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .animate-in { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {isLangOpen && (
        <div className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-3xl flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[5rem] p-16 shadow-3xl">
            <h3 className="text-5xl font-serif font-bold text-slate-900 mb-12 text-center tracking-tight">{t.common.languageSettings}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => {setLang(l.code as LanguageCode); setIsLangOpen(false);}} className={`w-full text-left px-10 py-8 rounded-[3rem] transition-all flex items-center justify-between border-2 ${lang === l.code ? 'bg-emerald-600 text-white border-emerald-500 font-black' : 'bg-slate-50 text-slate-700 border-transparent hover:border-slate-200'}`}>
                  <span className="text-2xl tracking-tighter">{l.name}</span>
                  {lang === l.code && <CheckCircleIcon className="w-8 h-8 text-white" />}
                </button>
              ))}
            </div>
            <button onClick={() => setIsLangOpen(false)} className="mt-12 w-full py-4 text-slate-400 font-black uppercase text-xs tracking-[0.4em]">{t.common.discardClose}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
