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
  Users, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { 
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
  { value: 'all', label: 'All Domains' },
  { value: 'ai-ml', label: 'AI/ML with Automation' },
  { value: 'full-stack', label: 'Full Stack Development with AI & Automation' },
  { value: 'data-analyst', label: 'Data Analyst with AI & Automation' },
  { value: 'data-science', label: 'Data Science & Machine Learning' },
  { value: 'cyber-security', label: 'Cybersecurity & Ethical Hacking' },
  { value: 'cloud-devops', label: 'DevOps with AWS' },
  { value: 'mobile-dev', label: 'Full Stack + Mobile Development' },
  { value: 'software-testing', label: 'Software Testing with Automation' },
  { value: 'business-analyst', label: 'Business Analyst' },
  { value: 'crm-cloud', label: 'ServiceNow, Salesforce & CRM' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'game-dev', label: 'Game Development' },
  { value: 'blockchain', label: 'Blockchain & Web3' },
  { value: 'iot-embedded', label: 'Internet of Things (IoT) & Embedded Systems' },
];

const LEVEL_OPTIONS: DropdownOption[] = [
  { value: 'All', label: 'All Levels' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

export function WorkshopExplorer({
  selectedDomainId,
  onSelectDomain,
  onNavigateToContact,
}: WorkshopExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<WorkshopLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalWorkshop, setActiveModalWorkshop] = useState<WorkshopItem | null>(null);

  // Filter workshops based on Domain, Level, and Search Query
  const filteredWorkshops = useMemo(() => {
    return ALL_WORKSHOPS.filter((item) => {
      // Domain filter
      if (selectedDomainId !== 'all') {
        if (selectedDomainId === 'ai-ml' && item.domainId !== 'ai-ml') {
          return false;
        } else if (selectedDomainId === 'full-stack' && item.domainId !== 'full-stack') {
          return false;
        } else if (selectedDomainId === 'data-analyst') {
          const isAnalyst = item.domainId === 'data-science' && (
            item.title.toLowerCase().includes('data') ||
            item.title.toLowerCase().includes('pandas') ||
            item.title.toLowerCase().includes('visualization') ||
            item.title.toLowerCase().includes('tableau')
          );
          if (!isAnalyst) return false;
        } else if (selectedDomainId === 'data-science' && item.domainId !== 'data-science') {
          return false;
        } else if (selectedDomainId === 'cyber-security' && item.domainId !== 'cyber-security') {
          return false;
        } else if (selectedDomainId === 'cloud-devops' && item.domainId !== 'cloud-devops') {
          return false;
        } else if (selectedDomainId === 'mobile-dev' && item.domainId !== 'mobile-dev') {
          return false;
        } else if (selectedDomainId === 'software-testing' && item.domainId !== 'software-testing') {
          return false;
        } else if (selectedDomainId === 'business-analyst') {
          const isBusiness = item.domainId === 'data-science' || item.keyTopics.some(t => t.toLowerCase().includes('analysis') || t.toLowerCase().includes('statistics'));
          if (!isBusiness) return false;
        } else if (selectedDomainId === 'crm-cloud') {
          const isCRM = item.domainId === 'cloud-devops' || item.title.toLowerCase().includes('cloud');
          if (!isCRM) return false;
        } else if (selectedDomainId === 'ui-ux' && item.domainId !== 'ui-ux') {
          return false;
        } else if (selectedDomainId === 'game-dev' && item.domainId !== 'game-dev') {
          return false;
        } else if (selectedDomainId === 'blockchain' && item.domainId !== 'blockchain') {
          return false;
        } else if (selectedDomainId === 'iot-embedded' && item.domainId !== 'iot-embedded') {
          return false;
        }
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

  const activeDomainLabel = DOMAIN_OPTIONS.find((d) => d.value === selectedDomainId)?.label || 'All Domains';

  return (
    <section id="workshop-explorer" className="relative w-full py-16 md:py-24 bg-[#FAF7F3] border-y border-csl-gold/25">
      <div className="section-container">
        
        {/* ==================================================
            SECTION HEADER
           ================================================== */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>INTERACTIVE CATALOG</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
            Workshop <span className="text-csl-blue">Explorer</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
            Filter by domain, level, or search keyword to find the exact workshop module for your student body, department, or team.
          </p>
        </div>

        {/* ==================================================
            CUSTOM DROPDOWN FILTERS & SEARCH BAR
           ================================================== */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-csl-gold/30 shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* 1. Domain Dropdown */}
            <div className="md:col-span-5 flex flex-col">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-csl-blue" />
                <span>Domain</span>
              </label>
              <CustomDropdown
                value={selectedDomainId}
                onChange={(val) => onSelectDomain(val)}
                options={DOMAIN_OPTIONS}
                placeholder="All Domains"
                icon={Layers}
              />
            </div>

            {/* 2. Level Dropdown */}
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

            {/* 3. Search Input */}
            <div className="md:col-span-4 flex flex-col">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-csl-blue" />
                <span>Search Keywords</span>
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-csl-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search topics, tools..."
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

        {/* Results count indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-semibold text-csl-muted font-mono">
            Showing <span className="font-bold text-csl-text">{filteredWorkshops.length}</span> workshops
            {selectedDomainId !== 'all' && ` in ${activeDomainLabel}`}
            {selectedLevel !== 'All' && ` (${selectedLevel} level)`}
          </p>
          {(selectedDomainId !== 'all' || selectedLevel !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                onSelectDomain('all');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="text-xs text-csl-blue font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ==================================================
            WORKSHOP CARD GRID (Responsive 1-col / 2-col / 3-col)
           ================================================== */}
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop, idx) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                className="group bg-white rounded-2xl p-6 border border-csl-gold/30 hover:border-csl-gold/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top meta tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-csl-gold truncate">
                      {workshop.domainTitle}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(workshop.level)}`}>
                      {workshop.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-2 leading-snug">
                    {workshop.title}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-csl-muted font-medium mb-3">
                    <Clock className="w-3.5 h-3.5 text-csl-gold" />
                    <span>{workshop.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-csl-muted leading-relaxed mb-4 line-clamp-3">
                    {workshop.description}
                  </p>

                  {/* Key Topics preview */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono font-bold text-csl-muted uppercase block mb-1.5">
                      Key Topics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {workshop.keyTopics.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-csl-bg border border-csl-gold/20 text-csl-text truncate max-w-[200px]"
                        >
                          {topic}
                        </span>
                      ))}
                      {workshop.keyTopics.length > 3 && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-csl-gold/10 text-csl-gold">
                          +{workshop.keyTopics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hands-On Project Callout */}
                  <div className="bg-gradient-to-r from-csl-gold/10 via-csl-gold/5 to-csl-blue/10 border border-csl-gold/30 rounded-xl p-3 mb-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-csl-gold mb-1">
                      <Sparkles className="w-3 h-3 text-csl-gold" />
                      <span>HANDS-ON PROJECT OUTCOME:</span>
                    </div>
                    <p className="text-xs font-semibold text-csl-text leading-snug">
                      {workshop.projectOutcome}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-csl-gold/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalWorkshop(workshop)}
                    className="text-xs font-bold text-csl-blue hover:text-csl-deep-blue flex items-center gap-1 py-1 cursor-pointer transition-colors"
                  >
                    <span>Full Details</span>
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
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-csl-gold/20 p-8">
            <p className="text-sm font-semibold text-csl-text mb-2">No workshops match your current search.</p>
            <p className="text-xs text-csl-muted mb-4">Try clearing the search query or selecting "All Levels".</p>
            <button
              onClick={() => {
                onSelectDomain('all');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-csl-blue text-white text-xs font-bold hover:bg-csl-deep-blue transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* ==================================================
          WORKSHOP DETAIL MODAL
         ================================================== */}
      <AnimatePresence>
        {activeModalWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-csl-gold/50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-[#FBF7F4] via-white to-csl-blue/5 border-b border-csl-gold/20 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-csl-gold">
                      {activeModalWorkshop.domainTitle}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(activeModalWorkshop.level)}`}>
                      {activeModalWorkshop.level} Level
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text leading-tight">
                    {activeModalWorkshop.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-csl-muted font-medium mt-1">
                    <Clock className="w-3.5 h-3.5 text-csl-gold" />
                    <span>Duration: {activeModalWorkshop.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalWorkshop(null)}
                  className="p-2 rounded-full hover:bg-csl-bg text-csl-muted hover:text-csl-text transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-csl-text text-sm">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-csl-gold uppercase mb-1.5">
                    WORKSHOP OVERVIEW
                  </h4>
                  <p className="text-csl-muted font-medium leading-relaxed">
                    {activeModalWorkshop.description}
                  </p>
                </div>

                {/* Key Topics Covered */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-csl-gold uppercase mb-2">
                    KEY CURRICULUM TOPICS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalWorkshop.keyTopics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 bg-csl-bg/60 p-2.5 rounded-xl border border-csl-gold/20">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-csl-text leading-snug">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hands-On Project */}
                <div className="bg-gradient-to-r from-csl-gold/15 via-csl-gold/10 to-csl-blue/15 border border-csl-gold/40 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-csl-gold mb-1.5">
                    <Sparkles className="w-4 h-4 text-csl-gold" />
                    <span>PROJECT OUTCOME DELIVERABLE:</span>
                  </div>
                  <p className="text-sm font-bold text-csl-text leading-snug">
                    {activeModalWorkshop.projectOutcome}
                  </p>
                </div>

                {/* Prerequisites & Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-csl-bg rounded-xl border border-csl-gold/20">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-csl-text mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-csl-blue" />
                      <span>PREREQUISITES</span>
                    </div>
                    <p className="text-xs text-csl-muted leading-relaxed">
                      {activeModalWorkshop.prerequisites}
                    </p>
                  </div>

                  <div className="p-3.5 bg-csl-bg rounded-xl border border-csl-gold/20">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-csl-text mb-1">
                      <Users className="w-3.5 h-3.5 text-csl-blue" />
                      <span>TARGET AUDIENCE</span>
                    </div>
                    <p className="text-xs text-csl-muted leading-relaxed">
                      {activeModalWorkshop.targetAudience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-csl-bg/80 border-t border-csl-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-csl-muted font-medium text-center sm:text-left">
                  Available for campus symposiums, value-added modules & student groups.
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveModalWorkshop(null);
                      onNavigateToContact();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-csl-gold/40 text-csl-text hover:bg-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Contact Team
                  </button>

                  <a
                    href={getWhatsAppLink(activeModalWorkshop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
