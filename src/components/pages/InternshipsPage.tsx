import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  CheckCircle2,
  AlertCircle,
  Globe2
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { openWhatsApp } from '../../lib/whatsapp';
import { InternshipDetails } from '../sections/Internships/InternshipDetails';
import { InternshipGallery } from '../sections/Internships/InternshipGallery';
import { InternshipReviewsMarquee } from '../sections/Internships/InternshipReviewsMarquee';
import { InternshipVideoTestimonials } from '../sections/Internships/InternshipVideoTestimonials';

// Local type for enquiry
interface InternshipEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  institution: string;
  degree: string;
  year: string;
  domain: string;
  duration: string;
  message?: string;
}

// @ts-ignore
import heroStandaloneVisual from '../../../Elements/INTERNSHIPS/INTERNSHIPS - Standalone.png';

// 8 Official Internship Domains from CSL Brochure
const tracksData = [
  {
    id: '01',
    title: 'Artificial Intelligence & Machine Learning Engineering',
    description: 'Build predictive machine learning models, neural networks, and computer vision pipelines for real-world applications.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Neural Networks', 'MLOps'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Supervised & unsupervised predictive models',
      'Computer vision classification pipeline',
      'Model performance optimization & evaluation'
    ]
  },
  {
    id: '02',
    title: 'Generative AI & Prompt Engineering',
    description: 'Master advanced prompt architecture, contextual Retrieval-Augmented Generation (RAG), and LLM application development.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['LLMs', 'Prompt Engineering', 'RAG Pipelines', 'OpenAI API', 'LangChain', 'Vector DBs'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Context-aware knowledge base assistant',
      'Advanced prompt chaining pipeline',
      'Retrieval-augmented conversational agent'
    ]
  },
  {
    id: '03',
    title: 'Agentic AI & Intelligent Automation',
    description: 'Architect multi-agent autonomous systems, intelligent tool-calling workflows, and goal-driven decision loops.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['AI Agents', 'Autonomous Workflows', 'Tool Calling', 'CrewAI', 'LangGraph', 'Automations'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Multi-agent collaborative research system',
      'Autonomous task executor with external tool calling',
      'Automated intelligence report generator'
    ]
  },
  {
    id: '04',
    title: 'Full Stack Web & Mobile Application Development',
    description: 'Design and deploy modern full-stack web platforms and cross-platform mobile apps using industry-standard frameworks.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Responsive web portal with secure authentication',
      'Full-stack dynamic data-driven dashboard',
      'Cross-platform responsive client interfaces'
    ]
  },
  {
    id: '05',
    title: 'DevOps & Cloud Engineering',
    description: 'Implement automated CI/CD delivery pipelines, containerization, microservices deployment, and cloud infrastructure.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux', 'Terraform'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Automated GitHub Actions build & deploy pipeline',
      'Containerized multi-service Docker deployment',
      'Cloud resource provisioning and monitoring'
    ]
  },
  {
    id: '06',
    title: 'Software Testing & QA Automation',
    description: 'Master manual and automated testing methodologies, API verification, test frameworks, and defect tracking lifecycles.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Selenium', 'Cypress', 'API Testing', 'Postman', 'TestNG', 'QA Frameworks'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Automated UI test suite for web applications',
      'Comprehensive REST API integration test collection',
      'Regression test plan and bug reporting documentation'
    ]
  },
  {
    id: '07',
    title: 'UI/UX Product Design',
    description: 'Create user journeys, design systems, accessible interfaces, and interactive Figma prototypes tested for usability.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Figma', 'User Research', 'Design Systems', 'Wireframing', 'Prototyping', 'Usability'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Complete product design system and component library',
      'High-fidelity interactive prototype with micro-interactions',
      'Usability research and user journey mapping'
    ]
  },
  {
    id: '08',
    title: 'Data Analytics & Business Intelligence',
    description: 'Transform complex datasets into actionable business intelligence using SQL, statistical analysis, and executive dashboards.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Power BI', 'SQL', 'Python', 'Excel', 'Tableau', 'Data Modeling'],
    duration: '15 or 30 Days',
    mode: 'Online / Offline',
    projects: [
      'Interactive Power BI executive performance dashboard',
      'Relational database querying and data modeling',
      'Statistical trends analysis and business reporting'
    ]
  }
];

export function InternshipsPage() {
  // Internship Enquiry Form State
  const [formData, setFormData] = useState<InternshipEnquiryPayload>({
    name: '',
    email: '',
    phone: '',
    institution: '',
    degree: '',
    year: '',
    domain: '',
    duration: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submit state machine: idle -> submitting -> button-green-swipe -> submitted-green -> flowing-gradient -> success-complete | error
  type SubmitState = 'idle' | 'submitting' | 'button-green-swipe' | 'submitted-green' | 'flowing-gradient' | 'success-complete' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submittingDots, setSubmittingDots] = useState('.');
  const [errorMessage, setErrorMessage] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const actualFormRef = useRef<HTMLFormElement>(null);

  // Submitting dots animation loop (Submitting -> Submitting.. -> Submitting...)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (submitState === 'submitting') {
      interval = setInterval(() => {
        setSubmittingDots(prev => (prev === '...' ? '.' : prev + '.'));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [submitState]);

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const handleSelectTrack = (title: string) => {
    setFormData(prev => ({ ...prev, domain: title }));
    const formElement = document.getElementById('apply-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution / College name is required.';
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree / Program is required.';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your current year.';
    }

    if (!formData.domain) {
      newErrors.domain = 'Please select an interested domain.';
    }

    if (!formData.duration) {
      newErrors.duration = 'Please select preferred internship duration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // STATE 2 — SUBMITTING: Immediately quick fade button into neutral grey gradient (200ms)
    setSubmitState('submitting');
    setErrorMessage('');

    // Build WhatsApp message and open chat
    const message = `Hello, I would like to enquire about an internship at Creator Space Lab.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Institution: ${formData.institution}
Degree: ${formData.degree} (${formData.year})
Track: ${formData.domain}
Duration: ${formData.duration}
Message: ${formData.message || 'N/A'}`;
    openWhatsApp(message);

    // STATE 3 — SUCCESS: Reveal GREEN SUCCESS GRADIENT from LEFT -> RIGHT (550ms) + Soft Reflective Light Sweep
    setSubmitState('button-green-swipe');

    setTimeout(() => {
      // Button is full CSL Green with "Submitted" text
      setSubmitState('submitted-green');
    }, 550);

    setTimeout(() => {
      // Trigger soft borderless chromatic liquid light flow across form (~2.2s)
      setSubmitState('flowing-gradient');
    }, 1050);

    setTimeout(() => {
      // Display clean success confirmation state UI ("Enquiry Sent")
      setSubmitState('success-complete');
    }, 3250);
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  const isFlowingGradient = submitState === 'flowing-gradient';

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      
      {/* ==================================================
          1. HERO SECTION (RECLINING SCROLL EFFECT)
        ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Background Yellow Voxel Floating Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT — COMPLETE HERO CONTENT STACK */}
          <div className="order-1 flex flex-col items-start max-w-xl">

            <div className="section-eyebrow">
              <span>INTERNSHIPS</span>
              <div></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-csl-text leading-[1.05] tracking-tight mb-6">
              Build beyond the <br />
              <span className="text-csl-blue">classroom.</span>
            </h1>

            <p className="text-csl-muted font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              Work on real-world problems, build with modern technologies, and turn your skills into experience.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Explore Tracks
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-deep-blue px-6 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-white hover:border-csl-blue transition-all duration-300"
              >
                Program Details
              </a>
            </div>

          </div>

          {/* RIGHT — HERO VISUAL ASSET */}
          <div className="order-2 flex items-center justify-center relative w-full">

            <motion.div
              className="relative w-full max-w-[540px] sm:max-w-[620px]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/20 via-transparent to-csl-blue/15 blur-3xl -z-10 rounded-full scale-90" />

              <img
                src={heroStandaloneVisual}
                alt="CSL Internships Standalone 3D Asset"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER (Slides smoothly over hero) */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. INTERNSHIP PROGRAMS / DOMAINS SECTION
          ================================================== */}
        <section id="tracks" className="relative w-full py-16 md:py-24 section-container">
          
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="section-eyebrow">
              <span>Career-Ready Experience</span>
              <div></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Internship <span className="text-csl-blue">Domains</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
              Select your domain and gain production-grade engineering and design experience through structured project deliverables.
            </p>
          </div>

          {/* Tracks Cards Grid */}
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            {tracksData.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:border-csl-gold/60 hover:shadow-xl hover:shadow-csl-gold/10 transition-all duration-300 grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-6 lg:gap-8 items-center group"
              >
                {/* 1. Left Thumbnail with Number Overlay */}
                <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[190px] rounded-2xl overflow-hidden border border-csl-gold/20 bg-csl-bg shadow-inner">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-csl-deep-blue/90 backdrop-blur-md px-3 py-1 rounded-xl border border-csl-blue/30 shadow-md">
                    <span className="text-base font-extrabold text-csl-gold font-mono tracking-tight">
                      {track.id}
                    </span>
                  </div>
                </div>

                {/* 2. Middle Details & Tech Tags */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-csl-text group-hover:text-csl-blue transition-colors mb-2 tracking-tight">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-csl-muted font-medium mb-4 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {track.techs.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-csl-text bg-white/90 border border-csl-gold/30 rounded-lg shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Right Meta, Projects & CTA */}
                <div className="flex flex-col justify-between h-full lg:border-l lg:border-csl-gold/20 lg:pl-6 pt-4 lg:pt-0 border-t border-csl-gold/15 lg:border-t-0">
                  <div>
                    {/* Duration & Mode Badges */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-text">
                        <Calendar className="w-3.5 h-3.5 text-csl-gold" />
                        <span>{track.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-blue">
                        <Globe2 className="w-3.5 h-3.5 text-csl-blue" />
                        <span>{track.mode}</span>
                      </div>
                    </div>

                    {/* Project Outcomes */}
                    <div className="flex flex-col gap-1.5 mb-5">
                      {track.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-csl-muted font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-csl-gold mt-1.5 shrink-0" />
                          <span className="leading-snug">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore CTA */}
                  <button 
                    onClick={() => handleSelectTrack(track.title)}
                    className="inline-flex items-center justify-start gap-2 text-xs sm:text-sm font-bold text-csl-blue hover:text-csl-deep-blue transition-colors group/link cursor-pointer"
                  >
                    <span>Apply for Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </section>

        {/* ==================================================
            3. INTERNSHIP DETAILS (DURATION, FEES, MODE, ELIGIBILITY)
          ================================================== */}
        <InternshipDetails />

        {/* ==================================================
            4. INTERNSHIP EXPERIENCE (ANGLED PHOTO CAROUSEL)
          ================================================== */}
        <InternshipGallery />

        {/* ==================================================
            5. WHAT OUR INTERNS SAY (SEAMLESS INFINITE REVIEW MARQUEE)
          ================================================== */}
        <InternshipReviewsMarquee />

        {/* ==================================================
            6. VIDEO TESTIMONIALS (HEAR FROM OUR INTERNS)
          ================================================== */}
        <InternshipVideoTestimonials />

        {/* ==================================================
            6. INTERNSHIP ENQUIRY FORM SECTION
          ================================================== */}
        <section id="apply-form" className="relative w-full py-16 md:py-24 section-container">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="section-eyebrow justify-center">
                <span>Availability Enquiry</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Looking for an <span className="text-csl-blue">Internship?</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base section-subheading max-w-xl mx-auto">
                Tell us a little about yourself and the kind of internship you're looking for. Send us an enquiry and our team will get in touch regarding available internship opportunities that match your interests and background.
              </p>
            </div>

            {/* Application Card Form Container */}
            <div 
              ref={formRef}
              className="relative w-full bg-white/90 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-6 sm:p-10 shadow-xl shadow-csl-gold/5 overflow-hidden"
            >
              {/* Atmospheric Translucent Chromatic Liquid Light Flow (No boxes/shapes) */}
              {isFlowingGradient && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.45, 0.45, 0] }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl"
                >
                  {/* Oversized heavily blurred gradient field animating background-position & hue */}
                  <motion.div
                    initial={{ backgroundPosition: '0% 100%', filter: 'blur(50px) hue-rotate(0deg)' }}
                    animate={{ backgroundPosition: '100% 0%', filter: 'blur(65px) hue-rotate(25deg)' }}
                    transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
                    className="w-full h-full"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 80%, rgba(0,229,255,0.4) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(123,44,191,0.35) 0%, transparent 55%),
                        radial-gradient(circle at 60% 40%, rgba(0,71,171,0.35) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,183,3,0.3) 0%, transparent 60%),
                        linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(139,92,246,0.25) 35%, rgba(236,72,153,0.2) 70%, rgba(255,183,3,0.2) 100%)
                      `,
                      backgroundSize: '230% 230%'
                    }}
                  />
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {submitState === 'success-complete' ? (
                  /* Clean Post-Submission Success State UI */
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-8 px-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text mb-3 tracking-tight">
                      Enquiry Sent
                    </h3>

                    <p className="text-csl-muted font-medium text-sm sm:text-base max-w-md leading-relaxed mb-6">
                      Thanks for reaching out. Our team will review your enquiry and get back to you regarding available internship opportunities.
                    </p>

                    <button
                      onClick={() => {
                        setSubmitState('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          institution: '',
                          degree: '',
                          year: '',
                          domain: '',
                          duration: '',
                          message: ''
                        });
                      }}
                      className="px-6 py-3 rounded-xl bg-csl-blue text-white font-bold text-sm hover:bg-csl-deep-blue transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  /* Main Form UI */
                  <form 
                    key="form-ui" 
                    ref={actualFormRef}
                    onSubmit={handleSubmit} 
                    className={`flex flex-col gap-6 w-full transition-all duration-700 ${
                      isFlowingGradient ? 'filter hue-rotate-[15deg] contrast-[1.02] opacity-[0.98]' : ''
                    }`}
                  >
                    <input type="hidden" name="subject" value={`Internship request form from ${formData.name}`} />
                    
                    {/* Error Banner if validation fails */}
                    {submitState === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs sm:text-sm font-semibold">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                      </div>
                    )}

                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      
                      {/* Full Name */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={e => {
                            const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                            setFormData({ ...formData, name: value });
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.name ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</span>}
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.email ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.email && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</span>}
                      </div>

                    </div>

                    {/* Row 2: Phone Number & Institution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      
                      {/* Phone Number */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your 10-digit phone number"
                          value={formData.phone}
                          maxLength={10}
                          inputMode="numeric"
                          onChange={e => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({ ...formData, phone: value });
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.phone && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</span>}
                      </div>

                      {/* Institution / College */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Institution / College <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="institution"
                          placeholder="Enter your college or institution"
                          value={formData.institution}
                          onChange={e => setFormData({ ...formData, institution: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.institution ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.institution && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.institution}</span>}
                      </div>

                    </div>

                    {/* Row 3: Degree & Current Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      
                      {/* Degree / Program */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Degree / Program <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="degree"
                          placeholder="e.g. B.Sc CS, BCA, B.Tech, MCA"
                          value={formData.degree}
                          onChange={e => setFormData({ ...formData, degree: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.degree ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {errors.degree && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.degree}</span>}
                      </div>

                      {/* Current Year Dropdown */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Current Year <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="pursuing_year"
                          value={formData.year}
                          onChange={e => setFormData({ ...formData, year: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.year ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text focus:outline-none focus:ring-2 transition-all`}
                        >
                          <option value="">Select Current Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Final Year">Final Year</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                        {errors.year && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.year}</span>}
                      </div>

                    </div>

                    {/* Row 4: Interested Domain & Preferred Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      
                      {/* Interested Internship Domain Dropdown */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Interested Internship Domain <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="domain"
                          value={formData.domain}
                          onChange={e => setFormData({ ...formData, domain: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.domain ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text focus:outline-none focus:ring-2 transition-all`}
                        >
                          <option value="">Select Domain</option>
                          <option value="Artificial Intelligence & Machine Learning Engineering">Artificial Intelligence & Machine Learning Engineering</option>
                          <option value="Generative AI & Prompt Engineering">Generative AI & Prompt Engineering</option>
                          <option value="Agentic AI & Intelligent Automation">Agentic AI & Intelligent Automation</option>
                          <option value="Full Stack Web & Mobile Application Development">Full Stack Web & Mobile Application Development</option>
                          <option value="DevOps & Cloud Engineering">DevOps & Cloud Engineering</option>
                          <option value="Software Testing & QA Automation">Software Testing & QA Automation</option>
                          <option value="UI/UX Product Design">UI/UX Product Design</option>
                          <option value="Data Analytics & Business Intelligence">Data Analytics & Business Intelligence</option>
                        </select>
                        {errors.domain && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.domain}</span>}
                      </div>

                      {/* Preferred Internship Duration Dropdown */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                          Preferred Internship Duration <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={e => setFormData({ ...formData, duration: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border ${
                            errors.duration ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } text-sm font-medium text-csl-text focus:outline-none focus:ring-2 transition-all`}
                        >
                          <option value="">Select Preferred Duration</option>
                          <option value="15 Days (₹1,000)">15 Days (₹1,000)</option>
                          <option value="30 Days (₹2,000)">30 Days (₹2,000)</option>
                          <option value="Flexible / Open to Discussion">Flexible / Open to Discussion</option>
                        </select>
                        {errors.duration && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.duration}</span>}
                      </div>

                    </div>

                    {/* Message / Internship Requirement (Optional) */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-2">
                        Message / Internship Requirement <span className="text-csl-muted font-normal lowercase">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us what kind of internship you're looking for, preferred mode (online/offline), or any specific technical interests."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-csl-gold/30 focus:border-csl-blue focus:ring-2 focus:ring-csl-blue/20 text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Custom State-Based Animated Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={submitState !== 'idle' && submitState !== 'error'}
                        className="relative w-full h-[52px] rounded-xl font-bold text-sm sm:text-base overflow-hidden shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {/* STATE 1 — NORMAL: CSL Normal Blue Gradient Layer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-csl-deep-blue to-csl-blue flex items-center justify-center text-white">
                          <div className="flex items-center gap-2">
                            <span>Send Internship Enquiry</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>

                        {/* STATE 2 — SUBMITTING: Neutral Grey Gradient Layer (Quick Fade 200ms, NO green, NO swipe) */}
                        {submitState === 'submitting' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 flex items-center justify-center text-white z-10"
                          >
                            <span>Submitting{submittingDots}</span>
                          </motion.div>
                        )}

                        {/* STATE 3 — SUCCESS: Reveal Green Success Gradient (LEFT -> RIGHT over 550ms) + Soft Reflective Light Sweep */}
                        {(submitState === 'button-green-swipe' || submitState === 'submitted-green' || submitState === 'flowing-gradient') && (
                          <motion.div
                            initial={{ x: submitState === 'button-green-swipe' ? '-100%' : '0%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white z-20 shadow-lg shadow-emerald-600/20 overflow-hidden"
                          >
                            {/* Soft Reflective Light Sweep traveling across green surface */}
                            {submitState === 'button-green-swipe' && (
                              <motion.div
                                initial={{ x: '-120%' }}
                                animate={{ x: '220%' }}
                                transition={{ duration: 0.65, ease: 'easeInOut', delay: 0.1 }}
                                className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] pointer-events-none"
                              />
                            )}

                            {/* Button Text = "Submitted" */}
                            <div className="flex items-center gap-2 relative z-30">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                              <span>Submitted</span>
                            </div>
                          </motion.div>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
