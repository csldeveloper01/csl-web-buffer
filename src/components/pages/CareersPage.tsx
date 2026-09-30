import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Megaphone, 
  Sparkles, 
  Users, 
  UserPlus, 
  Code2, 
  Briefcase, 
  ArrowRight, 
  ArrowDown, 
  Mail, 
  Phone, 
  Edit3, 
  MapPin
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { CareerModal } from '../sections/Careers/CareerModal';

// @ts-expect-error — Vite asset import
import heroCareersVisual from '../../../Elements/ABOUT/PEOPLE & COLLABORATION.png';

export interface CareerPosition {
  id: string;
  title: string;
  category: 'Marketing' | 'Human Resources' | 'Technology' | 'Business';
  experience: string;
  vacancies: string;
  vacancyCount: number;
  icon: typeof Megaphone;
}

export const careerPositions: CareerPosition[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    experience: '6 months - 1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Megaphone,
  },
  {
    id: 'digital-marketing-intern',
    title: 'Digital Marketing Intern',
    category: 'Marketing',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Sparkles,
  },
  {
    id: 'human-resources',
    title: 'Human Resources',
    category: 'Human Resources',
    experience: '6 months - 1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Users,
  },
  {
    id: 'hr-intern',
    title: 'HR Intern',
    category: 'Human Resources',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: UserPlus,
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Technology',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Code2,
  },
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    category: 'Business',
    experience: 'Fresher',
    vacancies: '3 Vacancies',
    vacancyCount: 3,
    icon: Briefcase,
  },
];

const categoryTabs = [
  'All Roles',
  'Marketing',
  'Human Resources',
  'Technology',
  'Business',
] as const;

export function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categoryTabs[number]>('All Roles');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[15%] left-[8%]', delay: 0.3, duration: 7 },
    { size: 'w-20 h-20', pos: 'top-[20%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-10 h-10', pos: 'bottom-[22%] left-[12%]', delay: 1.6, duration: 6 },
    { size: 'w-14 h-14', pos: 'bottom-[18%] right-[22%]', delay: 0.8, duration: 7.5 },
  ];

  const handleApplyClick = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setIsApplyModalOpen(true);
  };

  const handleOpenGeneralApply = () => {
    setSelectedPosition(careerPositions[0]?.title ?? 'Digital Marketing');
    setIsApplyModalOpen(true);
  };

  const filteredPositions = careerPositions.filter((pos) => {
    if (selectedCategory === 'All Roles') return true;
    return pos.category === selectedCategory;
  });

  const positionDropdownOptions = careerPositions.map((pos) => ({
    value: pos.title,
    label: pos.title,
  }));

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* ==================================================
          1. HERO SECTION
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-1 flex flex-col items-start max-w-xl">
            <div className="section-eyebrow">
              <span>CAREERS AT CSL</span>
              <div></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold text-csl-text leading-[1.06] tracking-tight mb-6">
              Build Your Career <br />
              <span className="text-csl-blue">With CSL</span>
            </h1>

            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              Explore current opportunities at Creator Space Lab and find a role where you can grow, contribute, and build real-world experience.
            </p>

            <a
              href="#open-positions"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>View Open Positions</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

          {/* Right: Visual Art */}
          <div className="order-2 flex items-center justify-center relative w-full">
            <motion.div
              className="relative w-full max-w-[460px] sm:max-w-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />

              <img
                src={heroCareersVisual}
                alt="CSL Careers Collaboration"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ==================================================
          FOREGROUND SLIDING CONTENT WRAPPER
         ================================================== */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">
        
        {/* ==================================================
            2. OPEN POSITIONS SECTION
           ================================================== */}
        <section id="open-positions" className="relative w-full py-16 md:py-24 section-container">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className="section-eyebrow">
                <span>OPPORTUNITIES</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
                Current Openings
              </h2>
              <p className="text-csl-muted font-medium text-sm sm:text-base section-subheading max-w-xl">
                Explore our active openings across departments and apply for the role that fits your experience.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab;
                const count = tab === 'All Roles' 
                  ? careerPositions.length 
                  : careerPositions.filter(p => p.category === tab).length;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedCategory(tab)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-csl-blue text-white shadow-sm shadow-csl-blue/20'
                        : 'bg-white/80 text-csl-text border border-csl-gold/25 hover:border-csl-gold hover:text-csl-blue'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-csl-gold/15 text-csl-text'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid — Responsive Multi-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filteredPositions.map((pos) => {
              const Icon = pos.icon;

              return (
                <div
                  key={pos.id}
                  className="group relative flex flex-col justify-between bg-white/85 backdrop-blur-sm border border-csl-gold/30 hover:border-csl-gold/70 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-csl-blue/5 transition-all duration-300"
                >
                  {/* Top Bar: Icon + Category + Vacancy Count */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6 stroke-[1.8]" />
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {pos.vacancies}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-snug mb-5">
                      {pos.title}
                    </h3>
                  </div>

                  {/* Metadata & Apply Button */}
                  <div>
                    {/* Consistent Metadata Presentation */}
                    <div className="bg-[#FAF7F2] border border-csl-gold/25 rounded-xl p-3.5 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-[11px] font-bold text-csl-muted uppercase tracking-wider">
                          Experience
                        </span>
                        <span className="font-extrabold text-csl-text">
                          {pos.experience}
                        </span>
                      </div>

                      <div className="h-[1px] w-full bg-csl-gold/20" />

                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-[11px] font-bold text-csl-muted uppercase tracking-wider">
                          Vacancies
                        </span>
                        <span className="font-extrabold text-csl-blue">
                          {pos.vacancies}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={() => handleApplyClick(pos.title)}
                      className="w-full mt-5 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-csl-blue/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            3. HOW TO APPLY / APPLICATION FORM SECTION
           ================================================== */}
        <section 
          id="apply-form" 
          className="relative w-full py-16 md:py-24 border-t border-csl-gold/20 bg-gradient-to-b from-transparent via-[#F7F4EE]/60 to-[#F2EDE3]/50"
        >
          <div className="section-container">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <div className="section-eyebrow justify-center">
                <span>HOW TO APPLY</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Submit Your Application
              </h2>
              <p className="text-csl-muted font-medium text-sm sm:text-base section-subheading">
                Select your role, enter your details, and submit your application directly to our team.
              </p>
            </div>

            {/* Layout: Main Form Box + Contact Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
              {/* Application Form Box */}
              <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#F8FBFF] to-[#EDF4FE] backdrop-blur-sm border border-csl-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm w-full">
                <Edit3 
                  className="absolute -right-4 -bottom-4 w-36 h-36 md:w-40 md:h-40 text-white/60 drop-shadow-sm pointer-events-none" 
                  strokeWidth={2.5}
                />

                <div className="relative z-10 flex flex-col items-start max-w-md">
                  <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-2">
                    Direct Recruitment
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text tracking-tight mb-3">
                    Ready to Apply?
                  </h3>

                  <p className="text-sm text-csl-muted font-medium leading-relaxed mb-6">
                    Select a position from our openings above or open the application form to submit your profile directly to our recruitment team.
                  </p>

                  <button
                    type="button"
                    onClick={handleOpenGeneralApply}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:shadow-csl-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Open Application Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>







              {/* Sidebar: Recruitment & Office Details */}
              <div className="flex flex-col gap-4 w-full">
                {/* Office Info Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-csl-deep-blue via-[#062B82] to-csl-blue backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-md text-white">
                  <MapPin 
                    className="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 pointer-events-none" 
                    strokeWidth={2.5}
                  />

                  <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                    <MapPin className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col relative z-10">
                    <h4 className="text-base font-bold text-white mb-1">
                      Office Location
                    </h4>
                    <p className="text-xs font-medium text-white/85 leading-relaxed">
                      No.48A, Rajiv Gandhi Salai (OMR) <br />
                      Karapakkam, <br />
                      Chennai – 600097, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* HR Contacts Card */}
                <div className="relative overflow-hidden bg-white/80 border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-base font-bold text-csl-text mb-1">
                      Recruitment Contact
                    </h4>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-csl-text">
                      <a
                        href="mailto:hr@creatorspacelab.org.in"
                        className="hover:text-csl-blue transition-colors break-words"
                      >
                        hr@creatorspacelab.org.in
                      </a>
                      <a
                        href="mailto:hr.info@creatorspacelab.org.in"
                        className="hover:text-csl-blue transition-colors break-words"
                      >
                        hr.info@creatorspacelab.org.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Phone Card */}
                <div className="relative overflow-hidden bg-white/80 border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-base font-bold text-csl-text mb-1">
                      Direct Helplines
                    </h4>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-csl-text">
                      <a
                        href="https://wa.me/918056052806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 80560 52806
                      </a>
                      <a
                        href="https://wa.me/919500802806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 95008 02806
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Career Application Modal */}
      <CareerModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialPosition={selectedPosition}
        positions={positionDropdownOptions}
      />
    </div>
  );
}

export default CareersPage;
