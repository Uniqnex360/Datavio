import {
  Globe,
  Database,
  ShieldCheck,
  Layers,
  Package,
  Store,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Zap,
  Tag,
  RefreshCw,
  Search,
  Sparkles,
  Filter,
} from 'lucide-react';
import { SiteFooter, PageHeader, navigate as appNavigate } from './App';

const SOLUTIONS = [
  {
    id: 'ecommerce',
    segment: 'Ecommerce Retailers',
    icon: Globe,
    headline: 'Turn your catalog into your highest-converting channel.',
    subheadline: 'Convert browsers into buyers.',
    description: 'Every missing attribute, vague description, or inconsistent title is a lost sale. DatavioAI scores every product page, automatically enriches the gaps, and generates channel-optimized content that drives discovery and conversion — at any catalog size.',
    accent: { bg: 'bg-[#00AEEF]/10', icon: 'text-[#00AEEF]', border: 'border-[#00AEEF]/20', pill: 'bg-[#00AEEF]/10 text-[#00AEEF]', bar: '#00AEEF' },
    stats: [
      { value: '3×', label: 'Higher conversion on enriched PDPs' },
      { value: '40%', label: 'Reduction in product returns' },
      { value: '75%', label: 'Organic traffic increase within 30 days' },
    ],
    capabilities: [
      { icon: Tag, label: 'Catalog Scoring', desc: 'Know which PDPs are costing you rankings and conversions before customers do.' },
      { icon: Sparkles, label: 'Unique Product Content', desc: 'AI-generated titles, bullets, and descriptions optimized for search and conversion.' },
      { icon: Search, label: 'AI Search Optimization', desc: 'Semantic enrichment that puts your products in front of buyers actively searching for them.' },
      { icon: RefreshCw, label: 'Continuous Governance', desc: 'Automated quality monitoring so enrichment gains compound rather than regress.' },
    ],
    benefits: [
      'Richer product content across every category and SKU',
      'Search rankings that improve and hold over time',
      'Fewer returns through accurate, complete product information',
      'Faster launch of new SKUs with AI-assisted content creation',
    ],
  },
  {
    id: 'b2b',
    segment: 'B2B Distributors',
    icon: Database,
    headline: 'One clean catalog. Powering every system you run.',
    subheadline: 'Turn supplier chaos into catalog confidence.',
    description: 'B2B distributors manage hundreds of supplier feeds — each with different naming conventions, taxonomy structures, and attribute formats. DatavioAI merges, cleanses, normalizes, and governs that chaos into a single master catalog your sales team, ERP, and digital channels can all rely on.',
    accent: { bg: 'bg-[#0891B2]/10', icon: 'text-[#0891B2]', border: 'border-[#0891B2]/20', pill: 'bg-[#0891B2]/10 text-[#0891B2]', bar: '#0891B2' },
    stats: [
      { value: '60%', label: 'Faster supplier onboarding' },
      { value: '1M+', label: 'SKUs normalized and governed' },
      { value: '~0%', label: 'Duplicate SKU rate post-implementation' },
    ],
    capabilities: [
      { icon: Database, label: 'Catalog Builder', desc: 'Ingest feeds from any supplier format and publish a single, trusted master catalog.' },
      { icon: Filter, label: 'Data Cleansing & Standardisation', desc: 'Resolve conflicts, normalize units, and standardize taxonomy across all supplier inputs.' },
      { icon: RefreshCw, label: 'Continuous Governance', desc: 'Automated guardrails that catch regressions before they reach your channels or ERP.' },
      { icon: Sparkles, label: 'Data Enrichment', desc: 'Fill missing specs, descriptions, and attributes for every product in your catalog.' },
    ],
    benefits: [
      'Single source of truth for all downstream systems',
      'Dramatic reduction in manual catalog management hours',
      'Sales teams equipped with accurate, complete product data',
      'Faster time-to-catalog for every new supplier relationship',
    ],
  },
  {
    id: 'brands',
    segment: 'Manufacturers & Brands',
    icon: ShieldCheck,
    headline: 'Your product story, told consistently everywhere it\'s sold.',
    subheadline: 'Control your content across every channel.',
    description: 'Technical spec sheets are not retail-ready. Retail partners reject feeds, marketplaces suppress listings, and off-brand copy appears across channels. DatavioAI transforms your product data into rich, structured, brand-consistent content for every partner — maintained from a single controlled source.',
    accent: { bg: 'bg-[#00C853]/10', icon: 'text-[#00C853]', border: 'border-[#00C853]/20', pill: 'bg-[#00C853]/10 text-[#00C853]', bar: '#00C853' },
    stats: [
      { value: '100%', label: 'Feed acceptance rate by retail partners' },
      { value: '4×', label: 'Faster new product launch across channels' },
      { value: '0', label: 'Off-brand listings slipping through' },
    ],
    capabilities: [
      { icon: Sparkles, label: 'Unique Product Content', desc: 'Brand-consistent descriptions, specs, and rich content adapted for each retail channel.' },
      { icon: Database, label: 'Catalog Builder', desc: 'One master record for every product — automatically adapted to each partner\'s requirements.' },
      { icon: RefreshCw, label: 'Continuous Governance', desc: 'Ensure brand standards are enforced across every listing, on every channel, at all times.' },
      { icon: Search, label: 'AI Search Optimization', desc: 'Omnichannel keyword enrichment so your products are discoverable everywhere buyers search.' },
    ],
    benefits: [
      'Consistent brand representation across all retail partners',
      'No more feed rejections or listing suppressions',
      'Faster time-to-shelf for every new product launch',
      'Content that stays accurate as products evolve',
    ],
  },
  {
    id: 'wholesalers',
    segment: 'Wholesalers & Suppliers',
    icon: Package,
    headline: 'Clean data out. Every time. Regardless of what comes in.',
    subheadline: 'Consistent catalog output at any input quality.',
    description: 'Products arrive from multiple sources in different formats, with varying attribute structures and missing values. DatavioAI cleanses, standardizes, and merges all inputs into a single clean output — so every product you publish is accurate, complete, and ready for your retail partners and platforms.',
    accent: { bg: 'bg-[#00AEEF]/10', icon: 'text-[#00AEEF]', border: 'border-[#00AEEF]/20', pill: 'bg-[#00AEEF]/10 text-[#00AEEF]', bar: '#00AEEF' },
    stats: [
      { value: '90%+', label: 'Reduction in manual data handling time' },
      { value: '60%', label: 'Faster fulfillment of retailer requirements' },
      { value: '3×', label: 'More channels served from the same data' },
    ],
    capabilities: [
      { icon: Filter, label: 'Data Cleansing & Standardisation', desc: 'Automatically resolve conflicts, fill gaps, and standardize every incoming product record.' },
      { icon: Database, label: 'Catalog Builder', desc: 'Merge multi-source inputs into a single, channel-ready catalog without manual intervention.' },
      { icon: Sparkles, label: 'Data Enrichment', desc: 'AI fills missing attributes so every product you send to partners is complete and retail-ready.' },
      { icon: Tag, label: 'Catalog Scoring', desc: 'Know which products need attention before your partners flag them.' },
    ],
    benefits: [
      'Consistent, reliable output regardless of input quality',
      'Meet retailer and platform data requirements every time',
      'Serve more channels from less manual effort',
      'Build trust with partners through consistently clean data',
    ],
  },
  {
    id: 'marketplaces',
    segment: 'Marketplaces',
    icon: Layers,
    headline: 'Quality at scale. For every seller. On every listing.',
    subheadline: 'Enforce your standards without slowing down growth.',
    description: 'As seller counts grow, maintaining listing quality manually becomes impossible. Low-quality submissions degrade buyer experience, suppress search, and increase support volume. DatavioAI validates submissions in real time, scores listings against your standards, and gives sellers actionable guidance — keeping quality high at any volume.',
    accent: { bg: 'bg-[#0891B2]/10', icon: 'text-[#0891B2]', border: 'border-[#0891B2]/20', pill: 'bg-[#0891B2]/10 text-[#0891B2]', bar: '#0891B2' },
    stats: [
      { value: '100%', label: 'Of listings validated against your standards' },
      { value: '50%', label: 'Faster seller onboarding and approval' },
      { value: '4×', label: 'Improvement in average listing quality score' },
    ],
    capabilities: [
      { icon: Tag, label: 'Catalog Scoring', desc: 'Score every seller listing against your quality standards in real time.' },
      { icon: RefreshCw, label: 'Continuous Governance', desc: 'Ongoing monitoring that catches quality drift before it affects buyer experience.' },
      { icon: Search, label: 'AI Search Optimization', desc: 'Ensure high-quality listings surface first in on-platform search.' },
      { icon: Filter, label: 'Data Cleansing & Standardisation', desc: 'Normalize seller submissions into consistent, structured catalog data.' },
    ],
    benefits: [
      'Consistent listing quality regardless of seller data maturity',
      'Better buyer experience driving higher repeat purchase rates',
      'Faster seller onboarding with automated validation and guidance',
      'Scalable quality enforcement as your marketplace grows',
    ],
  },
  {
    id: 'dtc',
    segment: 'Direct-to-Consumer Brands',
    icon: Store,
    headline: 'Every product page, optimized to win.',
    subheadline: 'Own your story. Maximize every touchpoint.',
    description: 'DTC brands live and die by the quality of their product content. DatavioAI ensures your store\'s product pages are always complete, always on-brand, and always optimized for the search queries that bring your ideal customers through the door.',
    accent: { bg: 'bg-[#00C853]/10', icon: 'text-[#00C853]', border: 'border-[#00C853]/20', pill: 'bg-[#00C853]/10 text-[#00C853]', bar: '#00C853' },
    stats: [
      { value: '3×', label: 'Conversion lift on enriched product pages' },
      { value: '40%', label: 'Fewer returns through accurate descriptions' },
      { value: '2×', label: 'Faster new collection content creation' },
    ],
    capabilities: [
      { icon: Sparkles, label: 'Unique Product Content', desc: 'Brand-voice-consistent descriptions and copy for every product in your range.' },
      { icon: Search, label: 'AI Search Optimization', desc: 'Keyword enrichment aligned to how your audience actually searches.' },
      { icon: Tag, label: 'Catalog Scoring', desc: 'Continuous scoring that flags content gaps before they cost you conversions.' },
      { icon: Sparkles, label: 'Data Enrichment', desc: 'Complete attribute sets for every SKU — size, material, care, fit, and more.' },
    ],
    benefits: [
      'On-brand content across every product without manual effort',
      'Optimized for the search terms driving your organic traffic',
      'Consistent quality as your collection grows and changes',
      'Faster go-live for new products and seasonal launches',
    ],
  },
];

const NAV_ITEMS = SOLUTIONS.map((s) => ({ id: s.id, label: s.segment }));

export default function SolutionsPage({ navigate }: { navigate: (to: string) => void }) {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <PageHeader />

      {/* Hero */}
      <div className="bg-[#1B2F6E] relative overflow-hidden flex-shrink-0 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00AEEF]/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C853]/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
            Built for Every Commerce Model.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#00C853]">
              Tailored to Your Catalog Reality.
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you're a retailer fighting for search ranking, a distributor drowning in supplier feeds, or a brand losing control of your content — DatavioAI has a solution built specifically for you.
          </p>
          {/* Quick-nav pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToId(id)}
                className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solution sections */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 space-y-20">
        {SOLUTIONS.map(({ id, segment, icon: Icon, headline, subheadline, description, accent, stats, capabilities, benefits }, idx) => (
          <div key={id} id={id} className="scroll-mt-8">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-7">
              <div className={`w-12 h-12 ${accent.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${accent.icon}`} />
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${accent.pill}`}>{segment}</span>
              </div>
            </div>

            <div className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Left: copy */}
              <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-3xl font-extrabold text-[#1B2F6E] mb-2 leading-tight">{headline}</h2>
                <p className={`text-base font-semibold mb-4 ${accent.icon}`}>{subheadline}</p>
                <p className="text-slate-600 text-base leading-relaxed mb-6">{description}</p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {stats.map(({ value, label }) => (
                    <div key={label} className={`${accent.bg} rounded-xl p-4 text-center border ${accent.border}`}>
                      <p className={`text-2xl font-extrabold ${accent.icon} mb-0.5`}>{value}</p>
                      <p className="text-xs text-slate-500 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-7">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{b}</span>
                    </div>
                  ))}
                </div>

                <a href="/demo" onClick={(e) => { e.preventDefault(); appNavigate('/demo'); }}
                  className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg text-white`}
                  style={{ backgroundColor: accent.bar }}>
                  Get a free assessment <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Right: capability cards */}
              <div className={`grid grid-cols-2 gap-3 ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                {capabilities.map(({ icon: CapIcon, label, desc }) => (
                  <div key={label} className={`bg-white border ${accent.border} rounded-xl p-4 hover:shadow-md transition-shadow`}>
                    <div className={`w-9 h-9 ${accent.bg} rounded-lg flex items-center justify-center mb-3`}>
                      <CapIcon className={`w-4 h-4 ${accent.icon}`} />
                    </div>
                    <p className="font-bold text-[#1B2F6E] text-sm mb-1">{label}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            {idx < SOLUTIONS.length - 1 && <div className="mt-16 border-b border-slate-100" />}
          </div>
        ))}

        {/* CTA */}
        <div className="bg-[#1B2F6E] rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> Get Started
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Not sure which solution fits best?</h2>
            <p className="text-white/60 text-base max-w-lg mx-auto mb-7">
              Book a free demo and we'll assess your catalog, identify your biggest opportunities, and recommend exactly where DatavioAI will have the most impact for your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-7">
              <a href="/demo" onClick={(e) => { e.preventDefault(); appNavigate('/demo'); }}
                className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5">
                Book Your Free Demo <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 text-xs text-white/40">
              {['Run 100 products free', 'Full catalog quality report', 'No commitment required'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
