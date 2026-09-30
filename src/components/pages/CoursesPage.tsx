import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown,
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Star, 
  X, 
  Phone, 
  MessageSquare, 
  Code2, 
  Cpu,
  Users,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { openWhatsApp } from '../../lib/whatsapp';
import { useDeepLinkHighlight } from '../../hooks/useDeepLinkHighlight';
import { CustomDropdown } from '../ui/CustomDropdown';
import { 
  coursesCatalog, 
  CourseItem, 
  CourseTopicModule, 
  CourseLevelSection,
  CATEGORY_OPTIONS, 
  LEVEL_OPTIONS,
  LEVEL_METADATA
} from '../../data/coursesData';

// Re-export canonical types and catalog for backward compatibility
export { coursesCatalog };
export type { CourseItem, CourseTopicModule, CourseLevelSection };

// Backward compatibility alias
export type CourseModule = CourseTopicModule;

// @ts-ignore
import iconBanner from '../../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';

export function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');
  const [activeCourseDetails, setActiveCourseDetails] = useState<CourseItem | null>(null);
  const [callbackCourse, setCallbackCourse] = useState<CourseItem | null>(null);

  const highlightedId = useDeepLinkHighlight();

  // Client-side Filtered Courses
  const filteredCourses = coursesCatalog.filter((course) => {
    const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  const featuredCourse = coursesCatalog[0]; // Full Stack Development with AI - Java

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      
      {/* ==================================================
          1. COURSES HERO SECTION
         ================================================== */}
      <section id="hero" className="relative z-10 w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden">
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT — COMPLETE HERO CONTENT STACK */}
          <div className="order-1 flex flex-col items-start max-w-xl">

            <div className="section-eyebrow">
              <span>COURSES</span>
              <div></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold text-csl-text leading-[1.06] tracking-tight mb-6">
              Build Skills. <br />
              Build Things. <br />
              <span className="text-csl-blue">Build Your Future.</span>
            </h1>

            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              Industry-focused courses designed around practical skills, real projects, and technologies that actually get used.
            </p>

            <a
              href="#featured-course"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Courses
              <ArrowDown className="w-5 h-5" />
            </a>

          </div>

          {/* RIGHT — HERO VISUAL ASSET */}
          <div className="order-2 flex items-center justify-center relative w-full">

            <motion.div
              className="relative w-full max-w-[460px] sm:max-w-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />

              <img
                src={iconBanner}
                alt="CSL Courses Visual Ecosystem"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>

          </div>

        </div>
      </section>

      {/* FOREGROUND CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. FEATURED COURSE ("Start Here")
           ================================================== */}
        <section id="featured-course" className="relative w-full py-16 md:py-24 section-container">
          
          {/* Header */}
          <div className="mb-10">
            <div className="section-eyebrow">
              <span>FEATURED PROGRAM</span>
              <div></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
              Start <span className="text-csl-blue">Here</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
              Build a strong foundation with practical, structured learning designed around real-world skills.
            </p>
          </div>

          {/* Two-Column Featured Editorial Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-csl-gold/5">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Badges */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full bg-csl-blue/10 border border-csl-blue/20 text-csl-blue font-bold text-xs uppercase tracking-wider">
                    {featuredCourse.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-csl-gold/15 border border-csl-gold/30 text-csl-text font-bold text-xs uppercase tracking-wider">
                    {featuredCourse.level}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    Format: {featuredCourse.format}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-csl-gold">
                    <Star className="w-4 h-4 fill-csl-gold text-csl-gold" />
                    <span>{featuredCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-muted">
                    <Users className="w-4 h-4 text-csl-blue" />
                    <span>{featuredCourse.students} Enrolled</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-csl-text tracking-tight mb-4">
                  {featuredCourse.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-csl-muted font-medium leading-relaxed mb-6">
                  {featuredCourse.description}
                </p>

                {/* Syllabus Overview Preview */}
                <div className="bg-csl-bg/80 border border-csl-gold/20 rounded-2xl p-5 mb-8">
                  <span className="text-xs font-extrabold text-csl-blue uppercase tracking-wider block mb-3">
                    Curriculum Overview ({featuredCourse.modules.length} Modules across 3 Progressive Levels)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 text-xs">
                      <span className="text-[10px] font-black uppercase text-emerald-800 block mb-0.5">BASIC</span>
                      <span className="font-bold text-csl-text block truncate">{featuredCourse.levels.basic.modules[0]?.title || 'Fundamentals'}</span>
                      <span className="text-[11px] text-csl-muted">{featuredCourse.levels.basic.modules.length} Modules</span>
                    </div>
                    <div className="bg-white/90 p-3 rounded-xl border border-blue-200 text-xs">
                      <span className="text-[10px] font-black uppercase text-csl-blue block mb-0.5">INTERMEDIATE</span>
                      <span className="font-bold text-csl-text block truncate">{featuredCourse.levels.intermediate.modules[0]?.title || 'Applied Concepts'}</span>
                      <span className="text-[11px] text-csl-muted">{featuredCourse.levels.intermediate.modules.length} Modules</span>
                    </div>
                    <div className="bg-white/90 p-3 rounded-xl border border-purple-200 text-xs">
                      <span className="text-[10px] font-black uppercase text-purple-800 block mb-0.5">ADVANCED</span>
                      <span className="font-bold text-csl-text block truncate">{featuredCourse.levels.advanced.modules[0]?.title || 'Advanced & Projects'}</span>
                      <span className="text-[11px] text-csl-muted">{featuredCourse.levels.advanced.modules.length} Modules</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setCallbackCourse(featuredCourse)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Enroll / Request Callback
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveCourseDetails(featuredCourse)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-csl-gold/30 text-csl-text hover:text-csl-blue px-6 py-4 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Syllabus / View Details
                </button>
              </div>
            </div>

            {/* Right Large Course Visual */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden border border-csl-gold/25 bg-csl-bg shadow-md group">
              <img 
                src={featuredCourse.image} 
                alt={featuredCourse.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-csl-deep-blue/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-csl-gold/30 shadow-md">
                <span className="text-xs font-bold text-csl-text flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-csl-blue" />
                  Students: <strong>{featuredCourse.students}</strong>
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* ==================================================
            3. COURSE DISCOVERY & CATALOGUE
           ================================================== */}
        <section id="catalogue" className="relative w-full py-16 md:py-24 section-container border-t border-csl-gold/20">
          
          {/* Header */}
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="section-eyebrow justify-center">
              <span>EXPLORE CATALOGUE</span>
              <div></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Find Your Next <span className="text-csl-blue">Skill</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
              Explore courses across development, design, data science, data analytics, cloud, AI/ML, and professional domains.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 w-full max-w-5xl mx-auto">
            {CATEGORY_OPTIONS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-csl-blue text-white shadow-md shadow-csl-blue/20 scale-105'
                      : 'bg-white/80 text-csl-text hover:bg-white hover:text-csl-blue border border-csl-gold/25'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 w-full max-w-2xl mx-auto">
            <span className="text-xs font-bold text-csl-muted uppercase mr-2">Level:</span>
            {LEVEL_OPTIONS.map((lvl) => {
              const isActive = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-csl-gold text-csl-text shadow-xs scale-105'
                      : 'bg-csl-bg/80 text-csl-muted hover:text-csl-text border border-csl-gold/20'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Course Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredCourses.map((course) => {
              const isHighlighted = highlightedId === course.id;

              return (
                <motion.div
                  key={course.id}
                  id={course.id}
                  data-deep-link-id={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  animate={
                    isHighlighted
                      ? { scale: [1, 1.04, 1], filter: ['brightness(1)', 'brightness(1.25)', 'brightness(1)'] }
                      : { scale: 1, filter: 'brightness(1)' }
                  }
                  transition={
                    isHighlighted
                      ? { duration: 0.45, ease: 'easeInOut' }
                      : { duration: 0.4 }
                  }
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 border border-csl-gold/25 hover:border-csl-gold/70 hover:shadow-xl hover:shadow-csl-gold/10"
                >
                  {/* Course Image */}
                  <div 
                    className="relative w-full h-48 sm:h-52 overflow-hidden bg-csl-bg cursor-pointer"
                    onClick={() => setActiveCourseDetails(course)}
                  >
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-csl-deep-blue/50 via-transparent to-transparent opacity-80" />
                    
                    {/* Category Pill Top-Left */}
                    <div className="absolute top-3.5 left-3.5 bg-csl-deep-blue/90 backdrop-blur-md px-3 py-1 rounded-lg border border-csl-blue/30 shadow-md">
                      <span className="text-[11px] font-bold text-csl-gold uppercase tracking-wider">
                        {course.category}
                      </span>
                    </div>

                    {/* Level Pill Top-Right */}
                    <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-csl-gold/30 shadow-xs">
                      <span className="text-[10px] font-bold text-csl-text uppercase">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Format, Rating & Student Meta */}
                      <div className="flex items-center justify-between text-xs font-semibold text-csl-muted mb-2">
                        <span className="flex items-center gap-1 text-csl-blue font-bold">
                          <Clock className="w-3.5 h-3.5 text-csl-gold" />
                          {course.format}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-csl-gold font-bold">
                            <Star className="w-3.5 h-3.5 fill-csl-gold" />
                            {course.rating}
                          </span>
                          <span className="text-csl-muted text-[11px]">
                            ({course.students})
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setActiveCourseDetails(course)}
                        className="text-lg font-bold text-csl-text group-hover:text-csl-blue transition-colors mb-2 cursor-pointer leading-snug"
                      >
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                        {course.description}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-4 border-t border-csl-gold/20 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setActiveCourseDetails(course)}
                        className="text-xs font-bold text-csl-muted hover:text-csl-blue transition-colors cursor-pointer"
                      >
                        Syllabus
                      </button>

                      <button
                        onClick={() => setCallbackCourse(course)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm group-hover:shadow-md group-hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        Enroll →
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            4. LEARNING JOURNEY ("Choose Your Starting Point")
           ================================================== */}
        <section id="learning-journey" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="section-container">
            
            {/* Header */}
            <div className="mb-12 text-center flex flex-col items-center">
              <div className="section-eyebrow justify-center">
                <span>PROGRESSION</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Choose Your <span className="text-csl-blue">Starting Point</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
                Clear skill progressions structured from beginner fundamentals to advanced specialization.
              </p>
            </div>

            {/* Progression Pipeline (Beginner -> Intermediate -> Advanced) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              
              {/* Beginner Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-gold/20 text-csl-text font-extrabold text-xs uppercase">
                      STAGE 01
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-gold">BEGINNER</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Foundations & Core Skills</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Start here with zero prior experience. Learn programming logic, basic UI design, and fundamental computer science concepts.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Beginner').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-gold/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Intermediate Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-blue/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative">
                <div className="absolute -top-3 right-6 bg-csl-blue text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-blue/15 text-csl-blue font-extrabold text-xs uppercase">
                      STAGE 02
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-blue">INTERMEDIATE</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Applied Engineering</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Build real applications, connect APIs, work with databases, and architect cloud deployments.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Intermediate').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-blue/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-csl-blue shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Stage */}
              <div className="bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-csl-gold/20 text-csl-text font-extrabold text-xs uppercase">
                      STAGE 03
                    </span>
                    <span className="text-xs font-mono font-bold text-csl-gold">ADVANCED</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-csl-text mb-3">Production & Specialization</h3>
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-6">
                    Specialized advanced engineering in MLOps, LLM fine-tuning, cloud infrastructure orchestration, and defensive cybersecurity.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {coursesCatalog.filter(c => c.level === 'Advanced').map((course) => (
                      <div key={course.id} className="flex items-center gap-2 text-xs font-bold text-csl-text bg-csl-bg/80 border border-csl-gold/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================================================
            5. LEARN BY DOING
           ================================================== */}
        <section id="practical" className="relative w-full py-16 md:py-24 section-container">
          
          {/* Header */}
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="section-eyebrow justify-center">
              <span>METHODOLOGY</span>
              <div></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Learn by <span className="text-csl-blue">Doing.</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
              Our curriculum prioritizes hands-on project building over passive lectures.
            </p>
          </div>

          {/* 4 Editorial Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              {
                icon: Code2,
                title: 'HANDS-ON PROJECTS',
                desc: 'Build practical applications while learning.'
              },
              {
                icon: Cpu,
                title: 'INDUSTRY TOOLS',
                desc: 'Work with technologies used in modern development, cloud, data, and AI.'
              },
              {
                icon: Layers,
                title: 'STRUCTURED LEARNING',
                desc: 'Follow clearly organized modules from fundamentals to advanced concepts.'
              },
              {
                icon: Sparkles,
                title: 'CAREER-FOCUSED SKILLS',
                desc: 'Develop skills that can be applied to real-world projects.'
              }
            ].map((block, idx) => {
              const BlockIcon = block.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md border border-csl-gold/25 rounded-2xl p-6 flex flex-col justify-between hover:border-csl-gold/60 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-5 shrink-0">
                    <BlockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-wider text-csl-text uppercase mb-2">
                      {block.title}
                    </h3>
                    <p className="text-xs text-csl-muted font-medium leading-relaxed">
                      "{block.desc}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            6. FINAL CLOSING CTA SECTION
           ================================================== */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white/40 via-[#FBF7F4] to-csl-bg border-t border-csl-gold/20">
          <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            
            <div className="w-12 h-12 rounded-2xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-6 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Your next skill <span className="text-csl-blue">starts here.</span>
            </h2>

            <p className="text-csl-muted font-medium text-sm md:text-base section-subheading mb-8 max-w-lg">
              Pick a course, start learning, and turn knowledge into something you can build.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Explore All Courses
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setCallbackCourse(coursesCatalog[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Request a Callback →
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* ==================================================
          MODAL 1: COURSE DETAILS / SYLLABUS EXPANDED MODAL
          Structured hierarchy:
          COURSE HERO -> COURSE OVERVIEW -> LEARNING PATH -> CURRICULUM (BASIC / INTERMEDIATE / ADVANCED) -> LEARNING OUTCOMES -> CTA
         ================================================== */}
      <AnimatePresence>
        {activeCourseDetails && (
          <CourseDetailsModal
            course={activeCourseDetails}
            onClose={() => setActiveCourseDetails(null)}
            onEnroll={() => {
              const courseToEnroll = activeCourseDetails;
              setActiveCourseDetails(null);
              setCallbackCourse(courseToEnroll);
            }}
          />
        )}
      </AnimatePresence>

      {/* ==================================================
          MODAL 2: CALLBACK REQUEST POPUP (With Auto-Selected Course & EmailJS)
         ================================================== */}
      <AnimatePresence>
        {callbackCourse && (
          <CallbackModal 
            course={callbackCourse} 
            onClose={() => setCallbackCourse(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

{/* COURSE DETAILS MODAL COMPONENT */}
function CourseDetailsModal({
  course,
  onClose,
  onEnroll
}: {
  course: CourseItem;
  onClose: () => void;
  onEnroll: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Open the first module of each level by default
    const initial: Record<string, boolean> = {};
    if (course.levels.basic.modules[0]) initial[`basic-${course.levels.basic.modules[0].moduleNumber}`] = true;
    if (course.levels.intermediate.modules[0]) initial[`intermediate-${course.levels.intermediate.modules[0].moduleNumber}`] = true;
    if (course.levels.advanced.modules[0]) initial[`advanced-${course.levels.advanced.modules[0].moduleNumber}`] = true;
    return initial;
  });

  const toggleModule = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const renderLevelModules = (levelSection: CourseLevelSection, levelKey: 'basic' | 'intermediate' | 'advanced') => {
    const meta = LEVEL_METADATA[levelKey];
    const isBasic = levelKey === 'basic';
    const isIntermediate = levelKey === 'intermediate';

    const levelHeaderStyle = isBasic
      ? 'bg-emerald-500/10 border-emerald-300 text-emerald-900'
      : isIntermediate
      ? 'bg-blue-500/10 border-blue-300 text-csl-deep-blue'
      : 'bg-purple-500/10 border-purple-300 text-purple-900';

    const pillStyle = isBasic
      ? 'bg-emerald-600 text-white'
      : isIntermediate
      ? 'bg-csl-blue text-white'
      : 'bg-purple-600 text-white';

    return (
      <div key={levelKey} className="flex flex-col gap-3">
        {/* Level Header Banner */}
        <div className={`p-4 rounded-2xl border ${levelHeaderStyle} flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${pillStyle}`}>
                {meta.name}
              </span>
              <span className="text-xs font-bold">{meta.purpose}</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              {meta.expectedFocus}
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-xl bg-white/80 border border-csl-gold/25 self-start sm:self-center shrink-0">
            {levelSection.modules.length} Modules
          </span>
        </div>

        {/* Modules List Accordion */}
        <div className="flex flex-col gap-2.5">
          {levelSection.modules.map((mod) => {
            const modKey = `${levelKey}-${mod.moduleNumber}`;
            const isOpen = !!expandedModules[modKey];

            return (
              <div 
                key={mod.moduleNumber} 
                className="bg-white/90 border border-csl-gold/20 rounded-2xl overflow-hidden transition-all duration-200 hover:border-csl-gold/45 shadow-xs"
              >
                {/* Module Bar */}
                <button
                  type="button"
                  onClick={() => toggleModule(modKey)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-csl-bg/60 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-csl-gold/15 text-csl-text font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-csl-gold/30">
                      {mod.moduleNumber.replace('Module ', '')}
                    </span>
                    <div>
                      <div className="text-[10px] font-bold text-csl-gold uppercase font-mono">
                        {mod.moduleNumber}
                      </div>
                      <h5 className="text-sm font-bold text-csl-text leading-snug">
                        {mod.title}
                      </h5>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {mod.duration && (
                      <span className="text-xs font-semibold text-csl-muted hidden sm:inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-csl-gold" />
                        {mod.duration}
                      </span>
                    )}
                    <div className="w-7 h-7 rounded-full bg-csl-bg flex items-center justify-center text-csl-muted">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Module Content & Topics */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-csl-gold/15 bg-csl-bg/40"
                    >
                      <div className="p-4 flex flex-col gap-2.5">
                        {mod.technicalContent && (
                          <div>
                            <span className="text-[10px] font-extrabold text-csl-muted uppercase tracking-wider block mb-1">
                              Technical Content
                            </span>
                            <p className="text-xs text-csl-text font-medium leading-relaxed bg-white/90 p-3 rounded-xl border border-csl-gold/20">
                              {mod.technicalContent}
                            </p>
                          </div>
                        )}

                        {mod.topics && mod.topics.length > 0 && (
                          <div>
                            <span className="text-[10px] font-extrabold text-csl-blue uppercase tracking-wider block mb-1.5">
                              Topics Covered
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {mod.topics.map((t, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2.5 py-1 rounded-lg bg-white border border-csl-gold/20 text-[11px] font-medium text-csl-text shadow-xs"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
      />

      {/* Modal Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-3xl bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* 1. COURSE HERO */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-csl-gold/20">
          <div>
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-csl-blue/10 text-csl-blue font-bold text-[11px] uppercase">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-csl-gold/20 text-csl-text font-bold text-[11px] uppercase">
                {course.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase border border-emerald-200">
                {course.format}
              </span>
              <span className="text-xs font-bold text-csl-gold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-csl-gold" />
                {course.rating}
              </span>
              <span className="text-xs font-semibold text-csl-muted flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-csl-blue" />
                {course.students} Enrolled
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-csl-text">
              {course.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 flex flex-col gap-6">
          {/* 2. COURSE OVERVIEW */}
          <div>
            <h4 className="text-xs font-extrabold text-csl-blue uppercase tracking-wider mb-2">
              Course Overview
            </h4>
            <p className="text-sm text-csl-muted font-medium leading-relaxed bg-white/70 p-4 rounded-2xl border border-csl-gold/20">
              {course.description}
            </p>
          </div>

          {/* 3. LEARNING PATH (BASIC -> INTERMEDIATE -> ADVANCED) */}
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h4 className="text-xs font-extrabold text-csl-blue uppercase tracking-wider">
                Learning Path & Curriculum
              </h4>
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'all' ? 'bg-csl-text text-white' : 'bg-white text-csl-muted hover:text-csl-text border border-csl-gold/20'
                  }`}
                >
                  All ({course.modules.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'basic' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  Basic ({course.levels.basic.modules.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('intermediate')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'intermediate' ? 'bg-csl-blue text-white' : 'bg-blue-50 text-csl-blue border border-blue-200'
                  }`}
                >
                  Intermediate ({course.levels.intermediate.modules.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('advanced')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'advanced' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 border border-purple-200'
                  }`}
                >
                  Advanced ({course.levels.advanced.modules.length})
                </button>
              </div>
            </div>

            {/* 4. CURRICULUM SECTIONS (BASIC / INTERMEDIATE / ADVANCED) */}
            <div className="flex flex-col gap-6">
              {(activeTab === 'all' || activeTab === 'basic') &&
                course.levels.basic.modules.length > 0 &&
                renderLevelModules(course.levels.basic, 'basic')}

              {(activeTab === 'all' || activeTab === 'intermediate') &&
                course.levels.intermediate.modules.length > 0 &&
                renderLevelModules(course.levels.intermediate, 'intermediate')}

              {(activeTab === 'all' || activeTab === 'advanced') &&
                course.levels.advanced.modules.length > 0 &&
                renderLevelModules(course.levels.advanced, 'advanced')}
            </div>
          </div>

          {/* 5. LEARNING OUTCOMES */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold text-csl-blue uppercase tracking-wider mb-3">
                Learning Outcomes
              </h4>
              <div className="flex flex-col gap-2">
                {course.learningOutcomes.map((item, idx) => (
                  <div key={idx} className="bg-csl-bg/80 border border-csl-gold/20 p-3 rounded-xl flex items-start gap-2.5 text-xs font-medium text-csl-text">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 6. EXISTING COURSE ENQUIRY / CTA */}
        <div className="pt-4 border-t border-csl-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-semibold text-csl-muted">
            <span>Format: <strong>{course.format}</strong></span>
            <span>•</span>
            <span>Students: <strong>{course.students}</strong></span>
            <span>•</span>
            <span>Modules: <strong>{course.modules.length}</strong></span>
          </div>

          <button
            onClick={onEnroll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Enroll / Request Callback
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

{/* CALLBACK MODAL COMPONENT */}
function CallbackModal({ course, onClose }: { course: CourseItem; onClose: () => void }) {
  const [selectedCourseId, setSelectedCourseId] = useState(course.id);

  const selectedCourse =
    coursesCatalog.find((item) => item.id === selectedCourseId) ?? course;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call',
    message: ''
  });

  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [dotsIndex, setDotsIndex] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (submitState !== 'submitting') return;

    const interval = setInterval(() => {
      setDotsIndex((prev) => (prev % 3) + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [submitState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill out your Name, Phone Number, and Email Address.');
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      setErrorMessage('Name can contain only letters, spaces, apostrophes, and hyphens.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitState('submitting');

    const message = `Hello, I would like to enquire about a course.
    Name: ${formData.name}
    Phone: ${formData.phone}
    Course: ${selectedCourse.title}
    Message: ${formData.message || 'N/A'}`;

    openWhatsApp(message);

    setSubmitState('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-1">
            Request a Callback
          </span>

          <h3 className="text-2xl font-extrabold text-csl-text tracking-tight mb-2">
            Callback Request Form
          </h3>

          <p className="text-xs text-csl-muted font-medium leading-relaxed">
            Leave your details and we'll contact you via WhatsApp or phone call to discuss the course, schedule, fees, and enrollment process.
          </p>
        </div>

        {/* Course Selection */}
        <div className="mb-5">
          <label className="text-[10px] font-extrabold text-csl-gold uppercase tracking-wider block mb-2">
            Selected Course
          </label>

          <CustomDropdown
            value={selectedCourseId}
            onChange={(val) => setSelectedCourseId(val)}
            options={coursesCatalog.map((item) => ({ value: item.id, label: item.title }))}
            placeholder="Select Course"
            rounded="rounded-2xl"
          />

          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[11px] text-csl-muted font-medium">
              Choose the course you are interested in
            </span>

            <span className="text-[10px] font-bold text-csl-blue bg-csl-blue/10 px-2.5 py-1 rounded-lg">
              {selectedCourse.format}
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {submitState === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-extrabold text-csl-text mb-2">
              Callback Requested ✓
            </h4>

            <p className="text-xs text-csl-muted font-medium leading-relaxed max-w-xs mb-6">
              Thanks! We've received your request. Our team will contact you shortly via your preferred method.
            </p>

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="hidden"
              name="course"
              value={selectedCourse.title}
            />

            <input
              type="hidden"
              name="preferred_contact_method"
              value={formData.preferredContactMethod}
            />

            <input
              type="hidden"
              name="subject"
              value={`Course callback request from ${formData.name}`}
            />

            {/* Name */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                  setFormData({ ...formData, name: value });
                }}
                placeholder="Enter your name"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                maxLength={10}
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: value });
                }}
                placeholder="Enter your WhatsApp / phone number"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Institution / College (Optional)
              </label>

              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={(e) =>
                  setFormData({ ...formData, institution: e.target.value })
                }
                placeholder="Enter your institution"
                className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1.5">
                Preferred Contact Method
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      preferredContactMethod: 'WhatsApp'
                    })
                  }
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                    formData.preferredContactMethod === 'WhatsApp'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                      : 'bg-white border-csl-gold/30 text-csl-muted'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      preferredContactMethod: 'Phone Call'
                    })
                  }
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                    formData.preferredContactMethod === 'Phone Call'
                      ? 'border-csl-blue text-csl-blue shadow-xs'
                      : 'bg-white border-csl-gold/30 text-csl-muted'
                  }`}
                  style={
                    formData.preferredContactMethod === 'Phone Call'
                      ? { backgroundColor: 'rgba(20, 85, 184, 0.10)' }
                      : undefined
                  }
                >
                  <Phone className="w-4 h-4 text-csl-blue" />
                  Phone Call
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-bold text-csl-text block mb-1">
                Message (Optional)
              </label>

              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Anything you'd like to ask about the course?"
                className="w-full bg-white border border-csl-gold/30 rounded-xl p-3 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className={`w-full mt-2 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                submitState === 'submitting'
                  ? 'bg-gray-600 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white hover:shadow-lg cursor-pointer'
              }`}
            >
              {submitState === 'submitting' ? (
                <span>Requesting Callback{'.'.repeat(dotsIndex)}</span>
              ) : (
                <>
                  Request Callback
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
