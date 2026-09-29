export interface Ingredient {
  id: string;
  name: string;
  sanskritName: string;
  botanicalName: string;
  harvestRegion: string;
  category: 'herb' | 'flower' | 'bioactive' | 'adaptogen';
  summary: string;
  ayurvedicOrigins: string;
  activeCompounds: string[];
  skinHairBenefits: string[];
  doshaEffect: string;
  usedInProductIds: string[];
  accentColor: string;
}

export const INGREDIENT_GLOSSARY: Ingredient[] = [
  {
    id: 'saffron',
    name: 'Kashmiri Saffron (Kumkumadi)',
    sanskritName: 'Kumkuma / Kesar',
    botanicalName: 'Crocus Sativus',
    harvestRegion: 'Pampore Plateau, Jammu & Kashmir',
    category: 'herb',
    summary: 'The golden crown of Ayurvedic cosmetology, hand-harvested at sunrise during the autumn blossom.',
    ayurvedicOrigins: 'Mentioned extensively in the Charaka Samhita and Ashtanga Hridaya as the supreme Varnya (complexion illuminating) herb. Traditional Kumkumadi formulations steep crimson stigmas in goat milk and sesame oil over low heat for 72 hours.',
    activeCompounds: ['Crocin', 'Safranal', 'Picrocrocin', 'Kaempferol'],
    skinHairBenefits: [
      'Inhibits tyrosinase enzyme to fade stubborn dark spots and acne blemishes',
      'Provides potent radical-scavenging carotenoids that reverse photoaging',
      'Imparts a natural luminescent golden flush to fatigued, sallow skin'
    ],
    doshaEffect: 'Balances Tridosha (Pitta, Vata, and Kapha)',
    usedInProductIds: ['prod-kumkumadi-bakuchiol', 'prod-saffron-day-creme', 'prod-festive-forest-hamper'],
    accentColor: '#DDA15E'
  },
  {
    id: 'bakuchiol',
    name: 'Plant Bakuchiol (1% Pure Clean Active)',
    sanskritName: 'Bakuchi / Babchi',
    botanicalName: 'Psoralea Corylifolia Seed',
    harvestRegion: 'Central Indian Organic Plains (Madhya Pradesh)',
    category: 'bioactive',
    summary: 'The clinically verified botanical alternative to retinol, offering cell turnover without peeling or photosensitivity.',
    ayurvedicOrigins: 'Revered for millennia in Classical Ayurveda for Rasayana (rejuvenation) and Kushta-hara (skin purifying) therapies. Modern chromatography isolates pure Bakuchiol monomer while eliminating irritating psoralens.',
    activeCompounds: ['Meroterpene Phenol (Bakuchiol)', 'Corylifolin', 'Flavonoid Glycosides'],
    skinHairBenefits: [
      'Stimulates Type I and Type IV collagen synthesis equivalent to topical tretinoin',
      'Protects cellular lipid matrix from oxidative peroxidation without erythema or stinging',
      'Completely photo-stable: safe for morning and tropical summer usage'
    ],
    doshaEffect: 'Pacifies aggravated Kapha and Pitta',
    usedInProductIds: ['prod-kumkumadi-bakuchiol', 'prod-festive-forest-hamper'],
    accentColor: '#E8A87C'
  },
  {
    id: 'amla',
    name: 'Organic Cold-Pressed Amla',
    sanskritName: 'Amalaki / Dhatri (The Sustainer)',
    botanicalName: 'Phyllanthus Emblica',
    harvestRegion: 'Pratapgarh Certified Organic Groves, Uttar Pradesh',
    category: 'herb',
    summary: 'The premier antioxidant super-fruit containing 20x the concentration of Vitamin C found in oranges.',
    ayurvedicOrigins: 'Named "Dhatri" (the divine nurse/mother) because it cares for all bodily tissues (Dhatus). In hair science, slow copper-infusion of fresh Amla juice into black sesame oil has been the definitive Ayurvedic secret for dense hair.',
    activeCompounds: ['Low molecular weight Hydrolyzable Tannins (Emblicanin A & B)', 'Gallic Acid', 'Ellagic Acid'],
    skinHairBenefits: [
      'Strengthens the hair follicle root sheath (dermal papilla) against seasonal shedding',
      'Inhibits 5-alpha reductase activity to prevent follicle miniaturization',
      'Naturally deposits dark protective melanin precursors to slow premature greying'
    ],
    doshaEffect: 'Soothes high Pitta (heat) on scalp & skin',
    usedInProductIds: ['prod-amla-bhringraj-hair-oil', 'prod-festive-forest-hamper'],
    accentColor: '#587B66'
  },
  {
    id: 'bhringraj',
    name: 'Wild Forest Bhringraj',
    sanskritName: 'Keshraj (King of Hair)',
    botanicalName: 'Eclipta Alba / Prostrata',
    harvestRegion: 'Western Ghats Wetland Valleys, Karnataka',
    category: 'herb',
    summary: 'Celebrated in classical texts as the absolute king of scalp wellness and follicle awakening.',
    ayurvedicOrigins: 'Bhavaprakasha Nighantu designates Bhringraj as Keshya (that which promotes lush hair growth). It is picked fresh while in bloom and blended into botanical oils to cool the head and calm the mind.',
    activeCompounds: ['Wedelolactone', 'Demethylwedelolactone', 'Bio-Flavonoids', 'Phytosterols'],
    skinHairBenefits: [
      'Accelerates transition of dormant hair follicles from telogen (resting) to anagen (growth) phase',
      'Significantly increases hair density and strand diameter within 6-8 weeks',
      'Eliminates dry micro-flakes and itchy scalp inflammation'
    ],
    doshaEffect: 'Deeply cools Pitta and grounds excess Vata',
    usedInProductIds: ['prod-amla-bhringraj-hair-oil'],
    accentColor: '#43634E'
  },
  {
    id: 'desi-gulab',
    name: 'Himalayan Desi Gulab (Wild Rose)',
    sanskritName: 'Shatapatri (Hundred-Petaled Flower)',
    botanicalName: 'Rosa Damascena',
    harvestRegion: 'Pushkar & Kannauj Traditional Distilleries',
    category: 'flower',
    summary: 'Steam-distilled in traditional copper Deg-Bhapka stills without synthetic fragrances or preservatives.',
    ayurvedicOrigins: 'Shatapatri is classified as Hridya (heart gladdening) and Pitta-shamaka (fire pacifying). In Indian ritual medicine, pure rose hydrosol cools inflamed skin and restores balance to overstressed dermal cells.',
    activeCompounds: ['Geraniol', 'Citronellol', 'Phenylethyl Alcohol', 'Quercetin'],
    skinHairBenefits: [
      'Restores optimal dermal pH and tightens enlarged pores after cleansing',
      'Replenishes natural cellular hydration without leaving a greasy sheen',
      'Relieves urban heat rashes and micro-redness caused by sun and air pollution'
    ],
    doshaEffect: 'Intensely pacifies Pitta and elevates subtle Ojas',
    usedInProductIds: ['prod-wild-rose-nectar', 'prod-zero-waste-starter-box', 'prod-festive-forest-hamper'],
    accentColor: '#E39794'
  },
  {
    id: 'snow-mushroom',
    name: 'Tremella Snow Mushroom',
    sanskritName: 'Shweta Chhatra',
    botanicalName: 'Tremella Fuciformis',
    harvestRegion: 'High-Altitude Himalayan Foothills',
    category: 'bioactive',
    summary: 'Nature’s supreme moisture magnet, holding over 500 times its molecular weight in pure mountain water.',
    ayurvedicOrigins: 'Tremella’s small-particle polysaccharides penetrate deeper than synthetic hyaluronic acid, creating a flexible, breathable moisture cushion over the stratum corneum.',
    activeCompounds: ['Acidic Heteropolysaccharides', 'Glucuronic Acid', 'Mannose Matrix'],
    skinHairBenefits: [
      'Delivers superior sustained moisture retention without tacky residue',
      'Plumps fine dehydration lines and reinforces barrier defense against urban pollution',
      'Calms irritated cutaneous receptors following temperature extremes'
    ],
    doshaEffect: 'Nourishes Vata (dryness) and stabilizes cellular Prana',
    usedInProductIds: ['prod-wild-rose-nectar'],
    accentColor: '#D4A59D'
  },
  {
    id: 'neem',
    name: 'Organic Neem Leaf & Bark',
    sanskritName: 'Arishta (The Reliever of Sickness)',
    botanicalName: 'Azadirachta Indica',
    harvestRegion: 'Arid Regenerative Groves, Rajasthan & Gujarat',
    category: 'herb',
    summary: 'The ultimate botanical purifier, renowned for balancing excess oil and eliminating blemish bacteria.',
    ayurvedicOrigins: 'Revered in Sanskrit medical texts as "Sarva Roga Nivarini" (curer of all ailments). Its leaves are used in traditional ubtans to cleanse the skin without stripping the delicate lipid moisture barrier.',
    activeCompounds: ['Nimbin', 'Nimbidin', 'Azadirachtin', 'Quercetin Glycosides'],
    skinHairBenefits: [
      'Cleanses active acne-causing bacteria (P. acnes) without drying alcohols',
      'Regulates excessive sebum excretion along the T-zone',
      'Reduces pore swelling and accelerates post-inflammatory recovery'
    ],
    doshaEffect: 'Strongly reduces Kapha and clears aggravated Pitta',
    usedInProductIds: ['prod-neem-centella-cleanser', 'prod-zero-waste-starter-box'],
    accentColor: '#758A7A'
  },
  {
    id: 'centella',
    name: 'Centella Asiatica (Gotu Kola)',
    sanskritName: 'Mandukaparni (Frog-Leafed Rejuvenator)',
    botanicalName: 'Centella Asiatica',
    harvestRegion: 'Western Ghats Stream Banks, Kerala',
    category: 'adaptogen',
    summary: 'A potent adaptogenic herb known for micro-circulation, wound healing, and collagen building.',
    ayurvedicOrigins: 'Celebrated in the Medhya Rasayana group of herbs for longevity and regeneration. When applied topically, it accelerates micro-vascularization and re-epithelialization of sensitized skin.',
    activeCompounds: ['Madecassoside', 'Asiaticoside', 'Madecassic Acid', 'Asiatic Acid'],
    skinHairBenefits: [
      'Repairs compromised skin barrier damaged by harsh exfoliants or chemical peels',
      'Soothes acute dermal burning, redness, and stinging sensations',
      'Promotes cellular matrix synthesis for bouncy, supple skin'
    ],
    doshaEffect: 'Tridoshic, with a cooling emphasis on Pitta',
    usedInProductIds: ['prod-neem-centella-cleanser', 'prod-zero-waste-starter-box'],
    accentColor: '#587B66'
  },
  {
    id: 'vetiver',
    name: 'South Indian Khus (Wild Vetiver)',
    sanskritName: 'Ushira (The Earth Root)',
    botanicalName: 'Vetiveria Zizanioides',
    harvestRegion: 'Rain-Fed Scented Riverbanks, Tamil Nadu',
    category: 'herb',
    summary: 'A deeply grounding, aromatic root distillate known as the "Oil of Tranquility".',
    ayurvedicOrigins: 'Ushira is prescribed in Ayurveda for Daha-prashamana (alleviating inner burning and heat). Its roots are hydro-distilled into a crisp, cooling hydrosol that balances skin moisture during humid Indian summers.',
    activeCompounds: ['Khusimol', 'Vetivone', 'Isovalencenol', 'Sesquiterpenes'],
    skinHairBenefits: [
      'Balances skin surface flora and tightens lax pore openings',
      'Instantly relieves midday heat flush, perspiration burn, and fatigue',
      'Imparts a lingering therapeutic earthy scent that calms sensory stress'
    ],
    doshaEffect: 'Deeply cools excessive Pitta and settles nervous Vata',
    usedInProductIds: ['prod-vetiver-moringa-mist', 'prod-zero-waste-starter-box'],
    accentColor: '#839E88'
  },
  {
    id: 'fenugreek',
    name: 'Sprouted Fenugreek (Methi) & Coconut Cream',
    sanskritName: 'Methika',
    botanicalName: 'Trigonella Foenum-Graecum & Cocos Nucifera',
    harvestRegion: 'Coastal Kerala & Coastal Maharashtra',
    category: 'herb',
    summary: 'A protein-dense Ayurvedic mucilage that creates a silky protective glaze around damaged hair shafts.',
    ayurvedicOrigins: 'Sprouted Methi seeds release natural mucilage and phytoestrogens that hydrate porous hair strands. Combined with raw coconut cream, it mimics keratin treatments without formaldehyde or synthetic silicones.',
    activeCompounds: ['Galactomannan Mucilage', 'Trigonelline', 'Diosgenin', 'Lauric Fatty Acids'],
    skinHairBenefits: [
      'Seals split ends and protects hair cuticles against mineral buildup from tap water',
      'Provides natural detangling slip for curly, coily, and frizzy hair textures',
      'Enhances strand tensile strength and natural high-shine gloss'
    ],
    doshaEffect: 'Pacifies Vata (roughness) and Kapha (root weakness)',
    usedInProductIds: ['prod-coconut-fenugreek-mask'],
    accentColor: '#8C9A8E'
  }
];
