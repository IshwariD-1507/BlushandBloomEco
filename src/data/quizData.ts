import { QuizQuestion, QuizResult } from '../types';

export const SKINCARE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How does your skin feel midday, about 4 hours after washing?',
    subtitle: 'This reveals your fundamental sebum production balance.',
    options: [
      { label: 'Tight, parched, or noticeably dry', description: 'Craves immediate moisture and rich hydration', tag: 'dry' },
      { label: 'Shiny all over, particularly forehead & cheeks', description: 'Active sebaceous glands prone to pore congestion', tag: 'oily' },
      { label: 'Oily along T-zone (nose & forehead), normal on cheeks', description: 'Classic combination skin with localized zones', tag: 'combination' },
      { label: 'Comfortable, neither dry nor oily', description: 'Balanced moisture levels and resilient barrier', tag: 'normal' }
    ]
  },
  {
    id: 2,
    question: 'What is your primary skin intention or challenge right now?',
    subtitle: 'Select the goal you want your botanical ritual to solve first.',
    options: [
      { label: 'Persistent dullness & dark spots (Pigmentation)', description: 'Seeking uniform radiant tone and glow', tag: 'pigmentation' },
      { label: 'Frequent blemishes, clogged pores & redness', description: 'Need gentle clarification without barrier disruption', tag: 'acne' },
      { label: 'Fine lines, loss of firmness & early aging signs', description: 'Want deep cellular restoration & collagen support', tag: 'aging' },
      { label: 'Dehydrated, rough patches & reactive sensitivity', description: 'Restoring damaged barrier with soothing hydration', tag: 'dehydration' }
    ]
  },
  {
    id: 3,
    question: 'What environmental climate do you live in within India?',
    subtitle: 'Indian weather varies vastly and changes skin needs.',
    options: [
      { label: 'Coastal & humid (e.g. Mumbai, Chennai, Kolkata)', description: 'High humidity, requires breathable, non-comedogenic textures', tag: 'humid' },
      { label: 'Dry heat or extreme winters (e.g. Delhi NCR, Jaipur, Punjab)', description: 'Hard seasonal shifts, high particulate pollution exposure', tag: 'dry_climate' },
      { label: 'Moderate / temperate plateau (e.g. Bengaluru, Pune)', description: 'Relatively balanced climate, mild breezes', tag: 'temperate' },
      { label: 'Tropical hill station or Western Ghats', description: 'Fresh crisp air, alternating moisture and sun exposure', tag: 'tropical' }
    ]
  },
  {
    id: 4,
    question: 'How does your skin react to new active ingredients or weather changes?',
    subtitle: 'Helping us gauge formulation sensitivity tolerances.',
    options: [
      { label: 'Very sensitive: flushes red, stings, or burns easily', description: 'Demands fragrance-free, calming anti-inflammatory herbs', tag: 'sensitive' },
      { label: 'Occasionally reactive around cheekbones or seasonal shifts', description: 'Prefers gentle adaptogenic botanicals', tag: 'moderate_sensitivity' },
      { label: 'Resilient: rarely reacts or gets irritated', description: 'Can easily handle active cold-pressed seed oils & botanicals', tag: 'resilient' }
    ]
  },
  {
    id: 5,
    question: 'What kind of texture brings you the most sensory joy?',
    subtitle: 'Sustainable self-care should feel divine every single day.',
    options: [
      { label: 'Velvety golden facial oils with natural botanic aroma', description: 'Rich, sensorial, nourishing overnight repair', tag: 'rich_oils' },
      { label: 'Lightweight water-jellies & cooling botanical hydro-mists', description: 'Instant absorption with zero sheen', tag: 'light_gels' },
      { label: 'Whipped cloud-like emulsions and airy cremes', description: 'Smooth cushiony barrier protection', tag: 'creams' }
    ]
  },
  {
    id: 6,
    question: 'How do you view sustainability in your daily skincare routine?',
    subtitle: 'Blush & Bloom creates zero-waste circular loops for you.',
    options: [
      { label: 'I want 100% refillable amber glass & zero single-use plastic', description: 'Ready to visit partner refill stores for 50% discount', tag: 'zero_waste_strict' },
      { label: 'I care deeply about cruelty-free & clean Indian organic actives', description: 'Transparency in ethical farming and non-greenwashed claims', tag: 'clean_actives' },
      { label: 'I love that every purchase plants a native tree in India', description: 'Contributing directly to reforestation and farmer livelihoods', tag: 'tree_impact' }
    ]
  }
];

export const HAIRCARE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your natural hair strand texture and thickness?',
    subtitle: 'Determines the weight of oils and botanical nutrients your hair needs.',
    options: [
      { label: 'Fine, thin strands that get weighed down easily', description: 'Needs lightweight water tonics and follicle stimulation', tag: 'fine' },
      { label: 'Medium wavy or straight hair with moderate density', description: 'Needs balanced moisture and frizz control', tag: 'medium' },
      { label: 'Coarse, thick, curly or coily hair (Type 3 / 4)', description: 'Thrives on dense cold-pressed butter and deep conditioning', tag: 'curly_thick' }
    ]
  },
  {
    id: 2,
    question: 'What is your primary scalp condition right now?',
    subtitle: 'A thriving root environment is the source of all healthy hair.',
    options: [
      { label: 'Excess oiliness within 24 hours of shampooing', description: 'Hyperactive sebum with flat roots', tag: 'oily_scalp' },
      { label: 'Dry, flaky, or itchy scalp that feels tight', description: 'Microbiome imbalance requiring soothing Ayurvedic oils', tag: 'dry_scalp' },
      { label: 'Excessive shedding / hair fall during brushing & washing', description: 'Weakened follicle roots needing active botanical peptide tonic', tag: 'hairfall' },
      { label: 'Balanced scalp with minimal issues', description: 'Focus on shine preservation and length retention', tag: 'balanced' }
    ]
  },
  {
    id: 3,
    question: 'Do you deal with hard water or high tap water chlorine?',
    subtitle: 'Over 70% of Indian urban homes face hard water hair damage.',
    options: [
      { label: 'Yes, hard borewell/tanker water is making hair brittle & dull', description: 'Mineral buildup requires chelating antioxidant botanical rinse', tag: 'hard_water_high' },
      { label: 'Sometimes, or when traveling between cities', description: 'Noticeable frizz and roughness after washing', tag: 'hard_water_moderate' },
      { label: 'No, I have a shower filter or soft water supply', description: 'Standard environmental exposure', tag: 'soft_water' }
    ]
  },
  {
    id: 4,
    question: 'Have you undergone chemical coloring, keratin, or heat styling recently?',
    subtitle: 'Identifies cuticle damage and protein requirements.',
    options: [
      { label: 'Yes, chemical dye, bleach, or straightening treatments', description: 'Porosity is high; requires pea protein and sealants', tag: 'chemically_treated' },
      { label: 'Frequent blow-drying, curling wands, or flat irons', description: 'Thermal damage needs protective seed oils', tag: 'heat_styled' },
      { label: 'Completely natural hair with minimal heat exposure', description: 'Healthy cuticle needing botanical maintenance', tag: 'virgin_hair' }
    ]
  },
  {
    id: 5,
    question: 'How often do you enjoy a traditional oil massage (Champi)?',
    subtitle: 'The ancient Indian ritual of grounding and root nourishment.',
    options: [
      { label: 'Weekly sacred ritual before head washes', description: 'Prefers deep herbal copper-infused oils', tag: 'weekly_champi' },
      { label: 'Once a month or whenever I feel stressed', description: 'Looking for a calming sensory experience', tag: 'monthly' },
      { label: 'Rarely, because traditional oils feel too heavy to wash out', description: 'Wants fast-absorbing, non-sticky formulations', tag: 'lightweight_pref' }
    ]
  },
  {
    id: 6,
    question: 'What is your ultimate dream hair transformation?',
    subtitle: 'We craft your personalized botanical regimen around this.',
    options: [
      { label: 'Visible density, thicker ponytail & reduced hair fall', description: 'Stimulate roots with Amla, Rosemary & Brahmi', tag: 'density' },
      { label: 'Silky, mirror-like shine with zero frizz in humidity', description: 'Restorative plant lipids and silicone-free butter', tag: 'frizz_free' },
      { label: 'Healthy, flake-free, clean scalp that breathes', description: 'Purify follicles and eliminate micro-dandruff', tag: 'clean_scalp' }
    ]
  }
];

export function calculateSkincareResult(answers: Record<number, string>): QuizResult {
  const q1 = answers[1]; // oiliness
  const q2 = answers[2]; // concern

  if (q2 === 'pigmentation' || q2 === 'aging') {
    return {
      title: 'Kashmiri Radiance & Cell Renewal Ritual',
      subtitle: 'Formulated for Deep Glow & Pigmentation Correction',
      description: 'Your skin is primed for high-potency Ayurvedic antioxidants. Our clinically proven Bakuchiol and Kashmiri Saffron work synergistically to fade hyperpigmentation, shield against urban smog, and restore youthful bounce without irritation.',
      doshaOrProfile: 'Pitta-Vata Balancing Profile',
      recommendedProductIds: [
        'prod-kumkumadi-bakuchiol',
        'prod-saffron-day-creme',
        'prod-wild-rose-nectar'
      ],
      ritualSteps: [
        'Step 1: Cleanse with lukewarm water and mist with Wild Vetiver',
        'Step 2: Morning lock-in with Saffron & Licorice Radiance Day Crème',
        'Step 3: Evening treatment with 3 drops of Kumkumadi & Bakuchiol Youth Elixir'
      ]
    };
  }

  if (q1 === 'oily' || q2 === 'acne') {
    return {
      title: 'Botanical Clarifying & Pore Balancing Routine',
      subtitle: 'Gentle Antimicrobial Protection Without Moisture Stripping',
      description: 'Your answers indicate an active lipid barrier that needs soothing antibacterial support, not harsh drying alcohols. Organic Neem and Gotu Kola calm active breakouts while Khus Vetiver regulates midday sheen.',
      doshaOrProfile: 'Kapha-Pitta Clarifying Profile',
      recommendedProductIds: [
        'prod-neem-centella-cleanser',
        'prod-vetiver-moringa-mist',
        'prod-wild-rose-nectar'
      ],
      ritualSteps: [
        'Step 1: Purify morning & night with Neem Leaf & Centella Gel Cleanser',
        'Step 2: Spritz cooling Wild Vetiver Hydro-Mist across face and neck',
        'Step 3: Seal with a pea-sized amount of Wild Rose Nectar for weightless barrier defense'
      ]
    };
  }

  // Default: Deep Barrier Hydration
  return {
    title: 'Himalayan Nectar & Barrier Shield Ritual',
    subtitle: 'Deep Cellular Hydration & Environmental Defense',
    description: 'Your profile thrives on moisture-retention bio-sugars and gentle botanical lipids. Our cold-distilled Himalayan rose and snow mushroom infuse parched cells with round-the-clock bounce while soothing micro-redness.',
    doshaOrProfile: 'Vata Hydration Profile',
    recommendedProductIds: [
      'prod-wild-rose-nectar',
      'prod-vetiver-moringa-mist',
      'prod-kumkumadi-bakuchiol'
    ],
    ritualSteps: [
      'Step 1: Gentle rinse and saturate skin with Vetiver & Moringa Mist',
      'Step 2: Press Wild Rose & Snow Mushroom Nectar into damp skin',
      'Step 3: At bedtime, seal with 2-3 drops of Kumkumadi & Bakuchiol Elixir'
    ]
  };
}

export function calculateHaircareResult(answers: Record<number, string>): QuizResult {
  const goal = answers[6]; // dream hair
  const scalp = answers[2]; // scalp condition

  if (goal === 'density' || scalp === 'hairfall') {
    return {
      title: 'Ayurvedic Density & Follicle Revival Regimen',
      subtitle: 'Targeted Root Anchor Peptides & 21-Day Herbal Infusions',
      description: 'Engineered specifically to reverse stress shedding, nourish dormant hair bulbs, and strengthen hair strands against mineral water damage using wild Bhringraj and cold-pressed Amla.',
      doshaOrProfile: 'Follicle Rejuvenation Protocol',
      recommendedProductIds: [
        'prod-amla-bhringraj-hair-oil',
        'prod-brahmi-tonic',
        'prod-coconut-fenugreek-mask'
      ],
      ritualSteps: [
        'Step 1: Apply Brahmi & Jaborandi Tonic every morning directly to parting lines',
        'Step 2: Warm Amla & Rosemary Oil in copper bowl; massage roots 2x weekly for 15 mins',
        'Step 3: Post-wash mask treatment with Methi Butter for 10 minutes to prevent breakage'
      ]
    };
  }

  return {
    title: 'Nourishing Coconut & Botanical Hair Repair Ritual',
    subtitle: 'Silicone-Free Frizz Defense & Hard Water Restorative Mask',
    description: 'Designed for hair challenged by city tap water, heat, or humidity. Fresh coconut cream and sprouted fenugreek seal open hair cuticles and wrap strands in breathable gloss.',
    doshaOrProfile: 'Cuticle Alignment & Deep Moisture Profile',
    recommendedProductIds: [
      'prod-coconut-fenugreek-mask',
      'prod-amla-bhringraj-hair-oil',
      'prod-brahmi-tonic'
    ],
    ritualSteps: [
      'Step 1: Pre-wash scalp oiling with Amla & Bhringraj 1 hour before bath',
      'Step 2: Mid-lengths to tips deep treatment with Coconut & Methi Butter Mask',
      'Step 3: Daily spray of Brahmi Tonic on ends to protect against split ends'
    ]
  };
}
