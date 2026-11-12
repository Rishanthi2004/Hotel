export type ResidenceCategory = 'Luxury' | 'Villa' | 'Normal';
export type FacilityCategory = ResidenceCategory | 'Facilities';

export interface Villa {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: ResidenceCategory;
  sqm: number;
  capacity: string;
  bed: string;
  poolType: string;
  pricePerNight: number;
  description: string;
  coverImage: string;
  imagePosition?: string;
  gallery: { url: string; caption: string }[];
  features: string[];
  specs: { label: string; value: string }[];
  floorPlanSummary: string;
}

export interface FacilityItem {
  id: string;
  code: string;
  subtitle: string;
  category: FacilityCategory;
  imageUrl: string;
  imagePosition?: string;
  sqm?: number;
  capacity: string;
  layout: string;
  view: string;
  description: string;
  cardHighlights: string[];
  highlights: string[];
  villaId?: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  concept: string;
  hours: string;
  dressCode: string;
  sommelierHighlight: string;
  image: string;
  featuredDishes: { name: string; notes: string }[];
}

export interface SpaTreatment {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  focus: string;
}

export interface Experience {
  id: string;
  title: string;
  duration: string;
  timing: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  highlights: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'luxury' | 'villa' | 'normal' | 'facilities';
  imageUrl: string;
  imagePosition?: string;
  cameraExif: string;
  location: string;
  aspect: 'landscape' | 'portrait' | 'wide';
}

const VILLAS: Villa[] = [
  {
    id: 'aura-1',
    code: 'Aura 1',
    name: 'Aura 1 — Vaulted King Luxury Suite',
    subtitle: 'Vaulted King Luxury Suite',
    tagline: 'Airy vaulted ceilings, handcrafted timber lounge seating, and private palm-view balcony',
    category: 'Luxury',
    sqm: 62,
    capacity: 'Up to 2 Guests',
    bed: '1 King Bed',
    poolType: 'Resort Pool & Private Palm Terrace Access',
    pricePerNight: 420,
    description:
      'Our signature luxury suite pairs soaring vaulted ceilings with warm woven textiles, twin wooden armchairs, a built-in window reading bay, and full-height glass balcony doors opening onto swaying tropical palms.',
    coverImage: '/assets/aura-01.jpg',
    imagePosition: 'object-[50%_62%]',
    gallery: [
      { url: '/assets/aura-01.jpg', caption: 'Aura 1 vaulted king luxury suite with reading nook and balcony' },
      { url: '/assets/aura-08.jpg', caption: 'Steps away from the shaded garden terrace lounge' },
    ],
    features: [
      'Vaulted high ceiling with matte-black designer fan',
      'King bed with woven natural runner & crisp linens',
      'Two timber lounge armchairs & round coffee table',
      'Built-in sunlit bay window reading seat',
      'Wall-mounted flat-screen TV & writing desk',
      'Private balcony overlooking tropical palm groves',
    ],
    specs: [
      { label: 'Suite Area', value: '62 m²' },
      { label: 'Category', value: 'Luxury Suite' },
      { label: 'Bedding', value: '1 King Bed' },
      { label: 'Outdoor Space', value: 'Private Balcony Terrace' },
    ],
    floorPlanSummary:
      'Expansive open-plan luxury suite combining a restful king sleeping alcove, twin-armchair sitting lounge, sunlit window bench, and timber balcony doors.',
  },
  {
    id: 'aura-2',
    code: 'Aura 2',
    name: 'Aura 2 — Garden Veranda Luxury Suite',
    subtitle: 'Garden Veranda Luxury Suite',
    tagline: 'Fluted timber accent wall, sofa lounge, and glass door to private lush garden patio',
    category: 'Luxury',
    sqm: 58,
    capacity: 'Up to 2 Guests',
    bed: '1 King Bed',
    poolType: 'Resort Pool & Private Garden Veranda',
    pricePerNight: 390,
    description:
      'Designed around calm natural textures, Aura 2 showcases a vertical fluted timber feature wall, warm sculptural pendant light, plush upholstered sofa lounge, and direct garden veranda access.',
    coverImage: '/assets/aura-02.jpg',
    imagePosition: 'object-[50%_60%]',
    gallery: [
      { url: '/assets/aura-02.jpg', caption: 'Aura 2 fluted timber suite with sofa lounge and garden door' },
      { url: '/assets/aura-08.jpg', caption: 'Surrounded by manicured garden walkways and courtyard seating' },
    ],
    features: [
      'Upholstered King bed with fluted timber headboard wall',
      'Sculptural warm-glow bedside pendant lighting',
      'Plush window-side sofa lounge & patterned area rug',
      'Private garden veranda with outdoor seating',
      'Tray-ceiling ambient cove lighting & ceiling fan',
      'In-room telephone, safe & high-speed Wi-Fi',
    ],
    specs: [
      { label: 'Suite Area', value: '58 m²' },
      { label: 'Category', value: 'Luxury Suite' },
      { label: 'Bedding', value: '1 King Bed' },
      { label: 'Outdoor Space', value: 'Private Garden Veranda' },
    ],
    floorPlanSummary:
      'Thoughtfully zoned luxury bedroom and sitting lounge opening directly onto a private tree-shaded veranda.',
  },
  {
    id: 'aura-3',
    code: 'Aura 3',
    name: 'Aura 3 — Cove-Lit Family Luxury Suite',
    subtitle: 'Cove-Lit Family Luxury Suite',
    tagline: 'Two plush double platform beds with warm cove lighting and panoramic balcony seating',
    category: 'Luxury',
    sqm: 68,
    capacity: 'Up to 4 Guests',
    bed: '2 Double Platform Beds',
    poolType: 'Resort Pool & Panoramic Balcony Access',
    pricePerNight: 460,
    description:
      'Tailored for families or small groups seeking elevated comfort, Aura 3 offers two generous timber platform beds, warm architectural cove lighting, and wide glass doors opening to a breezy balcony with lounge chairs.',
    coverImage: '/assets/aura-03.jpg',
    imagePosition: 'object-[50%_62%]',
    gallery: [
      { url: '/assets/aura-03.jpg', caption: 'Aura 3 cove-lit double suite with timber-framed balcony' },
      { url: '/assets/aura-08.jpg', caption: 'Steps from the shaded courtyard garden lounge' },
    ],
    features: [
      'Two plush double beds on custom teak platform frames',
      'Warm perimeter recessed cove lighting & ceiling fan',
      'Full-width timber-framed glass balcony doors',
      'Private balcony with twin wooden lounge chairs',
      'Vanity desk, wardrobe & en-suite luxury bathroom',
      'Botanical wall paneling & sheer blackout drapery',
    ],
    specs: [
      { label: 'Suite Area', value: '68 m²' },
      { label: 'Category', value: 'Luxury Family Suite' },
      { label: 'Bedding', value: '2 Double Beds' },
      { label: 'Outdoor Space', value: 'Furnished View Balcony' },
    ],
    floorPlanSummary:
      'Generous twin-double luxury sanctuary with continuous tiled flooring, full-height glazing, and an outdoor balcony overlooking tropical greenery.',
  },
  {
    id: 'aura-4',
    code: 'Aura 4',
    name: 'Aura 4 — Ocean Palm Balcony Villa',
    subtitle: 'Ocean Palm Balcony Villa',
    tagline: 'Dark timber floors and floor-to-ceiling black glass doors opening to ocean & palm views',
    category: 'Villa',
    sqm: 48,
    capacity: 'Up to 2 Guests',
    bed: '2 Twin Beds',
    poolType: 'Beachfront & Resort Pool Access',
    pricePerNight: 310,
    description:
      'Framing turquoise ocean horizons through tall coconut palms, Aura 4 pairs dark hardwood-style floors and warm wall sconces with an open balcony terrace, work desk, and breezy coastal light.',
    coverImage: '/assets/aura-04.jpg',
    imagePosition: 'object-[50%_58%]',
    gallery: [
      { url: '/assets/aura-04.jpg', caption: 'Aura 4 ocean palm balcony villa with coastal horizon view' },
      { url: '/assets/aura-08.jpg', caption: 'Short stroll to the shaded garden terrace lounge' },
    ],
    features: [
      'Direct panoramic ocean & coconut palm balcony view',
      'Two comfortable twin beds with warm ambient sconces',
      'Floor-to-ceiling black-framed glass balcony doors',
      'Outdoor balcony seating for sunrise & sunset views',
      'Dedicated timber study desk & designer chair',
      'Dark wood-grain flooring & blackout curtains',
    ],
    specs: [
      { label: 'Villa Area', value: '48 m²' },
      { label: 'Category', value: 'Villa' },
      { label: 'Bedding', value: '2 Twin Beds' },
      { label: 'Outdoor Space', value: 'Ocean-View Glass Balcony' },
    ],
    floorPlanSummary:
      'Bright coastal villa room oriented directly toward the ocean through a full-wall glass facade and private balcony.',
  },
  {
    id: 'aura-5',
    code: 'Aura 5',
    name: 'Aura 5 — Coastal Harbor View Villa',
    subtitle: 'Coastal Harbor View Villa',
    tagline: 'Sunny king bedroom with air-conditioning, ceiling fan, and scenic coastal harbor balcony',
    category: 'Villa',
    sqm: 44,
    capacity: 'Up to 2 Guests',
    bed: '1 King Bed',
    poolType: 'Resort Pool & Coastal Balcony',
    pricePerNight: 285,
    description:
      'Elevated for sweeping coastal bay and island ridge vistas, Aura 5 blends crisp white linens and thoughtful resort hospitality touches with a private outdoor balcony furnished for morning coffee.',
    coverImage: '/assets/aura-05.jpg',
    imagePosition: 'object-[50%_55%]',
    gallery: [
      { url: '/assets/aura-05.jpg', caption: 'Aura 5 king bedroom overlooking coastal bay and hills' },
      { url: '/assets/aura-08.jpg', caption: 'Full resort dining and garden amenities included' },
    ],
    features: [
      'Private balcony overlooking bay waters & green hills',
      'King bed with signature rolled towel welcome art',
      'Split air-conditioning & classic ceiling fan',
      'Flat-screen TV, vanity mirror & timber storage cabinet',
      'Outdoor bistro table & twin balcony chairs',
      'Full blackout curtains & attached bathroom',
    ],
    specs: [
      { label: 'Villa Area', value: '44 m²' },
      { label: 'Category', value: 'Villa' },
      { label: 'Bedding', value: '1 King Bed' },
      { label: 'Outdoor Space', value: 'Bay-View Bistro Balcony' },
    ],
    floorPlanSummary:
      'Airy upper-level villa room featuring an en-suite bath, media console, vanity corner, and wide sliding doors to a coastal balcony.',
  },
  {
    id: 'aura-6',
    code: 'Aura 6',
    name: 'Aura 6 — Standard Comfort Queen Room',
    subtitle: 'Standard Comfort Queen Room',
    tagline: 'Warm wooden queen bed with air-conditioning, kettle bar, and restful blackout drapery',
    category: 'Normal',
    sqm: 34,
    capacity: 'Up to 2 Guests',
    bed: '1 Queen Bed',
    poolType: 'Resort Pool & Garden Access',
    pricePerNight: 195,
    description:
      'A serene, practical sanctuary featuring a handcrafted solid-wood queen bed frame, crisp split air-conditioning, electric kettle with complimentary water, intercom phone, and full blackout curtains.',
    coverImage: '/assets/aura-06.jpg',
    imagePosition: 'object-[50%_62%]',
    gallery: [
      { url: '/assets/aura-06.jpg', caption: 'Aura 6 standard comfort queen room with wooden bedframe' },
    ],
    features: [
      'Solid-wood Queen bed with warm olive accent cushions',
      'High-efficiency split air-conditioning & ceiling fan',
      'Electric kettle & complimentary bottled drinking water',
      'Direct-dial intercom telephone & bedside outlets',
      'Heavy blackout drapes for uninterrupted rest',
      'Attached modern bathroom with fresh towels',
    ],
    specs: [
      { label: 'Room Area', value: '34 m²' },
      { label: 'Category', value: 'Normal' },
      { label: 'Bedding', value: '1 Queen Bed' },
      { label: 'Access', value: 'Pool & Gardens Included' },
    ],
    floorPlanSummary:
      'Clean, well-appointed standard queen room designed for effortless comfort with easy access to all resort grounds.',
  },
  {
    id: 'aura-7',
    code: 'Aura 7',
    name: 'Aura 7 — Standard Cozy Twin Room',
    subtitle: 'Standard Cozy Twin Room',
    tagline: 'Contemporary twin beds with wood-panel headboards, warm bedside lamp, and serene calm',
    category: 'Normal',
    sqm: 32,
    capacity: 'Up to 2 Guests',
    bed: '2 Twin Beds',
    poolType: 'Resort Pool & Garden Access',
    pricePerNight: 185,
    description:
      'Ideal for friends or solo travelers seeking crisp simplicity, Aura 7 pairs twin striped-linen beds against tailored wood-grain headboard panels with soft bedside reading light and cool tiled floors.',
    coverImage: '/assets/aura-07.jpg',
    imagePosition: 'object-[50%_60%]',
    gallery: [
      { url: '/assets/aura-07.jpg', caption: 'Aura 7 standard cozy twin room with wood-panel headboards' },
    ],
    features: [
      'Two single twin beds with crisp striped cotton linens',
      'Floor-to-ceiling wood-grain headboard paneling',
      'Warm shared bedside reading lamp & framed artwork',
      'Air-conditioning & private attached bathroom',
      'Fresh bath & hand towel set provided daily',
      'High-speed Wi-Fi & daily housekeeping',
    ],
    specs: [
      { label: 'Room Area', value: '32 m²' },
      { label: 'Category', value: 'Normal' },
      { label: 'Bedding', value: '2 Twin Beds' },
      { label: 'Access', value: 'Pool & Gardens Included' },
    ],
    floorPlanSummary:
      'Streamlined twin bedroom offering calm minimalist finishes, bright neutral walls, and full access to Aura resort facilities.',
  },
];

const RESORT_FACILITIES: FacilityItem[] = [
  ...VILLAS.map((v) => ({
    id: v.id,
    code: v.code,
    subtitle: v.subtitle,
    category: v.category as FacilityCategory,
    imageUrl: v.coverImage,
    imagePosition: v.imagePosition,
    sqm: v.sqm,
    capacity: v.capacity,
    layout: v.bed,
    view: v.specs[3]?.value ?? 'Resort View',
    description: v.description,
    cardHighlights: [
      v.bed,
      `${v.capacity} · ${v.sqm} m²`,
      v.specs[3]?.value ?? 'Resort Access',
    ],
    highlights: v.features.slice(0, 5),
    villaId: v.id,
  })),
  {
    id: 'aura-8',
    code: 'Aura 8',
    subtitle: 'Shaded Garden Terrace Lounge',
    category: 'Facilities',
    imageUrl: '/assets/aura-08.jpg',
    imagePosition: 'object-[50%_52%]',
    capacity: 'Outdoor Lounge & Café',
    layout: 'Covered Stone Patio & Lawn',
    view: 'Tropical Garden & Café Seating',
    description:
      'A breezy shaded pavilion bordered by flowering flame-tree blossoms and potted palms, opening out onto an inviting sunlit stone patio and lawn seating area for afternoon tea and quiet conversation.',
    cardHighlights: [
      'Covered Patio Seating',
      'Tropical Garden & Lawn',
      'Outdoor Tea & Coffee Lounge',
    ],
    highlights: [
      'Shaded stone-paved courtyard & outdoor lounge tables',
      'Surrounded by blooming tropical flame trees & palms',
      'Relaxed open-air spot for coffee & evening drinks',
      'Warm heritage lantern lighting after dusk',
      'Seamless indoor-outdoor flow to garden lawns',
    ],
  },
];

export const RESORT_DATA = {
  name: 'Aura',
  established: 2021,
  elevation: 'Coastal Palm & Garden Sanctuary',
  location: 'Aura Coastal Resort & Villas',
  coordinates: 'Tropical Garden & Seafront Estate',
  userImages: {
    heroPoolPavilion: '/assets/hero-infinity-pool.jpg',
    oceanVilla: '/assets/aura-04.jpg',
    gardenLounge: '/assets/aura-08.jpg',
    poolCourtyard: '/assets/facilities-pool-bg.jpg',
  },

  stats: [
    { label: 'Luxury Suites', value: 'Aura 1 – 3' },
    { label: 'Private Villas', value: 'Aura 4 – 5' },
    { label: 'Normal Rooms', value: 'Aura 6 – 7' },
    { label: 'Garden Lounge', value: 'Aura 8' },
  ],

  villas: VILLAS,
  facilities: RESORT_FACILITIES,

  dining: [
    {
      id: 'garden-terrace-lounge',
      name: 'Aura 8 — Shaded Garden Terrace Lounge',
      subtitle: 'Open-Air Courtyard Café & Morning Breakfast',
      concept:
        'Set beside flowering tropical trees and manicured lawns, serving fresh morning breakfast, herbal teas, and relaxed evening refreshments.',
      hours: 'Breakfast: 07:30 – 10:30 · Lunch: 12:30 – 15:30 · Dinner: 18:30 – 22:00',
      dressCode: 'Resort Casual',
      sommelierHighlight: 'Chilled coastal botanical infusions and curated table wines.',
      image: '/assets/aura-08.jpg',
      featuredDishes: [
        { name: 'Coastal Catch of the Day', notes: 'Coconut herb emulsion, grilled garden greens, citrus' },
        { name: 'Tropical Courtyard Breakfast', notes: 'Warm sourdough, seasonal mango, island honey' },
      ],
    },
  ] as DiningVenue[],

  spaTreatments: [] as SpaTreatment[],
  experiences: [] as Experience[],

  gallery: [
    {
      id: 'gal-aura-1',
      title: 'Aura 1 — Vaulted King Luxury Suite',
      category: 'luxury',
      imageUrl: '/assets/aura-01.jpg',
      imagePosition: 'object-[50%_62%]',
      cameraExif: 'Luxury · 62 m² · King Bed · Bay Window & Terrace',
      location: 'Aura 1 · Luxury Wing',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-2',
      title: 'Aura 2 — Garden Veranda Luxury Suite',
      category: 'luxury',
      imageUrl: '/assets/aura-02.jpg',
      imagePosition: 'object-[50%_60%]',
      cameraExif: 'Luxury · 58 m² · King Bed · Fluted Timber & Sofa',
      location: 'Aura 2 · Luxury Wing',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-3',
      title: 'Aura 3 — Cove-Lit Family Luxury Suite',
      category: 'luxury',
      imageUrl: '/assets/aura-03.jpg',
      imagePosition: 'object-[50%_62%]',
      cameraExif: 'Luxury · 68 m² · 2 Double Beds · Cove Lighting & Balcony',
      location: 'Aura 3 · Luxury Wing',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-4',
      title: 'Aura 4 — Ocean Palm Balcony Villa',
      category: 'villa',
      imageUrl: '/assets/aura-04.jpg',
      imagePosition: 'object-[50%_58%]',
      cameraExif: 'Villa · 48 m² · Twin Beds · Ocean Horizon Balcony',
      location: 'Aura 4 · Seafront Villa',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-5',
      title: 'Aura 5 — Coastal Harbor View Villa',
      category: 'villa',
      imageUrl: '/assets/aura-05.jpg',
      imagePosition: 'object-[50%_55%]',
      cameraExif: 'Villa · 44 m² · King Bed · Coastal Bay Balcony',
      location: 'Aura 5 · Harbor View Villa',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-6',
      title: 'Aura 6 — Standard Comfort Queen Room',
      category: 'normal',
      imageUrl: '/assets/aura-06.jpg',
      imagePosition: 'object-[50%_62%]',
      cameraExif: 'Normal · 34 m² · Queen Bed · AC & Kettle Bar',
      location: 'Aura 6 · Standard Wing',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-7',
      title: 'Aura 7 — Standard Cozy Twin Room',
      category: 'normal',
      imageUrl: '/assets/aura-07.jpg',
      imagePosition: 'object-[50%_60%]',
      cameraExif: 'Normal · 32 m² · Twin Beds · Wood Headboards',
      location: 'Aura 7 · Standard Wing',
      aspect: 'portrait',
    },
    {
      id: 'gal-aura-8',
      title: 'Aura 8 — Shaded Garden Terrace Lounge',
      category: 'facilities',
      imageUrl: '/assets/aura-08.jpg',
      imagePosition: 'object-[50%_52%]',
      cameraExif: 'Facility · Covered Stone Patio & Garden Seating',
      location: 'Aura 8 · Courtyard Lounge',
      aspect: 'portrait',
    },
  ] as GalleryPhoto[],
};
