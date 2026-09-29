import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  X, 
  MessageCircle, 
  BookOpen, 
  ChevronRight,
  ArrowLeft,
  Layers,
  Cpu,
  BarChart3,
  Database,
  ShieldCheck,
  Cloud,
  Smartphone,
  Briefcase,
  Workflow,
  Palette,
  Flame
} from 'lucide-react';
import { 
  WORKSHOP_DOMAINS,
  ALL_WORKSHOPS, 
  WorkshopItem, 
  WorkshopLevel 
} from './workshopsData';
import { CustomDropdown, DropdownOption } from '../../ui/CustomDropdown';

interface WorkshopExplorerProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
  onNavigateToContact: () => void;
}

const DOMAIN_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All 11 Domains' },
  { value: 'ai-ml', label: '01. AI/ML with Automation' },
  { value: 'full-stack', label: '02. Full Stack Development with AI & Automation' },
  { value: 'data-analyst', label: '03. Data Analyst with AI & Automation' },
  { value: 'data-science', label: '04. Data Science & Machine Learning' },
  { value: 'cyber-security', label: '05. Cybersecurity & Ethical Hacking' },
  { value: 'cloud-devops', label: '06. DevOps with AWS' },
  { value: 'mobile-dev', label: '07. Full Stack + Mobile Development' },
  { value: 'software-testing', label: '08. Software Testing with Automation' },
  { value: 'business-analyst', label: '09. Business Analyst' },
  { value: 'crm-cloud', label: '10. ServiceNow, Salesforce & CRM' },
  { value: 'ui-ux', label: '11. UI/UX Design' },
];

const LEVEL_OPTIONS: DropdownOption[] = [
  { value: 'All', label: 'All Levels (Basic, Int, Adv)' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const DOMAIN_ICONS: Record<string, any> = {
  'ai-ml': Cpu,
  'full-stack': Layers,
  'data-analyst': BarChart3,
  'data-science': Database,
  'cyber-security': ShieldCheck,
  'cloud-devops': Cloud,
  'mobile-dev': Smartphone,
  'software-testing': CheckCircle2,
  'business-analyst': Briefcase,
  'crm-cloud': Workflow,
  'ui-ux': Palette,
};

export function WorkshopExplorer({
  selectedDomainId,
  onSelectDomain,
  onNavigateToContact,
}: WorkshopExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<WorkshopLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalWorkshop, setActiveModalWorkshop] = useState<WorkshopItem | null>(null);

  // Active domain object if a specific domain is chosen
  const activeDomain = useMemo(() => {
    return WORKSHOP_DOMAINS.find((d) => d.id === selectedDomainId) || null;
  }, [selectedDomainId]);

  // Filter workshops based on Domain, Level, and Search Query
  const filteredWorkshops = useMemo(() => {
    return ALL_WORKSHOPS.filter((item) => {
      // Domain filter
      if (selectedDomainId !== 'all' && item.domainId !== selectedDomainId) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'All' && item.level !== selectedLevel) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDomain = item.domainTitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTopics = item.keyTopics.some((t) => t.toLowerCase().includes(query));
        const matchesProject = item.projectOutcome.toLowerCase().includes(query);
        return matchesTitle || matchesDomain || matchesDesc || matchesTopics || matchesProject;
      }

      return true;
    });
  }, [selectedDomainId, selectedLevel, searchQuery]);

  // Group workshops of the active domain by level
  const groupedActiveWorkshops = useMemo(() => {
    if (!activeDomain) return null;
    const domainItems = ALL_WORKSHOPS.filter((item) => item.domainId === activeDomain.id);
    return {
      Basic: domainItems.filter((i) => i.level === 'Basic'),
      Intermediate: domainItems.filter((i) => i.level === 'Intermediate'),
      Advanced: domainItems.filter((i) => i.level === 'Advanced'),
    };
  }, [activeDomain]);

  // WhatsApp quick enquiry link generator
  const getWhatsAppLink = (workshop: WorkshopItem) => {
    const text = `Hi Creator Space Lab! I would like to enquire about the "${workshop.title}" workshop (${workshop.domainTitle} - ${workshop.level} Level). Could you share the schedule, curriculum details, and college booking options?`;
    return `https://wa.me/919940166299?text=${encodeURIComponent(text)}`;
  };

  const getLevelBadgeClass = (level: WorkshopLevel) => {
    switch (level) {
      case 'Basic':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/25';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/25';
    }
  };

  return (
    <section id="workshop-explorer" className="relative w-full py-12 md:py-16 bg-[#FAF7F3] border-y border-csl-gold/25">
      <div className="section-container">
        
        {/* ==================================================
            1. SECTION HEADER
           ================================================== */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>CURRICULUM DIRECTORY</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
            Explore <span className="text-csl-blue">Workshops</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
            Browse our 11 industry specialization domains. Select any domain to inspect its 6 hands-on workshops structured from Basic to Advanced.
          </p>
        </div>

        {/* ==================================================
            2. PROGRESSION MINI-BANNER (Compressed Pipeline)
           ================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:px-6 bg-white/90 border border-csl-gold/30 rounded-2xl mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-csl-text">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 border border-emerald-500/25">
              BASIC
            </span>
            <span className="text-csl-gold font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-500/25">
              INTERMEDIATE
            </span>
            <span className="text-csl-gold font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 border border-purple-500/25">
              ADVANCED
            </span>
          </div>
          <span className="text-xs text-csl-muted font-semibold text-center sm:text-right">
            Progress from core fundamentals to production AI/cloud capstones.
          </span>
        </div>

        {/* ==================================================
            3. CUSTOM DROPDOWN FILTERS & SEARCH
           ================================================== */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-csl-gold/30 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Domain Dropdown */}
            <div className="md:col-span-5 flex flex-col">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-csl-blue" />
                <span>Filter By Domain</span>
              </label>
              <CustomDropdown
                value={selectedDomainId}
                onChange={(val) => onSelectDomain(val)}
                options={DOMAIN_OPTIONS}
                placeholder="All 11 Domains"
                icon={Layers}
              />
            </div>

            {/* Level Dropdown */}
            <div className="md:col-span-3 flex flex-col">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-csl-gold" />
                <span>Level</span>
              </label>
              <CustomDropdown
                value={selectedLevel}
                onChange={(val) => setSelectedLevel(val as WorkshopLevel | 'All')}
                options={LEVEL_OPTIONS}
                placeholder="All Levels"
              />
            </div>

            {/* Search Input */}
            <div className="md:col-span-4 flex flex-col">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-csl-blue" />
                <span>Search Topics</span>
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-csl-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Python, RAG, Selenium..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-3.5 rounded-xl bg-white/90 border border-csl-gold/30 text-xs md:text-sm text-csl-text focus:outline-none focus:ring-1 focus:ring-csl-blue focus:border-csl-blue shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-csl-muted hover:text-csl-text p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Quick Domain Switcher Ribbon (when in a domain) */}
        {selectedDomainId !== 'all' && searchQuery.trim() === '' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            <button
              onClick={() => onSelectDomain('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-csl-gold/30 bg-white text-csl-text hover:text-csl-blue hover:border-csl-gold shrink-0 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>All 11 Domains</span>
            </button>
            {WORKSHOP_DOMAINS.map((dom) => (
              <button
                key={dom.id}
                onClick={() => onSelectDomain(dom.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedDomainId === dom.id
                    ? 'bg-csl-blue text-white shadow-xs'
                    : 'bg-white/80 text-csl-muted hover:text-csl-text border border-csl-gold/20'
                }`}
              >
                0{dom.domainNumber}. {dom.shortTitle}
              </button>
            ))}
          </div>
        )}

        {/* ==================================================
            4. MAIN PRESENTATION: SEARCH RESULTS / ACTIVE DOMAIN / 11 DOMAIN DIRECTORY
           ================================================== */}

        {/* CASE A: USER SEARCHED KEYWORD */}
        {searchQuery.trim() !== '' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-csl-muted">
                Found {filteredWorkshops.length} workshops matching "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-csl-blue font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {filteredWorkshops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWorkshops.map((workshop) => (
                  <WorkshopCard 
                    key={workshop.id} 
                    workshop={workshop} 
                    onViewDetails={() => setActiveModalWorkshop(workshop)}
                    getWhatsAppLink={getWhatsAppLink}
                    getLevelBadgeClass={getLevelBadgeClass}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/70 rounded-2xl border border-csl-gold/20 p-8">
                <p className="text-sm font-semibold text-csl-text mb-2">No workshops match "{searchQuery}".</p>
                <p className="text-xs text-csl-muted mb-4">Try searching for generic terms like "Python", "SQL", "AI", or "Testing".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-csl-blue text-white text-xs font-bold hover:bg-csl-deep-blue cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : selectedDomainId !== 'all' && activeDomain && groupedActiveWorkshops ? (
          /* CASE B: ACTIVE DOMAIN EXPANDED (6 Workshops grouped by Basic, Intermediate, Advanced) */
          <div>
            {/* Active Domain Header Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-csl-gold/30 shadow-md mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-csl-blue/[0.08] border border-csl-blue/20 flex items-center justify-center text-csl-blue shrink-0">
                    {(() => {
                      const IconComp = DOMAIN_ICONS[activeDomain.id] || Cpu;
                      return <IconComp className="w-6 h-6 stroke-[1.8]" />;
                    })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-extrabold text-csl-gold">
                        DOMAIN 0{activeDomain.domainNumber}
                      </span>
                      {activeDomain.trending && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30">
                          <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                          TRENDING
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-csl-text leading-tight">
                      {activeDomain.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => onSelectDomain('all')}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-csl-gold/30 hover:border-csl-gold bg-csl-bg text-csl-text text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>View All 11 Domains</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-csl-muted font-medium mt-3 pt-3 border-t border-csl-gold/15 leading-relaxed">
                {activeDomain.description}
              </p>
            </div>

            {/* 6 Workshops Grouped by Level Tier Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* BASIC TIER */}
              {(selectedLevel === 'All' || selectedLevel === 'Basic') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      BASIC TIER (2 WORKSHOPS)
                    </span>
                    <span className="text-[11px] font-semibold text-csl-muted">Fundamentals</span>
                  </div>
                  {groupedActiveWorkshops.Basic.map((workshop) => (
                    <WorkshopCard 
                      key={workshop.id} 
                      workshop={workshop} 
                      onViewDetails={() => setActiveModalWorkshop(workshop)}
                      getWhatsAppLink={getWhatsAppLink}
                      getLevelBadgeClass={getLevelBadgeClass}
                    />
                  ))}
                </div>
              )}

              {/* INTERMEDIATE TIER */}
              {(selectedLevel === 'All' || selectedLevel === 'Intermediate') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-500/30">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-blue-700">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      INTERMEDIATE TIER (2 WORKSHOPS)
                    </span>
                    <span className="text-[11px] font-semibold text-csl-muted">Applied Workflows</span>
                  </div>
                  {groupedActiveWorkshops.Intermediate.map((workshop) => (
                    <WorkshopCard 
                      key={workshop.id} 
                      workshop={workshop} 
                      onViewDetails={() => setActiveModalWorkshop(workshop)}
                      getWhatsAppLink={getWhatsAppLink}
                      getLevelBadgeClass={getLevelBadgeClass}
                    />
                  ))}
                </div>
              )}

              {/* ADVANCED TIER */}
              {(selectedLevel === 'All' || selectedLevel === 'Advanced') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/30">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-purple-700">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      ADVANCED TIER (2 WORKSHOPS)
                    </span>
                    <span className="text-[11px] font-semibold text-csl-muted">Production & AI</span>
                  </div>
                  {groupedActiveWorkshops.Advanced.map((workshop) => (
                    <WorkshopCard 
                      key={workshop.id} 
                      workshop={workshop} 
                      onViewDetails={() => setActiveModalWorkshop(workshop)}
                      getWhatsAppLink={getWhatsAppLink}
                      getLevelBadgeClass={getLevelBadgeClass}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        ) : (
          /* CASE C: 11 DOMAIN DIRECTORY CARDS (Compact overview, no 66-card vertical scroll) */
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs font-mono font-extrabold uppercase text-csl-gold tracking-wider">
                11 SPECIALIZATION DOMAINS
              </span>
              <span className="text-xs font-medium text-csl-muted">
                Click any domain to inspect workshops
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {WORKSHOP_DOMAINS.map((domain) => {
                const IconComponent = DOMAIN_ICONS[domain.id] || Cpu;
                return (
                  <div
                    key={domain.id}
                    onClick={() => onSelectDomain(domain.id)}
                    className="group relative flex flex-col justify-between p-5 bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-2xl hover:border-csl-gold/60 hover:bg-white hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-csl-blue/[0.07] border border-csl-blue/15 flex items-center justify-center text-csl-blue group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                            <IconComponent className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono font-bold text-csl-muted block">
                              DOMAIN 0{domain.domainNumber}
                            </span>
                          </div>
                        </div>

                        {domain.trending && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 shrink-0">
                            <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                            TRENDING
                          </span>
                        )}
                      </div>

                      {/* Domain Title */}
                      <h3 className="text-sm sm:text-base font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-snug mb-2">
                        {domain.title}
                      </h3>

                      <p className="text-xs text-csl-muted line-clamp-2 leading-relaxed font-medium mb-3">
                        {domain.description}
                      </p>
                    </div>

                    {/* Bottom stats and action */}
                    <div className="pt-3 border-t border-csl-gold/15 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                        <span className="text-emerald-700">2 Basic</span>
                        <span className="text-csl-muted">•</span>
                        <span className="text-blue-700">2 Int</span>
                        <span className="text-csl-muted">•</span>
                        <span className="text-purple-700">2 Adv</span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-csl-blue group-hover:translate-x-0.5 transition-transform">
                        <span>View Workshops</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================
            5. WORKSHOP DETAIL MODAL
           ================================================== */}
        <AnimatePresence>
          {activeModalWorkshop && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-csl-gold/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalWorkshop(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-csl-bg text-csl-muted hover:text-csl-text transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Level & Domain */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getLevelBadgeClass(activeModalWorkshop.level)}`}>
                    {activeModalWorkshop.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-csl-gold">
                    {activeModalWorkshop.domainTitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text mb-3 leading-snug">
                  {activeModalWorkshop.title}
                </h3>

                <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mb-5">
                  {activeModalWorkshop.description}
                </p>

                {/* Key Topics List */}
                <div className="mb-5">
                  <h4 className="text-xs font-mono font-bold text-csl-gold uppercase mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-csl-blue" />
                    <span>Curriculum & Topics Covered</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-csl-text font-medium">
                    {activeModalWorkshop.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hands-On Project Outcome */}
                <div className="bg-gradient-to-r from-csl-gold/10 via-csl-gold/5 to-csl-blue/10 border border-csl-gold/30 rounded-xl p-3.5 mb-6">
                  <span className="text-[10px] font-mono font-bold text-csl-gold uppercase block mb-1">
                    HANDS-ON PROJECT DELIVERABLE
                  </span>
                  <p className="text-xs font-bold text-csl-text leading-snug">
                    {activeModalWorkshop.projectOutcome}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-csl-gold/20">
                  <a
                    href={getWhatsAppLink(activeModalWorkshop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveModalWorkshop(null);
                      onNavigateToContact();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border border-csl-gold/40 hover:border-csl-gold bg-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-csl-text hover:text-csl-blue transition-colors cursor-pointer"
                  >
                    <span>Contact Us Form</span>
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// Compact Workshop Card subcomponent
interface WorkshopCardProps {
  workshop: WorkshopItem;
  onViewDetails: () => void;
  getWhatsAppLink: (w: WorkshopItem) => string;
  getLevelBadgeClass: (l: WorkshopLevel) => string;
}

function WorkshopCard({
  workshop,
  onViewDetails,
  getWhatsAppLink,
  getLevelBadgeClass,
}: WorkshopCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-csl-gold/25 hover:border-csl-gold/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(workshop.level)}`}>
            {workshop.level}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-csl-muted font-mono font-medium">
            <Clock className="w-3 h-3 text-csl-gold" />
            <span>{workshop.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm sm:text-[15px] font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-2 leading-snug">
          {workshop.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-csl-muted leading-relaxed mb-3 line-clamp-2 font-medium">
          {workshop.description}
        </p>

        {/* Project Outcome highlight */}
        <div className="p-2.5 rounded-xl bg-csl-bg border border-csl-gold/20 mb-4">
          <span className="text-[10px] font-mono font-bold text-csl-gold uppercase block mb-0.5">
            PROJECT DELIVERABLE:
          </span>
          <p className="text-[11px] font-semibold text-csl-text line-clamp-1">
            {workshop.projectOutcome}
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-csl-gold/15 flex items-center justify-between gap-2">
        <button
          onClick={onViewDetails}
          className="text-xs font-bold text-csl-blue hover:text-csl-deep-blue flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Curriculum Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={getWhatsAppLink(workshop)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-csl-blue text-white text-xs font-bold shadow-xs hover:bg-csl-deep-blue hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
}
