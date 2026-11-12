import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const AboutUs: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<'lounge' | 'villa'>('lounge');
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const photos = {
    lounge: {
      url: RESORT_DATA.userImages.gardenLounge,
      title: "Aura 8 — Shaded Garden Terrace Lounge",
      caption: "Covered stone patio and lawn seating nestled beneath flowering tropical trees"
    },
    villa: {
      url: RESORT_DATA.userImages.oceanVilla,
      title: "Aura 4 — Ocean Palm Balcony Villa",
      caption: "Floor-to-ceiling glass balcony doors opening onto swaying palms and coastal horizon"
    }
  };

  const activePhoto = photos[selectedImage];

  const metrics = [
    { value: "Aura 1–3", label: "Luxury Suites" },
    { value: "Aura 4–5", label: "Private Villas" },
    { value: "Aura 6–7", label: "Normal Rooms" },
  ];

  return (
    <section id="about" className="py-14 md:py-20 bg-[#EDF4F3] dark:bg-stone-900/60 border-t border-teal-900/10 dark:border-stone-800/80 transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Real Photographic Showcase with Editorial Left Glide & Crossfade Switcher */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40, scale: 0.96 }}
            animate={
              isVisible
                ? { opacity: 1, x: 0, scale: 1 }
                : shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: -32, scale: 0.96 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.25 : 0.75,
              delay: isVisible && !shouldReduceMotion ? 0.08 : 0,
              ease: LUXURY_EASE,
            }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="overflow-hidden border border-teal-900/15 dark:border-stone-700 aspect-[4/3] shadow-md dark:shadow-none bg-white dark:bg-stone-800 relative group rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: LUXURY_EASE }}
                  className="absolute inset-0"
                >
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-[1.03] saturate-[1.04] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/75 via-stone-950/25 to-transparent p-4 text-white">
                    <p className="text-xs font-serif-luxury tracking-wide">{activePhoto.title}</p>
                    <p className="text-[11px] text-stone-300 font-light mt-0.5 line-clamp-1">{activePhoto.caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick switcher buttons */}
            <div className="flex gap-2">
              {(
                [
                  { key: 'lounge', label: 'Aura 8 · Garden Lounge' },
                  { key: 'villa', label: 'Aura 4 · Ocean Palm Villa' },
                ] as const
              ).map(({ key, label }) => {
                const isSelected = selectedImage === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setSelectedImage(key)}
                    className={`relative text-xs px-3 py-1.5 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-teal-700 dark:border-teal-400 text-teal-900 dark:text-teal-200 font-medium'
                        : 'border-slate-300 dark:border-stone-700 text-slate-600 dark:text-stone-400 hover:border-teal-600/50 bg-white/70 dark:bg-transparent'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="about-photo-pill"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 bg-teal-700/10 dark:bg-teal-400/10 -z-0"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Simple, Minimalist Narrative with Staggered Editorial Reveal */}
          <div className="lg:col-span-6 space-y-5">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 24 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: isVisible && !shouldReduceMotion ? 0.14 : 0,
                ease: LUXURY_EASE,
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-teal-700 dark:text-teal-300/80 font-semibold mb-2">
                About Aura
              </p>
              <h2 className="text-3xl md:text-4xl font-serif-luxury text-slate-900 dark:text-stone-100 font-normal tracking-tight">
                Where Nature Remains Untouched
              </h2>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 20 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: isVisible && !shouldReduceMotion ? 0.22 : 0,
                ease: LUXURY_EASE,
              }}
              className="text-sm md:text-base text-slate-600 dark:text-stone-300 font-light leading-relaxed"
            >
              Surrounded by swaying coconut palms and manicured tropical gardens, Aura pairs warm timber villas, breezy coastal suites, and open-air seafront pavilions.
            </motion.p>

            {/* 3 Simple Minimalist Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-teal-900/10 dark:border-stone-800">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.94 }}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0, scale: 1 }
                      : shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, scale: 0.94 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.55,
                    delay: isVisible && !shouldReduceMotion ? 0.34 + idx * 0.08 : 0,
                    ease: LUXURY_EASE,
                  }}
                >
                  <span className="block text-2xl font-serif-luxury text-slate-900 dark:text-stone-100">
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-stone-400 uppercase tracking-wider">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
