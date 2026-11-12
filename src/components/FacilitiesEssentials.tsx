import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Banknote,
  BatteryCharging,
  Building2,
  Coffee,
  Compass,
  Droplets,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  SquareParking,
  Store,
  Tent,
  Users,
  Utensils,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
  X,
} from 'lucide-react';
import { useScrollSectionVisible } from './ScrollSection';

interface EssentialFacility {
  id: string;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface NearbyPlace {
  id: string;
  name: string;
  distance: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const CORE_FACILITIES: EssentialFacility[] = [
  {
    id: 'power-backup',
    label: 'Power Backup',
    detail: 'Uninterrupted generator and inverter backup across all rooms and villas.',
    icon: BatteryCharging,
  },
  {
    id: 'air-conditioning',
    label: 'Air conditioning',
    detail: 'Individual split climate control and ceiling fans in every stay.',
    icon: Wind,
  },
  {
    id: 'ample-parking',
    label: 'Ample Parking',
    detail: 'Dedicated on-site guest parking steps from the garden courtyard.',
    icon: SquareParking,
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    detail: 'Fresh morning breakfast served daily in our courtyard dining area.',
    icon: Coffee,
  },
  {
    id: 'conference-hall',
    label: 'Conference Hall',
    detail: 'Private gathering and retreat hall available for group sessions.',
    icon: Building2,
  },
  {
    id: 'dining-area',
    label: 'Dining Area',
    detail: 'Open-air dining space and shaded garden seating.',
    icon: Utensils,
  },
  {
    id: 'family-friendly',
    label: 'Family-friendly',
    detail: 'Spacious twin-double suites, garden lawns, and calm family spaces.',
    icon: Users,
  },
  {
    id: 'free-wifi',
    label: 'Free Wifi',
    detail: 'Complimentary high-speed wireless internet throughout the property.',
    icon: Wifi,
  },
  {
    id: 'kitchen',
    label: 'Fully equipped Kitchen',
    detail: 'Modern resort kitchen and in-room tea & coffee kettle setup.',
    icon: UtensilsCrossed,
  },
  {
    id: 'local-experiences',
    label: 'Local Experiences',
    detail: 'Curated local excursions, village walks, and guided day trips.',
    icon: Store,
  },
  {
    id: 'long-stay',
    label: 'Long Stay Discounts',
    detail: 'Preferential seasonal rates for extended retreats.',
    icon: Banknote,
  },
  {
    id: 'luxury-camping',
    label: 'Luxury Camping',
    detail: 'Outdoor lawn experiences and serene open-sky evenings.',
    icon: Tent,
  },
];

const EXTRA_FACILITIES: EssentialFacility[] = [
  {
    id: 'swimming-pool',
    label: 'Swimming Pool',
    detail: 'Crystal-clear outdoor resort pool surrounded by garden blooms.',
    icon: Waves,
  },
  {
    id: 'daily-housekeeping',
    label: 'Daily Housekeeping',
    detail: 'Fresh linens, towel service, and attentive room care every day.',
    icon: Sparkles,
  },
  {
    id: 'hot-water',
    label: '24/7 Hot Water',
    detail: 'Attached modern bathrooms with continuous hot and cold water.',
    icon: Droplets,
  },
  {
    id: 'concierge',
    label: '24/7 Security & Desk',
    detail: 'Round-the-clock on-site assistance and gated property peace of mind.',
    icon: ShieldCheck,
  },
  {
    id: 'garden-access',
    label: 'Garden & Lounge Access',
    detail: 'Shaded pathways leading to the garden terrace lounge.',
    icon: Compass,
  },
];

const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: 'nedungulam-bus-stop',
    name: 'Nedungulam Bus Stop',
    distance: '1.5 km · 5 min',
    description: 'Local bus stop with frequent services connecting nearby towns and villages.',
    icon: MapPin,
  },
  {
    id: 'sankagiri-fort',
    name: 'Sankagiri Fort',
    distance: '8.5 km · 20 min',
    description: 'Historic hilltop fort offering panoramic views and ancient stone ramparts.',
    icon: Landmark,
  },
  {
    id: 'kaveri-viewpoint',
    name: 'Cauvery River Viewpoint',
    distance: '12 km · 25 min',
    description: 'Calm riverside overlook ideal for morning walks and sunset photography.',
    icon: Waves,
  },
  {
    id: 'local-market',
    name: 'Town Heritage Market',
    distance: '4.2 km · 12 min',
    description: 'Regional spices, fresh farm produce, and traditional local crafts.',
    icon: Store,
  },
];

export const FacilitiesEssentials: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const isSectionVisible = useScrollSectionVisible();
  const [showAllModal, setShowAllModal] = useState(false);

  const allFacilities = [...CORE_FACILITIES, ...EXTRA_FACILITIES];

  useEffect(() => {
    if (!showAllModal) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAllModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAllModal]);

  return (
    <div className="relative overflow-hidden py-8 sm:py-12 md:py-16 border-b border-teal-900/10 dark:border-stone-800/80">
      {/* Clear Resort Pool Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/facilities-pool-bg.jpg"
          alt="Crystal-clear outdoor resort swimming pool surrounded by garden blooms and stone patio"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-950/32 dark:bg-stone-950/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* LEFT SIDE: Compact Facilities */}
          <div className="lg:col-span-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 sm:mb-4 flex items-end justify-between gap-3"
            >
              <div>
                <h2 className="text-lg sm:text-2xl font-bold font-serif-luxury text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Facilities
                </h2>
                <p className="mt-0.5 text-[11px] sm:text-xs text-stone-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                  Comfort-first stay essentials.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(true)}
                className="shrink-0 rounded-full px-3 sm:px-3.5 py-1 bg-white/95 dark:bg-stone-900/95 border border-white/80 dark:border-stone-700 text-[11px] font-semibold text-teal-800 dark:text-teal-300 shadow-md hover:bg-white dark:hover:border-stone-500 transition-colors cursor-pointer"
              >
                <span className="sm:hidden">View all ({allFacilities.length})</span>
                <span className="hidden sm:inline">View all</span>
              </button>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {CORE_FACILITIES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : Math.min(idx, 11) * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${
                      idx >= 6 ? 'hidden sm:flex' : 'flex'
                    } rounded-lg sm:rounded-xl bg-white/95 dark:bg-stone-900/92 border border-white/80 dark:border-stone-800 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_4px_14px_rgba(15,23,42,0.12)] items-center gap-2 sm:gap-2.5 transition-colors hover:border-teal-600/60 dark:hover:border-teal-400/50`}
                  >
                    <Icon className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" strokeWidth={2} />
                    <span className="text-[11px] sm:text-xs font-medium text-slate-800 dark:text-stone-200 leading-tight truncate sm:whitespace-normal">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Compact Nearby Attractions */}
          <div className="lg:col-span-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 sm:mb-4"
            >
              <h2 className="text-lg sm:text-2xl font-bold font-serif-luxury text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Nearby Attractions
              </h2>
              <p className="mt-0.5 text-[11px] sm:text-xs text-stone-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                Places guests can explore around Aura Resorts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {NEARBY_PLACES.map((place, idx) => {
                const Icon = place.icon;
                return (
                  <motion.div
                    key={place.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : 0.06 + idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-lg sm:rounded-xl bg-white/95 dark:bg-stone-900/92 border border-white/80 dark:border-stone-800 px-3 py-2 sm:px-4 sm:py-3 shadow-[0_4px_14px_rgba(15,23,42,0.12)] flex flex-col justify-between gap-1 sm:gap-1.5 transition-colors hover:border-teal-600/60 dark:hover:border-teal-400/50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
                        </span>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-stone-100 truncate">
                          {place.name}
                        </h3>
                      </div>
                      <span className="shrink-0 text-[10px] font-medium text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-full">
                        {place.distance}
                      </span>
                    </div>
                    <p className="hidden sm:block text-[11px] text-slate-600 dark:text-stone-400 leading-snug line-clamp-2">
                      {place.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showAllModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllModal(false)}
                className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="all-facilities-title"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full max-w-3xl bg-[#F7FAFA] dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[88vh] flex flex-col"
                >
                  <div className="px-6 py-4 bg-white dark:bg-stone-950 border-b border-slate-200 dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <h3
                        id="all-facilities-title"
                        className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-stone-100"
                      >
                        All Resort Facilities
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                        Comfort-first stay essentials across Aura Resort &amp; Villas.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAllModal(false)}
                      aria-label="Close facilities list"
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-stone-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allFacilities.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl bg-white dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800 p-4 flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 shrink-0">
                            <Icon className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-stone-100">
                              {item.label}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
