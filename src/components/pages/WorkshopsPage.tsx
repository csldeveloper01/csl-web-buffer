import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowDown, 
  ChevronRight, 
  Sparkles, 
  MessageCircle
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { WorkshopExplorer } from '../sections/Workshops/WorkshopExplorer';
import { WorkshopVideos } from '../sections/Workshops/WorkshopVideos';
import { ContactModal } from '../sections/Contact/ContactModal';

export function WorkshopsPage() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Handle direct hash navigation if specified
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'domains' && hash !== 'workshop-explorer' && hash !== 'hero' && hash !== 'workshop-cta') {
      setSelectedDomainId(hash);
    }
  }, []);

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
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
        className="sticky top-0 z-0 w-full min-h-[44vh] sm:min-h-[48vh] flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center mb-3">
            <span>CREATOR SPACE LAB</span>
            <div></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text tracking-tight mb-3">
            <span className="text-csl-blue">Workshops</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-bold text-csl-text mb-3 tracking-tight">
            Hands-On Learning. Real Skills. Practical Outcomes.
          </p>

          <p className="text-csl-muted font-medium text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Explore practical workshops designed to help students build real-world skills through guided, hands-on learning.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href="#workshop-explorer"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('workshop-explorer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Explore Workshops</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={handleOpenContactModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-7 py-3 rounded-xl font-bold text-sm shadow-xs hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Host at Your College</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. PRIMARY SECTION: EXPLORE WORKSHOPS
               (11 Domains, CustomDropdown Filters, Progression Pill, 6 Workshops per Domain)
           ================================================== */}
        <WorkshopExplorer 
          selectedDomainId={selectedDomainId}
          onSelectDomain={handleDomainSelect}
          onNavigateToContact={handleOpenContactModal}
        />

        {/* ==================================================
            3. WORKSHOP VIDEOS & EXPERIENCES
               (Landscape Community Video + 4 Portrait Reel Showcases)
           ================================================== */}
        <WorkshopVideos />

        {/* ==================================================
            4. COMPACT WHY CSL & CLOSING CTA
               (3 Concise Benefits + Talk to CSL Action)
           ================================================== */}
        <section id="workshop-cta" className="relative w-full py-14 md:py-20 bg-gradient-to-b from-[#FAF7F3] via-white to-csl-bg border-t border-csl-gold/25">
          <div className="section-container max-w-5xl mx-auto">
            
            {/* 3 Concise Benefit Points */}
            <div className="mb-12 text-center">
              <div className="section-eyebrow justify-center">
                <span>WHY CSL WORKSHOPS</span>
                <div></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text mb-8">
                Practical Learning Engineered for Real Growth
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                <div className="p-5 bg-white/90 rounded-2xl border border-csl-gold/30 shadow-xs hover:border-csl-gold transition-all">
                  <div className="w-9 h-9 rounded-xl bg-csl-blue/10 text-csl-blue flex items-center justify-center font-mono font-extrabold text-xs mb-3">
                    01
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-csl-text mb-1.5">
                    Hands-On Learning
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed font-medium">
                    Zero passive lecturing. Every workshop requires participants to write live code, configure environments, and build functioning modules in university computer labs.
                  </p>
                </div>

                <div className="p-5 bg-white/90 rounded-2xl border border-csl-gold/30 shadow-xs hover:border-csl-gold transition-all">
                  <div className="w-9 h-9 rounded-xl bg-csl-gold/15 text-csl-gold flex items-center justify-center font-mono font-extrabold text-xs mb-3">
                    02
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-csl-text mb-1.5">
                    Industry-Relevant Tools
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed font-medium">
                    Learn production tech stacks, modern AI integrations, and enterprise frameworks co-designed with industry software engineers.
                  </p>
                </div>

                <div className="p-5 bg-white/90 rounded-2xl border border-csl-gold/30 shadow-xs hover:border-csl-gold transition-all">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-mono font-extrabold text-xs mb-3">
                    03
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-csl-text mb-1.5">
                    Guided Practical Projects
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed font-medium">
                    Participants build tangible capstone deliverables with clean GitHub repositories and verifiable completion credentials for job interviews.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing CTA */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-csl-gold/40 shadow-xl text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-csl-gold uppercase mb-2">
                <Sparkles className="w-4 h-4 text-csl-gold" />
                <span>Get Started with CSL</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-csl-text mb-3 leading-tight">
                Ready to Build Something <span className="text-csl-blue">Real?</span>
              </h2>

              <p className="text-xs sm:text-base text-csl-muted font-medium mb-8 max-w-lg leading-relaxed">
                Collaborate with Creator Space Lab to bring high-impact technical workshops to your college, department, or student community.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="https://wa.me/919940166299?text=Hi%20Creator%20Space%20Lab!%20We%20would%20like%20to%20discuss%20hosting%20a%20workshop%20at%20our%20institution."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-emerald-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Talk to CSL on WhatsApp</span>
                </a>

                <button
                  onClick={handleOpenContactModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-csl-gold/50 text-csl-text hover:text-csl-blue px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Host at Your College</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Workshop Enquiry / Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialSubject="Workshop"
        title="Host a Workshop at Your Institution"
        subtitle="Share your requirements and our academic partnership team will coordinate with your institution for schedules, curriculum, and hands-on lab setups."
      />
    </div>
  );
}
