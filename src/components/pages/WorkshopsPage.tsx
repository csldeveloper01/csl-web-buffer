import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowDown, 
  ChevronRight, 
  Sparkles, 
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { useDeepLinkHighlight } from '../../hooks/useDeepLinkHighlight';
import { WorkshopProgression } from '../sections/Workshops/WorkshopProgression';
import { WorkshopDomainGrid } from '../sections/Workshops/WorkshopDomainGrid';
import { WorkshopExplorer } from '../sections/Workshops/WorkshopExplorer';
import { WorkshopFoundation } from '../sections/Workshops/WorkshopFoundation';
import { WorkshopVideos } from '../sections/Workshops/WorkshopVideos';
import { WorkshopWhyChoose } from '../sections/Workshops/WorkshopWhyChoose';

// @ts-ignore
import cslEmblem from '../../../Elements/COURSES/CSL-BOOK-WK.png';

export function WorkshopsPage() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');
  const highlightedId = useDeepLinkHighlight();


  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const handleNavigateToContact = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomainId(domainId);
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      
      {/* ==================================================
          1. WORKSHOP HERO SECTION
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[65vh] flex flex-col justify-center bg-[#FBF7F4] pt-28 pb-12 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT — TITLE + DESCRIPTION + STATS + CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">

            <div className="section-eyebrow">
              <span>CreatorSpaceLab</span>
              <div></div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-extrabold text-csl-text leading-[1.08] tracking-tight mb-4">
              Hands-On Industry <br />
              <span className="text-csl-blue">Workshops</span>
            </h1>

            {/* Feature Tag Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-gold/20 via-csl-gold/10 to-csl-blue/15 border border-csl-gold/40 px-4 py-2 rounded-xl mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-csl-gold" />
              <span className="text-xs sm:text-sm font-extrabold text-csl-text font-mono">
                11 Domains • 66+ Hands-On Workshops • Beginner to Advanced
              </span>
            </div>

            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-6">
              Learn practical engineering from IT industry practitioners. Every workshop is milestone-driven, code-intensive, and designed to bridge the campus-to-corporate divide.
            </p>

            {/* Micro Stats Pills */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
              <div className="p-3 bg-white/80 rounded-xl border border-csl-gold/30 shadow-2xs">
                <span className="text-lg sm:text-xl font-mono font-extrabold text-csl-blue block">11</span>
                <span className="text-[11px] font-semibold text-csl-muted uppercase tracking-wider">Tech Domains</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-csl-gold/30 shadow-2xs">
                <span className="text-lg sm:text-xl font-mono font-extrabold text-csl-gold block">66+</span>
                <span className="text-[11px] font-semibold text-csl-muted uppercase tracking-wider">Workshops</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-csl-gold/30 shadow-2xs">
                <span className="text-lg sm:text-xl font-mono font-extrabold text-emerald-600 block">100%</span>
                <span className="text-[11px] font-semibold text-csl-muted uppercase tracking-wider">Project-Based</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#domains"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Workshops</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={handleNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xs hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Host at Your College</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT — VISUAL EMBLEM & COMPOSITE BADGES */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-6 lg:mt-0">
            <motion.div
              className="relative w-full max-w-[420px]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Subtle Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />

              {/* Main Badge Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-csl-gold/40 shadow-2xl relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-csl-blue/10 via-white to-csl-gold/20 border border-csl-gold/30 p-3 flex items-center justify-center shadow-md">
                    <img src={cslEmblem} alt="CSL Emblem" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-base font-extrabold text-csl-text font-mono uppercase tracking-wider mb-1">
                    Industry-Grade Pedagogy
                  </h3>
                  <p className="text-xs text-csl-muted font-medium">
                    Curriculum co-designed with senior software engineers & corporate trainers.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-csl-gold/20 text-xs font-semibold text-csl-text">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live coding in university computer labs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-world capstones & GitHub commits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verifiable credentials for student portfolios</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. PROGRESSION PIPELINE (DISCOVER -> LEARN -> BUILD -> APPLY -> CREATE)
           ================================================== */}
        <WorkshopProgression />

        {/* ==================================================
            3. DOMAIN DIRECTORY (TOP 6 TRENDING + ALL 11 DOMAINS)
           ================================================== */}
        <WorkshopDomainGrid 
          selectedDomainId={selectedDomainId}
          onSelectDomain={handleDomainSelect}
          highlightedId={highlightedId}
        />

        {/* ==================================================
            4. INTERACTIVE WORKSHOP EXPLORER (FILTERS + 66 CARDS + MODAL)
           ================================================== */}
        <WorkshopExplorer 
          selectedDomainId={selectedDomainId}
          onSelectDomain={handleDomainSelect}
          onNavigateToContact={handleNavigateToContact}
        />

        {/* ==================================================
            5. COMMON FOUNDATION MODULES (SQL, DSA, PROBLEM SOLVING)
           ================================================== */}
        <WorkshopFoundation 
          onNavigateToContact={handleNavigateToContact}
        />

        {/* ==================================================
            6. INSIDE OUR WORKSHOPS (REAL ON-CAMPUS VIDEO FOOTAGE)
           ================================================== */}
        <WorkshopVideos />

        {/* ==================================================
            7. WHY CHOOSE CSL WORKSHOPS
           ================================================== */}
        <WorkshopWhyChoose />

        {/* ==================================================
            8. CLOSING / HOST A WORKSHOP CTA SECTION
           ================================================== */}
        <section id="workshop-cta" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-csl-bg via-[#FBF7F4] to-white border-t border-csl-gold/20">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            
            {/* Formula Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-gold/20 via-csl-gold/10 to-csl-blue/15 border border-csl-gold/40 px-5 py-2.5 rounded-xl mb-6 shadow-xs">
              <Sparkles className="w-5 h-5 text-csl-gold" />
              <span className="text-sm sm:text-base font-extrabold text-csl-text font-mono">
                Transform Campus Learning with Creator Space Lab
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Ready to Host a Workshop at Your <span className="text-csl-blue">College or Campus?</span>
            </h2>

            <p className="text-csl-muted font-medium text-base sm:text-lg section-subheading mb-10 max-w-2xl leading-relaxed">
              We collaborate with colleges, departments, student clubs, and tech teams to deliver custom, high-impact hands-on workshops that produce real project deliverables.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/919940166299?text=Hi%20Creator%20Space%20Lab!%20We%20would%20like%20to%20discuss%20hosting%20a%20workshop%20at%20our%20institution."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-600/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={handleNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 border border-csl-gold/50 text-csl-text hover:text-csl-blue px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Contact Us Form</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
