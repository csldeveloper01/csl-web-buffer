import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  MapPin,
  Building2,
  CheckCircle,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  Clock,
  CheckSquare,
  Brain,
  BarChart3,
  Cloud
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { CareerModal } from '../sections/Careers/CareerModal';
import { CareerApplicationForm } from '../sections/Careers/CareerApplicationForm';

export interface CareerPosition {
  id: string;
  title: string;
  category: 'Marketing' | 'Human Resources' | 'Technical' | 'Business';
  experience: string;
  vacancies: string;
  vacancyCount: number;
  icon: typeof Megaphone;
  summary: string;
  responsibilities: string[];
  skills: string[];
  qualifications: string[];
  internshipStructure?: {
    duration: string;
    training: string;
  };
  opportunity?: string;
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
    summary:
      'We are looking for creative, enthusiastic, and self-motivated Digital Marketing Interns to join our marketing team. This internship provides hands-on experience in digital marketing strategies, social media management, SEO, paid advertising, content creation, and campaign execution. Candidates will work on live projects and gain practical exposure to modern digital marketing tools and techniques.',
    opportunity:
      'Successful candidates who demonstrate creativity, analytical skills, and consistent performance during the internship will have the opportunity to transition into a full-time Digital Marketing Executive role.',
    responsibilities: [
      'Plan and execute digital marketing campaigns across multiple platforms.',
      'Manage and optimize social media accounts including Instagram, Facebook, LinkedIn, YouTube, and X.',
      'Create engaging content including posts, blogs, banners, and promotional materials.',
      'Assist in Search Engine Optimization (SEO) and Search Engine Marketing (SEM) activities.',
      'Run and optimize paid advertising campaigns on Google Ads and Meta Ads.',
    ],
    skills: [
      'Basic understanding of Digital Marketing concepts.',
      'Knowledge of Social Media Marketing (SMM).',
      'Basic understanding of SEO and SEM.',
      'Familiarity with Google Analytics and Google Search Console.',
      'Basic knowledge of Google Ads and Meta Ads Manager.',
    ],
    qualifications: [
      "Master's Degree in Marketing, Business Administration, Computer Science, Information Technology, Mass Communication, or any related field.",
      'Freshers are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Training Period',
    },
  },
  {
    id: 'digital-marketing-intern',
    title: 'Digital Marketing Intern',
    category: 'Marketing',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Sparkles,
    summary:
      'We are looking for creative, enthusiastic, and self-motivated Digital Marketing Interns to join our marketing team. This internship provides hands-on experience in digital marketing strategies, social media management, SEO, paid advertising, content creation, and campaign execution. Candidates will work on live projects and gain practical exposure to modern digital marketing tools and techniques.',
    opportunity:
      'Successful candidates who demonstrate creativity, analytical skills, consistency, and professional growth during the internship will have the opportunity to transition into a full-time Digital Marketing Executive role.',
    responsibilities: [
      'Plan and execute digital marketing campaigns across multiple platforms.',
      'Manage and optimize social media accounts including Instagram, Facebook, LinkedIn, YouTube, and X.',
      'Create engaging content including social media posts, blogs, banners, promotional materials, and campaign creatives.',
      'Assist with Search Engine Optimization (SEO) and Search Engine Marketing (SEM) activities.',
      'Conduct basic keyword research and competitor analysis.',
      'Run and optimize paid advertising campaigns on Google Ads and Meta Ads.',
      'Monitor campaign performance and prepare basic marketing reports.',
      'Assist in developing content calendars and marketing strategies.',
      'Track digital marketing trends and identify opportunities for improving online visibility.',
      'Collaborate with design, technology, and business teams for marketing initiatives.',
    ],
    skills: [
      'Basic understanding of Digital Marketing concepts.',
      'Knowledge of Social Media Marketing (SMM).',
      'Basic understanding of SEO and SEM.',
      'Familiarity with Google Analytics and Google Search Console.',
      'Basic knowledge of Google Ads and Meta Ads Manager.',
      'Good written and verbal communication skills.',
      'Creativity and content-writing ability.',
      'Basic analytical and research skills.',
      'Willingness to learn and experiment with new marketing tools and strategies.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Marketing, Business Administration, Computer Science, Information Technology, Mass Communication, or any related field.",
      'Freshers are encouraged to apply.',
      'Candidates with academic projects, certifications, or practical exposure to digital marketing are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Training Period',
    },
  },
  {
    id: 'human-resources',
    title: 'Human Resources / HR Operations',
    category: 'Human Resources',
    experience: '6 months - 1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Users,
    summary:
      'We are looking for an organized and proactive HR Operations professional/intern to support day-to-day HR activities, employee coordination, recruitment support, documentation, and HR administration. The ideal candidate should have good communication skills, attention to detail, and a strong interest in building a career in Human Resources.',
    responsibilities: [
      'Support day-to-day HR operations and employee coordination.',
      'Assist with recruitment coordination and interview scheduling.',
      'Coordinate employee onboarding and joining formalities.',
      'Maintain employee records, attendance, and leave details.',
      'Prepare and maintain HR documents and employee records.',
      'Coordinate HR communication with employees and internal teams.',
      'Assist in implementing HR policies and processes.',
      'Support employee engagement and internal HR activities.',
      'Prepare basic HR reports and documentation.',
      'Maintain confidentiality of employee information.',
    ],
    skills: [
      'Basic understanding of HR Operations concepts.',
      'Good verbal and written communication skills.',
      'Strong coordination and organizational skills.',
      'Basic knowledge of HR processes.',
      'Proficiency in MS Office / Google Workspace.',
      'Good documentation and record-keeping skills.',
      'Attention to detail and time management.',
      'Professional attitude and willingness to learn.',
    ],
    qualifications: [
      "Master's degree in Human Resources, Business Administration, Management, or a related field.",
      'Freshers and candidates with HR internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Technical Training',
    },
  },
  {
    id: 'hr-intern',
    title: 'HR Intern',
    category: 'Human Resources',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: UserPlus,
    summary:
      'We are looking for organized, proactive, and enthusiastic HR Interns to join our Human Resources team. This internship provides hands-on experience in recruitment, employee coordination, onboarding, HR documentation, employee engagement, and day-to-day HR operations. Candidates will gain practical exposure to professional HR processes and will have the opportunity to work closely with employees and internal teams.',
    opportunity:
      'Successful candidates who demonstrate strong communication skills, learning ability, organizational skills, teamwork, and professionalism during the internship will have the opportunity to transition into a full-time HR Executive role.',
    responsibilities: [
      'Support day-to-day HR operations and employee coordination.',
      'Assist with recruitment activities including candidate sourcing and screening.',
      'Coordinate interview scheduling and candidate communication.',
      'Assist with employee onboarding and joining formalities.',
      'Maintain employee records, attendance, and leave details.',
      'Prepare and maintain HR documents and employee records.',
      'Coordinate HR communication with employees and internal teams.',
      'Assist in implementing HR policies, procedures, and processes.',
      'Support employee engagement activities and internal HR initiatives.',
      'Prepare basic HR reports and documentation.',
      'Assist with maintaining recruitment trackers and candidate databases.',
      'Support employee feedback and internal communication activities.',
      'Maintain confidentiality of employee and organizational information.',
    ],
    skills: [
      'Basic understanding of Human Resources concepts.',
      'Good verbal and written communication skills.',
      'Strong coordination and organizational skills.',
      'Basic knowledge of recruitment and HR processes.',
      'Proficiency in MS Office / Google Workspace.',
      'Good documentation and record-keeping skills.',
      'Attention to detail and time management.',
      'Ability to communicate professionally with candidates and employees.',
      'Professional attitude and willingness to learn.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Human Resources, Business Administration, Management, or a related field.",
      'Freshers are encouraged to apply.',
      'Candidates with HR projects, certifications, or internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Training Period',
    },
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Technical',
    experience: 'Freshers',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Code2,
    summary:
      'We are looking for enthusiastic, motivated, and self-driven Full Stack Developer Interns to join our technology team. This internship provides hands-on experience in frontend and backend development, database management, API development, debugging, testing, and deployment. Candidates will work on live software projects and gain practical exposure to modern web development technologies and development workflows.',
    opportunity:
      'Successful candidates who demonstrate strong technical skills, problem-solving ability, learning ability, teamwork, and consistent performance during the internship will have the opportunity to transition into a full-time Full Stack Developer role.',
    responsibilities: [
      'Develop responsive and user-friendly web applications.',
      'Build and maintain frontend interfaces using modern web technologies.',
      'Develop backend services, APIs, and application logic.',
      'Integrate frontend applications with backend APIs and databases.',
      'Design, create, and manage database structures.',
      'Write clean, maintainable, and reusable code.',
      'Debug and resolve application issues and technical problems.',
      'Perform testing and validation of application features.',
      'Collaborate with UI/UX designers and other developers to implement application requirements.',
      'Participate in code reviews and follow development best practices.',
      'Assist with application deployment and maintenance.',
      'Work with Git and version-control workflows.',
      'Learn and implement new technologies based on project requirements.',
      'Document technical implementations and development processes.',
    ],
    skills: [
      'Basic understanding of web development concepts.',
      'Knowledge of HTML, CSS, and JavaScript.',
      'Basic understanding of frontend and backend development.',
      'Familiarity with at least one programming language such as Python, JavaScript, Java, or similar.',
      'Basic understanding of databases and SQL.',
      'Familiarity with REST APIs and API integration.',
      'Basic knowledge of Git and GitHub.',
      'Understanding of responsive web design.',
      'Basic debugging and problem-solving skills.',
      'Willingness to learn new frameworks and technologies.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science, Information Technology, Software Engineering, or a related field.",
      'Freshers are encouraged to apply.',
      'Candidates with academic projects, personal projects, GitHub repositories, or relevant certifications are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Technical Training',
    },
  },
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    category: 'Business',
    experience: 'Fresher',
    vacancies: '3 Vacancies',
    vacancyCount: 3,
    icon: Briefcase,
    summary:
      'We are looking for enthusiastic, confident, and self-motivated Business Development Executive Interns to join our business development team. This internship provides hands-on experience in lead generation, market research, client communication, sales coordination, business analysis, and customer relationship management. Candidates will gain practical exposure to the business development process and will work with internal teams to understand client requirements, identify business opportunities, and support the growth of the organization.',
    opportunity:
      'Successful candidates who demonstrate strong communication skills, business understanding, learning ability, teamwork, and consistent performance during the internship will have the opportunity to transition into a full-time Business Development Executive role.',
    responsibilities: [
      'Identify and research potential clients and business opportunities.',
      'Generate and maintain leads through online and offline channels.',
      'Conduct market research and competitor analysis.',
      'Communicate with potential clients through calls, emails, LinkedIn, and other professional channels.',
      'Understand client requirements and coordinate with internal teams.',
      'Assist in preparing business proposals, presentations, and quotations.',
      'Schedule and coordinate client meetings and follow-ups.',
      'Maintain lead and customer information in CRM systems or internal trackers.',
      'Follow up with prospective clients and maintain professional relationships.',
      'Support the sales team in achieving business development targets.',
      'Track sales activities and prepare basic business development reports.',
      'Research industry trends and identify potential markets.',
      'Assist in developing strategies for client acquisition and business growth.',
      'Coordinate with marketing, technology, and management teams for business initiatives.',
    ],
    skills: [
      'Basic understanding of Business Development and Sales concepts.',
      'Excellent verbal and written communication skills.',
      'Strong interpersonal and relationship-building skills.',
      'Good presentation and negotiation skills.',
      'Basic understanding of lead generation and sales processes.',
      'Good research and analytical skills.',
      'Proficiency in MS Office / Google Workspace.',
      'Ability to communicate professionally with clients and prospects.',
      'Good follow-up and time-management skills.',
      'Professional attitude and willingness to learn.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Business Administration, Marketing, Management, Commerce, Computer Science, Information Technology, or a related field.",
      'Freshers are encouraged to apply.',
      'Candidates with sales, marketing, business development projects, certifications, or internship experience are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Training Period',
    },
  },
  {
    id: 'software-testing',
    title: 'Software Testing',
    category: 'Technical',
    experience: 'Freshers / 0-1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: CheckSquare,
    summary:
      'We are looking for detail-oriented and analytical Software Testing / QA Interns to join our engineering team. Candidates will gain hands-on experience in manual testing methodologies, test case design, defect tracking, automated testing frameworks, and API validation across modern web applications.',
    opportunity:
      'Successful candidates demonstrating rigorous testing acumen, automation proficiency, and problem-solving skills will have the opportunity to transition into a full-time QA / Test Automation Engineer role.',
    responsibilities: [
      'Design, review, and execute manual and automated test cases.',
      'Perform functional, regression, integration, and UI testing on web and mobile applications.',
      'Log, track, and verify defects using issue-tracking platforms.',
      'Conduct API testing using Postman and automated test suites.',
      'Work closely with developers to understand application requirements and isolate bugs.',
      'Participate in release readiness verification and documentation of test reports.',
    ],
    skills: [
      'Understanding of SDLC, STLC, and software testing lifecycles.',
      'Knowledge of manual testing concepts and test case authoring.',
      'Familiarity with test automation tools (Selenium, Cypress, or Playwright).',
      'Basic knowledge of API testing using Postman.',
      'Good analytical, debugging, and defect-reporting skills.',
      'Familiarity with Git and bug tracking workflows.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science, Information Technology, MCA, or related disciplines.",
      'Freshers and candidates with testing certifications (ISTQB, Selenium) are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Technical Training Period',
    },
  },
  {
    id: 'ai-ml-architect',
    title: 'AI/ML Architect',
    category: 'Technical',
    experience: 'Freshers / Junior',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Brain,
    summary:
      'We are looking for innovative and research-minded AI/ML candidates to architect machine learning pipelines, deep learning models, generative AI architectures, and intelligent agent workflows. You will work on real-world datasets, neural architectures, and enterprise AI integrations.',
    opportunity:
      'Successful candidates will have the opportunity to transition into a full-time AI/ML Architect or Applied AI Engineer role building intelligent autonomous software systems.',
    responsibilities: [
      'Design, develop, and benchmark machine learning and deep learning models.',
      'Architect RAG (Retrieval-Augmented Generation) pipelines and Agentic AI workflows.',
      'Preprocess, clean, and analyze complex unstructured and structured datasets.',
      'Integrate AI/ML models into scalable production web services via REST APIs.',
      'Evaluate model performance, latency, accuracy, and token optimization.',
      'Document model architectures, system designs, and experiment results.',
    ],
    skills: [
      'Strong proficiency in Python, NumPy, Pandas, and Scikit-Learn.',
      'Experience with deep learning frameworks (PyTorch or TensorFlow).',
      'Understanding of LLMs, Prompt Engineering, RAG architectures, and Vector Databases.',
      'Knowledge of model deployment, FastAPI/Flask, and containerization.',
      'Solid mathematical foundation in linear algebra, calculus, and probability.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science, AI, Data Science, Mathematics, or related field.",
      'Candidates with AI projects, Kaggle experience, or published work are highly preferred.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Advanced AI Training Period',
    },
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business',
    experience: 'Freshers / 0-1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: BarChart3,
    summary:
      'We are looking for structured, inquisitive Business Analyst candidates to bridge business requirements and engineering deliverables. You will collaborate with stakeholders, map out workflow diagrams, document system specifications, and analyze business intelligence metrics.',
    opportunity:
      'Successful candidates who show strong analytical acumen, clear communication, and stakeholder management will be offered full-time placement as an Associate Business Analyst.',
    responsibilities: [
      'Gather, analyze, and document business and functional software requirements.',
      'Create process flows, use cases, user stories, and wireframe prototypes.',
      'Collaborate with development and product teams to ensure requirement alignment.',
      'Perform data analysis, reporting, and dashboard creation for key metrics.',
      'Facilitate sprint planning, backlog grooming, and requirement walkthroughs.',
      'Assist in user acceptance testing (UAT) and validate deliverable quality.',
    ],
    skills: [
      'Basic understanding of Business Analysis methodologies, Agile, and Scrum.',
      'Strong analytical thinking, problem-solving, and requirements documentation skills.',
      'Proficiency in Excel, SQL, and business visualization tools (Power BI, Tableau).',
      'Excellent verbal and written communication and presentation skills.',
      'Familiarity with Jira, Confluence, and process flow modeling tools.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Business Administration, Computer Science, IT, Commerce, or related disciplines.",
      'Freshers with analytical projects or certifications are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Business Analysis Training Period',
    },
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Technical',
    experience: 'Freshers / 0-1 year',
    vacancies: '2 Vacancies',
    vacancyCount: 2,
    icon: Cloud,
    summary:
      'We are looking for motivated DevOps Engineer candidates to assist in cloud infrastructure automation, CI/CD pipeline development, containerization, and system reliability engineering. You will work with cloud platforms, Linux environments, and modern deployment tools.',
    opportunity:
      'Outstanding performers with solid automation skills and cloud systems knowledge will transition into a full-time Cloud & DevOps Engineer role.',
    responsibilities: [
      'Build and maintain automated continuous integration and continuous delivery (CI/CD) pipelines.',
      'Containerize applications using Docker and manage container lifecycles.',
      'Assist in provisioning cloud infrastructure on AWS and Linux server management.',
      'Monitor system performance, application uptime, and logging metrics.',
      'Implement security best practices and automated deployment scripts.',
      'Collaborate with developers to streamline deployment and environment configurations.',
    ],
    skills: [
      'Solid foundation in Linux administration and bash/shell scripting.',
      'Understanding of Docker containerization and Kubernetes concepts.',
      'Experience with CI/CD tools (GitHub Actions, GitLab CI, or Jenkins).',
      'Basic knowledge of AWS cloud services (EC2, S3, RDS, IAM).',
      'Familiarity with Git and version-control workflows.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science, IT, Computer Engineering, or related fields.",
      'Freshers with cloud/DevOps projects or AWS certifications are encouraged to apply.',
    ],
    internshipStructure: {
      duration: '6 Months',
      training: 'Month 1, 2: Cloud & DevOps Training Period',
    },
  },
];

const categoryTabs = [
  'All Roles',
  'Marketing',
  'Human Resources',
  'Technical',
  'Business',
] as const;

export function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categoryTabs[number]>('All Roles');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [expandedPositionId, setExpandedPositionId] = useState<string | null>(null);

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const heroY = useTransform(scrollY, [0, 600], [0, -30]);

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.3, duration: 7 },
    { size: 'w-16 h-16', pos: 'top-[18%] right-[8%]', delay: 1.1, duration: 8.5 },
    { size: 'w-10 h-10', pos: 'bottom-[20%] left-[10%]', delay: 1.6, duration: 6 },
    { size: 'w-14 h-14', pos: 'bottom-[16%] right-[18%]', delay: 0.8, duration: 7.5 },
  ];

  const handleApplyClick = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setIsApplyModalOpen(true);
  };

  const toggleExpandPosition = (id: string) => {
    setExpandedPositionId((prev) => (prev === id ? null : id));
  };

  const filteredPositions = careerPositions.filter((pos) => {
    if (selectedCategory === 'All Roles') return true;
    return pos.category === selectedCategory;
  });

  const positionDropdownOptions = careerPositions.map((pos) => ({
    value: pos.title,
    label: pos.title,
  }));

  // Total openings count
  const totalOpenings = careerPositions.reduce((acc, curr) => acc + curr.vacancyCount, 0);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* ==================================================
          1. HERO & CAREERS AT A GLANCE
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center bg-[#FBF7F4] pt-28 pb-16 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side (Col 7): Headline & Introduction */}
            <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
              <div className="section-eyebrow">
                <span>CAREERS</span>
                <div></div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text leading-[1.08] tracking-tight mb-5">
                Build your career <br />
                <span className="text-csl-blue">with CSL.</span>
              </h1>

              <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Creator Space Lab offers opportunities for people passionate about technology, continuous learning, professional development, and real-world work across our core multidisciplinary teams.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <span>Explore Open Roles</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <a
                  href="#apply-form"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-csl-gold/40 text-csl-text hover:text-csl-blue hover:border-csl-blue px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <span>General Application</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Side (Col 5): Careers at a Glance Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative bg-white/90 backdrop-blur-md border border-csl-gold/35 rounded-3xl p-6 sm:p-7 shadow-lg shadow-csl-blue/5 overflow-hidden">
                {/* Decorative subtle CSL tint */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-csl-blue/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-csl-gold/10 rounded-full blur-xl pointer-events-none -ml-8 -mb-8" />

                {/* Card Title */}
                <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-csl-gold/25">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-csl-blue/10 flex items-center justify-center text-csl-blue">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-csl-text tracking-tight">
                      Careers at a Glance
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Hiring Active
                  </span>
                </div>

                {/* Compact Info Rows */}
                <div className="relative z-10 flex flex-col divide-y divide-csl-gold/20 text-xs sm:text-sm">
                  {/* Row 1: Open Roles */}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-csl-muted font-semibold">Open Roles</span>
                    <span className="font-extrabold text-csl-text text-right">
                      {careerPositions.length} Positions ({totalOpenings} Openings)
                    </span>
                  </div>

                  {/* Row 2: Interns / Freshers */}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-csl-muted font-semibold">Interns / Freshers</span>
                    <span className="font-extrabold text-csl-blue text-right">
                      Eligible & Encouraged
                    </span>
                  </div>

                  {/* Row 3: Location */}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-csl-muted font-semibold">Location</span>
                    <span className="font-extrabold text-csl-text text-right flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-csl-blue inline" />
                      Chennai (OMR)
                    </span>
                  </div>

                  {/* Row 4: Domain */}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-csl-muted font-semibold">Domain</span>
                    <span className="font-extrabold text-csl-text text-right">
                      Tech • Digital • HR • Business
                    </span>
                  </div>

                  {/* Row 5: Work Format */}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-csl-muted font-semibold">Environment</span>
                    <span className="font-extrabold text-csl-text text-right">
                      Collaborative & Hands-on
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ==================================================
          FOREGROUND SLIDING CONTENT WRAPPER
         ================================================== */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">
        
        {/* ==================================================
            2. CURRENT OPENINGS SECTION (WITH DETAILED EXPANDABLE JDS)
           ================================================== */}
        <section id="openings" className="relative w-full py-16 md:py-24 section-container">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className="section-eyebrow">
                <span>CURRENT OPENINGS</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
                Open roles. Apply directly.
              </h2>
              <p className="text-csl-muted font-medium text-sm sm:text-base section-subheading max-w-xl">
                Explore our official openings below. Click any role or "View Details" to inspect the job description, key responsibilities, and required qualifications.
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

          {/* Clean Grouped Job-List / Table Presentation */}
          <div className="bg-white/90 backdrop-blur-sm border border-csl-gold/30 rounded-3xl shadow-sm overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-7 py-4 bg-[#FAF7F2] border-b border-csl-gold/25 text-xs font-bold text-csl-muted uppercase tracking-wider">
              <div className="col-span-5">Role & Department</div>
              <div className="col-span-3">Experience / Eligibility</div>
              <div className="col-span-2 text-center">Vacancies</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Rows List */}
            <div className="divide-y divide-csl-gold/20">
              {filteredPositions.map((pos) => {
                const Icon = pos.icon;
                const isExpanded = expandedPositionId === pos.id;

                return (
                  <div
                    key={pos.id}
                    className="p-5 sm:p-6 md:px-7 md:py-5 hover:bg-[#FAF8F5]/80 transition-colors duration-200"
                  >
                    {/* Desktop Column Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      {/* Col 5: Role & Icon & Department */}
                      <div className="col-span-5 flex items-center gap-3.5 pr-2">
                        <div className="w-11 h-11 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleExpandPosition(pos.id)}
                            className="font-extrabold text-base text-csl-text hover:text-csl-blue transition-colors text-left flex items-center gap-1.5 group/title cursor-pointer"
                          >
                            <span>{pos.title}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-csl-muted transition-transform duration-200 group-hover/title:text-csl-blue ${
                                isExpanded ? 'rotate-180 text-csl-blue' : ''
                              }`}
                            />
                          </button>
                          <span className="text-xs font-medium text-csl-muted">
                            {pos.category}
                          </span>
                        </div>
                      </div>

                      {/* Col 3: Experience */}
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#F4EFE6] text-csl-text border border-csl-gold/20">
                          {pos.experience}
                        </span>
                      </div>

                      {/* Col 2: Openings / Vacancies */}
                      <div className="col-span-2 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {pos.vacancies}
                        </span>
                      </div>

                      {/* Col 2: Actions (Details & Apply Now) */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleExpandPosition(pos.id)}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-csl-muted hover:text-csl-blue hover:bg-csl-blue/5 transition-all cursor-pointer"
                        >
                          {isExpanded ? 'Hide' : 'Details'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyClick(pos.title)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white shadow-xs hover:shadow-md hover:shadow-csl-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <span>Apply</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Stacked Layout */}
                    <div className="flex flex-col md:hidden gap-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base text-csl-text leading-tight">
                              {pos.title}
                            </h3>
                            <span className="text-xs font-medium text-csl-muted">
                              {pos.category}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          {pos.vacancies}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-[#FAF7F2] p-2.5 rounded-xl border border-csl-gold/20 text-xs">
                        <span className="text-csl-muted font-bold uppercase tracking-wider text-[10px]">
                          Experience / Eligibility
                        </span>
                        <span className="font-extrabold text-csl-text">
                          {pos.experience}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpandPosition(pos.id)}
                          className="py-2.5 px-3 rounded-xl font-bold text-xs bg-white border border-csl-gold/35 text-csl-text hover:text-csl-blue flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyClick(pos.title)}
                          className="py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.99] transition-all"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Accordion: Full Official JD Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-csl-gold/25 bg-[#FCFAF6] rounded-2xl p-5 sm:p-7 flex flex-col gap-6">
                            {/* Job Summary */}
                            <div>
                              <span className="text-xs font-bold text-csl-blue uppercase tracking-wider block mb-1.5">
                                Job Summary
                              </span>
                              <p className="text-xs sm:text-sm text-csl-text font-medium leading-relaxed">
                                {pos.summary}
                              </p>
                            </div>

                            {/* Full-time Opportunity Callout if present */}
                            {pos.opportunity && (
                              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-xs sm:text-sm font-semibold text-emerald-900 leading-snug">
                                  <span className="font-extrabold">Full-Time Opportunity: </span>
                                  {pos.opportunity}
                                </div>
                              </div>
                            )}

                            {/* Key Responsibilities */}
                            <div>
                              <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-2.5">
                                Key Responsibilities
                              </span>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-csl-muted font-medium">
                                {pos.responsibilities.map((resp, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-csl-blue mt-1.5 shrink-0" />
                                    <span className="leading-relaxed text-csl-text/90">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Required Skills */}
                            <div>
                              <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-2.5">
                                Required Skills
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {pos.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-csl-gold/30 text-xs font-bold text-csl-text shadow-2xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Qualifications & Structure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-csl-gold/20">
                              {/* Qualifications */}
                              <div>
                                <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-1.5">
                                  Qualifications
                                </span>
                                <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-csl-muted font-medium">
                                  {pos.qualifications.map((qual, qIdx) => (
                                    <li key={qIdx} className="flex items-start gap-2">
                                      <GraduationCap className="w-4 h-4 text-csl-blue shrink-0 mt-0.5" />
                                      <span className="leading-snug text-csl-text/90">{qual}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Internship Structure */}
                              {pos.internshipStructure && (
                                <div>
                                  <span className="text-xs font-bold text-csl-text uppercase tracking-wider block mb-1.5">
                                    Internship Structure
                                  </span>
                                  <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-csl-muted font-medium">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-csl-gold shrink-0" />
                                      <span className="text-csl-text/90">
                                        <strong className="text-csl-text">Duration:</strong> {pos.internshipStructure.duration}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-csl-blue shrink-0" />
                                      <span className="text-csl-text/90">
                                        <strong className="text-csl-text">Training:</strong> {pos.internshipStructure.training}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Bottom Apply Bar in expanded view */}
                            <div className="flex items-center justify-between pt-3 border-t border-csl-gold/20 flex-wrap gap-3">
                              <span className="text-xs font-semibold text-csl-muted">
                                Ready to join? Submit your details directly to our recruitment team.
                              </span>
                              <button
                                type="button"
                                onClick={() => handleApplyClick(pos.title)}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                              >
                                <span>Apply for {pos.title}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            3. CONCISE CSL CAREER ADVANTAGE HIGHLIGHTS
           ================================================== */}
        <section className="relative w-full py-12 md:py-16 border-t border-csl-gold/20 bg-[#FAF7F2]/60">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Continuous Learning
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Access to structured mentorship, training materials, and workshops across modern digital skills.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Collaborative Culture
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Work directly with cross-functional teams in technology, marketing, human resources, and business growth.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-csl-blue/10 flex items-center justify-center text-csl-blue shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-csl-text text-base mb-1">
                    Direct Impact
                  </h4>
                  <p className="text-xs text-csl-muted leading-relaxed">
                    Engage with genuine client deliverables and educational initiatives from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            4. RESTORED ORIGINAL FULL-PAGE APPLICATION FORM
           ================================================== */}
        <section 
          id="apply-form" 
          className="relative w-full py-16 md:py-24 border-t border-csl-gold/20 bg-gradient-to-b from-transparent via-[#F7F4EE]/60 to-[#F2EDE3]/50"
        >
          <div className="section-container">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <div className="section-eyebrow justify-center">
                <span>DIRECT APPLICATION</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Submit Your Application
              </h2>
              <p className="text-csl-muted font-medium text-sm sm:text-base section-subheading">
                Prefer to apply right here? Fill out the form below to forward your profile directly to our recruitment team.
              </p>
            </div>

            {/* Layout: Main Form Box + Contact Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
              {/* Application Form Box */}
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-csl-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm w-full">
                <CareerApplicationForm
                  initialPosition={selectedPosition}
                  positions={positionDropdownOptions}
                  context="full-page"
                />
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
                      <a
                        href="https://wa.me/919500802806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-csl-blue transition-colors"
                      >
                        +91 96801 00306
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Career Application Modal (Triggered by Apply Now buttons) */}
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
