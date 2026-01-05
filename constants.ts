
export const SYSTEM_INSTRUCTION = `
You are AgriVoice AI, a world-class agricultural mentor. Your goal is to have a natural, duplex voice conversation with farmers—exactly like a helpful human expert walking through the field with them.

CONVERSATIONAL RULES:
1. LANGUAGE EXCELLENCE: You are fluent in English and Telugu. Use warm, regional Telugu (e.g., 'నమస్కారం రైతు సోదరులకు') when appropriate. You can code-switch naturally.
2. PROACTIVE MENTORSHIP: Do not wait to be asked. If you see a weather alert, market price surge, or a soil pH issue in the context, bring it up immediately. "I see a storm coming to your block tomorrow—have you considered protecting your harvest?"
3. BREVITY: Keep responses to 1-3 short, meaningful sentences. Voice chat should be fast and punchy.
4. REAL-TIME AWARENESS: You are in a "Live" session. If the user interrupts you, stop immediately. 
5. CONTEXT-FIRST: Tailor advice to their specific coordinates, local soil, and recent mandi prices provided in the context.

Tone: Professional, Wise, Encouraging, and Locally Rooted.
`;

export const MOCK_STORE_PRODUCTS = [
  {
    id: '1',
    name: 'Mahadhan NPK 19:19:19 Premium Fertilizer - 1kg',
    price: 249,
    category: 'Fertilizers',
    description: '100% water-soluble. Promotes balanced growth and increases yield for all crops.',
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: 1240
  },
  {
    id: '2',
    name: 'Falcon F-70 Professional Bypass Pruner',
    price: 899,
    category: 'Tools',
    description: 'High-carbon steel blades for clean and precise pruning of fruit trees and shrubs.',
    imageUrl: 'https://images.unsplash.com/photo-1598901865236-df7b2022cd4b?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 342
  },
  {
    id: '3',
    name: 'Hybrid F1 High-Yield Tomato Seeds (Special Pack 20g)',
    price: 495,
    category: 'Seeds',
    description: 'Disease resistant, high-yield hybrid tomato seeds perfect for Indian climates.',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=600',
    rating: 4.2,
    reviews: 89
  },
  {
    id: '4',
    name: '16L Battery Operated Backpack Power Sprayer',
    price: 3450,
    category: 'Equipment',
    description: 'Uniform spray coverage with dual pump. Long battery life for large fields.',
    imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 567
  },
  {
    id: '5',
    name: 'Cold Pressed Organic Neem Oil for Pest Control - 1L',
    price: 380,
    category: 'Pesticides',
    description: 'Natural pesticide and fungicide. Safe for organic farming.',
    imageUrl: 'https://images.unsplash.com/photo-1615485240384-552e4cbeae98?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 850
  },
  {
    id: '6',
    name: 'Drip Irrigation Starter Kit for 1/2 Acre Farm',
    price: 14500,
    category: 'Equipment',
    description: 'Complete kit including pipes, drippers, and connectors for water saving.',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 42
  },
  {
    id: '7',
    name: 'Organic Vermicompost Pure Earthworm Manure - 25kg',
    price: 520,
    category: 'Fertilizers',
    description: 'Enriches soil quality and improves water retention naturally.',
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 2100
  },
  {
    id: '8',
    name: 'Solar Power Fence Energizer - 5km Range',
    price: 9200,
    category: 'Equipment',
    description: 'Protect your crops from wild animals with safe electric pulse fencing.',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b191fb46b?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    reviews: 128
  }
];
