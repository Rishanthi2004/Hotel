import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BedDouble, ChevronLeft, ChevronRight, Eye, Maximize2, Users, X } from 'lucide-react';
import { FacilityCategory, FacilityItem, RESORT_DATA } from '../data/resortData';
import { FacilitiesEssentials } from './FacilitiesEssentials';
import { useScrollSectionVisible } from './ScrollSection';

interface FacilitiesProps {
  onOpenBooking: (villaId?: string) => void;
}

type CategoryFilter = 'All' | FacilityCategory;

const CATEGORY_TABS: { key: CategoryFilter; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Luxury', label: 'Luxury' },
  { key: 'Villa', label: 'Villa' },
  { key: 'Normal', label: 'Normal' },
  { key: 'Facilities', label: 'Facilities' },
];

const CATEGORY_BADGE_STYLES: Record<FacilityCategory, string> = {
  Luxury: 'bg-teal-900/90 text-teal-50 border-teal-300/30',
  Villa: 'bg-emerald-950/85 text-emerald-50 border-emerald-300/30',
  Normal: 'bg-slate-900/85 text-slate-50 border-slate-300/30',
  Facilities: 'bg-cyan-950/90 text-cyan-50 border-cyan-300/30',
};

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  const prefersReducedMotion = useReducedMotion();
  const isSectionVisible = useScrollSectionVisible();
  const trackRef = useRef<HTMLDivElement>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const allFacilities = RESORT_DATA.facilities;

  const filteredFacilities: FacilityItem[] = useMemo(() => {
    if (selectedCategory === 'All') return allFacilities;
    return allFacilities.filter((item) => item.category === selectedCategory);
  }, [allFacilities, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      All: allFacilities.length,
      Luxury: 0,
      Villa: 0,
      Normal: 0,
      Facilities: 0,
    };
    for (const item of allFacilities) {
      counts[item.category] += 1;
    }
    return counts;
  }, [allFacilities]);

  const selectedFacility =
    selectedIndex !== null && filteredFacilities[selectedIndex]
      ? filteredFacilities[selectedIndex]
      : null;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 4);

    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIdx = 0;
    let smallestDiff = Infinity;
    for (let i = 0; i < children.length; i += 1) {
      const diff = Math.abs(children[i].offsetLeft - el.scrollLeft);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: 'auto' });
    }
    setActiveIndex(0);
    setSelectedIndex(null);
    const frame = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(frame);
  }, [selectedCategory, updateScrollState]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const boundedIndex = Math.max(0, Math.min(index, children.length - 1));
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const targetLeft = Math.min(children[boundedIndex].offsetLeft, maxScrollLeft);

      el.scrollTo({
        left: targetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  const stepCarousel = useCallback(
    (direction: 'prev' | 'next') => {
      const el = trackRef.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      if (direction === 'next') {
        const nextCard = children.find((child) => child.offsetLeft > el.scrollLeft + 8);
        const targetLeft = nextCard ? Math.min(nextCard.offsetLeft, maxScrollLeft) : maxScrollLeft;
        el.scrollTo({
          left: targetLeft,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else {
        const prevCards = children.filter((child) => child.offsetLeft < el.scrollLeft - 8);
        const prevCard = prevCards[prevCards.length - 1];
        const targetLeft = prevCard ? prevCard.offsetLeft : 0;
        el.scrollTo({
          left: targetLeft,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [prefersReducedMotion]
  );

  const stepModal = useCallback(
    (direction: 'prev' | 'next') => {
      if (filteredFacilities.length === 0) return;
      setSelectedIndex((current) => {
        if (current === null) return null;
        const delta = direction === 'next' ? 1 : -1;
        return (current + delta + filteredFacilities.length) % filteredFacilities.length;
      });
    },
    [filteredFacilities.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        stepModal('next');
      } else if (event.key === 'ArrowLeft') {
        stepModal('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, stepModal]);

  const handleModalTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    modalTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleModalTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (modalTouchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? modalTouchStartX.current;
    const deltaX = endX - modalTouchStartX.current;
    modalTouchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      stepModal(deltaX < 0 ? 'next' : 'prev');
    }
  };

  return (
    <section
      id="facilities"
      className="relative bg-[#F7FAFA] dark:bg-stone-950 scroll-mt-16 transition-colors duration-300"
    >
      <FacilitiesEssentials />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 sm:mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4"
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-teal-700 dark:text-teal-300/80 font-semibold mb-1">
                Aura 1 – Aura 8
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-luxury text-slate-900 dark:text-stone-100 tracking-tight">
                Villas &amp; Suites
              </h2>
            </div>
            <span className="sm:hidden text-xs font-medium text-slate-500 dark:text-stone-400 tabular-nums pb-0.5">
              {activeIndex + 1} / {filteredFacilities.length}
            </span>
          </div>

          <div
            className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter facilities and villas by category"
          >
            {CATEGORY_TABS.map((tab) => {
              const isSelected = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-700 dark:bg-teal-400 text-white dark:text-stone-950 border-teal-700 dark:border-teal-400 shadow-sm'
                      : 'bg-white dark:bg-stone-900 text-slate-700 dark:text-stone-300 border-slate-200 dark:border-stone-700 hover:border-teal-600/50 dark:hover:border-stone-500'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`hidden sm:inline text-[10px] tabular-nums ${
                      isSelected ? 'opacity-85' : 'text-slate-400 dark:text-stone-500'
                    }`}
                  >
                    {categoryCounts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => stepCarousel('prev')}
            disabled={!canScrollPrev}
            aria-label="Previous facility"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 dark:bg-stone-900/95 border border-slate-200 dark:border-stone-700 text-slate-700 dark:text-stone-200 shadow-md hover:border-teal-600/50 dark:hover:border-stone-500 disabled:opacity-35 disabled:cursor-default transition-all cursor-pointer absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x py-1 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredFacilities.map((facility, idx) => (
              <motion.article
                key={facility.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : Math.min(idx, 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group shrink-0 snap-start w-full sm:w-[292px] lg:w-[305px] bg-white dark:bg-stone-900 rounded-2xl border border-slate-200/80 dark:border-stone-800 shadow-[0_6px_24px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col justify-between transition-colors duration-300"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`View ${facility.code} ${facility.subtitle} photo`}
                    className="relative block w-full aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-stone-800 border-b border-slate-100 dark:border-stone-800 cursor-pointer text-left"
                  >
                    <img
                      src={facility.imageUrl}
                      alt={`${facility.code} — ${facility.subtitle}`}
                      className={`w-full h-full object-cover ${facility.imagePosition ?? 'object-center'} transition-transform duration-500 group-hover:scale-[1.03]`}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-sm ${CATEGORY_BADGE_STYLES[facility.category]}`}
                    >
                      {facility.category}
                    </span>
                  </button>

                  <div className="px-4 pt-3.5 pb-3 sm:px-5 sm:pt-4 sm:pb-3.5">
                    <div className="mb-2 sm:mb-2.5">
                      <h3 className="text-lg font-bold font-serif-luxury text-slate-900 dark:text-stone-100 leading-snug">
                        {facility.code}
                      </h3>
                      <p className="text-xs font-medium text-teal-700 dark:text-teal-300/90 mt-0.5 line-clamp-1">
                        {facility.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[13px] text-slate-600 dark:text-stone-400">
                      {facility.cardHighlights.slice(0, 3).map((item, itemIdx) => (
                        <li
                          key={item}
                          className={`${itemIdx >= 2 ? 'hidden sm:flex' : 'flex'} items-start gap-2 leading-snug`}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 w-1 h-1 rounded-full bg-teal-700 dark:bg-teal-400 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(facility.villaId)}
                    className="rounded-full py-2 px-3 border border-teal-700/80 dark:border-teal-400/60 text-teal-800 dark:text-teal-300 hover:bg-teal-700 hover:text-white dark:hover:bg-teal-400 dark:hover:text-stone-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="rounded-full py-2 px-3 border border-slate-300 dark:border-stone-700 text-slate-900 dark:text-stone-100 hover:border-slate-900 dark:hover:border-stone-300 text-xs font-semibold tracking-wide transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepCarousel('next')}
            disabled={!canScrollNext}
            aria-label="Next facility"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 dark:bg-stone-900/95 border border-slate-200 dark:border-stone-700 text-slate-700 dark:text-stone-200 shadow-md hover:border-teal-600/50 dark:hover:border-stone-500 disabled:opacity-35 disabled:cursor-default transition-all cursor-pointer absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex sm:hidden items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous facility card"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-slate-700 dark:text-stone-200 disabled:opacity-35 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Facility slides">
            {filteredFacilities.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to ${item.code}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 bg-teal-700 dark:bg-teal-400'
                    : 'w-2 bg-slate-300 dark:bg-stone-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex >= filteredFacilities.length - 1}
            aria-label="Next facility card"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-slate-700 dark:text-stone-200 disabled:opacity-35 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedFacility && selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIndex(null)}
                className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="facility-modal-title"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                >
                  <div
                    onTouchStart={handleModalTouchStart}
                    onTouchEnd={handleModalTouchEnd}
                    className="relative bg-stone-100 dark:bg-stone-950 flex items-center justify-center shrink-0"
                  >
                    <img
                      src={selectedFacility.imageUrl}
                      alt={`${selectedFacility.code} — ${selectedFacility.subtitle}`}
                      className="w-full max-h-[48vh] object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => stepModal('prev')}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => stepModal('next')}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="absolute bottom-3 left-3 rounded-full bg-stone-900/75 text-white text-[11px] font-medium px-2.5 py-1 tabular-nums">
                      {selectedIndex + 1} / {filteredFacilities.length}
                    </span>

                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-sm ${CATEGORY_BADGE_STYLES[selectedFacility.category]}`}
                    >
                      {selectedFacility.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      aria-label="Close facility preview"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <div className="mb-3">
                      <h3
                        id="facility-modal-title"
                        className="text-xl font-bold font-serif-luxury text-slate-900 dark:text-stone-100"
                      >
                        {selectedFacility.code}
                      </h3>
                      <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mt-0.5">
                        {selectedFacility.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-4 p-3 rounded-xl bg-[#F7FAFA] dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-stone-300">
                        <Users className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                        <span>{selectedFacility.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-stone-300">
                        <BedDouble className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                        <span>{selectedFacility.layout}</span>
                      </div>
                      {selectedFacility.sqm && (
                        <div className="flex items-center gap-2 text-slate-700 dark:text-stone-300">
                          <Maximize2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                          <span>{selectedFacility.sqm} m² Space</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-700 dark:text-stone-300">
                        <Eye className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                        <span>{selectedFacility.view}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed mb-4">
                      {selectedFacility.description}
                    </p>

                    <ul className="space-y-1.5 mb-5 text-sm text-slate-600 dark:text-stone-400">
                      {selectedFacility.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-700 dark:bg-teal-400 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const targetVillaId = selectedFacility.villaId;
                          setSelectedIndex(null);
                          onOpenBooking(targetVillaId);
                        }}
                        className="flex-1 rounded-full py-2.5 px-4 border border-teal-700/80 dark:border-teal-400/60 text-teal-800 dark:text-teal-300 hover:bg-teal-700 hover:text-white dark:hover:bg-teal-400 dark:hover:text-stone-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        className="rounded-full py-2.5 px-5 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-900 dark:hover:border-stone-300 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
